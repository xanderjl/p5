import SketchWrapper from 'components/SketchWrapper'
import _ from 'lodash'
import { NextPage } from 'next'
import palettes from 'nice-color-palettes'
import { P5, Setup, WindowResized } from 'types/CustomP5'

interface Circle {
  x: number
  y: number
  r: number
}

let circles: Circle[] = []
const minR: number = 10
const maxR: number = 90
const palette = _.sample(palettes)
const smallerPalette = palette!.slice(1)
const background = (p5: P5) => p5.background(p5.color(palette![0]))

const setup: Setup = (p5, canvasParentRef) => {
  p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef)
  background(p5)

  Array.from({ length: p5.windowWidth * 10 }).forEach(() => {
    const circle: Circle = {
      x: p5.random(p5.width),
      y: p5.random(p5.height),
      r: p5.random(12, 128),
    }
    const overlapping = circles.find(other => {
      const radii = circle.r + other.r
      const d = p5.dist(circle.x, circle.y, other.x, other.y)
      if (d < radii) {
        return true
      }
    })

    !overlapping && circle.r <= maxR && circle.r >= minR && circles.push(circle)
  })

  circles.forEach(({ x, y, r }) => {
    const color = _.sample(smallerPalette)!

    p5.fill(p5.color(color))
    p5.noStroke()
    p5.ellipse(x, y, r * 2, r * 2)
  })
}

const windowResized: WindowResized = _.debounce((p5: P5) => {
  p5.resizeCanvas(p5.windowWidth, p5.windowHeight)
  background(p5)
  circles = []

  Array.from({ length: p5.windowWidth * 10 }).forEach(() => {
    const circle: Circle = {
      x: p5.random(p5.width),
      y: p5.random(p5.height),
      r: p5.random(12, 128),
    }
    const overlapping = circles.find(other => {
      const radii = circle.r + other.r
      const d = p5.dist(circle.x, circle.y, other.x, other.y)
      if (d < radii + radii * 0.2) {
        return true
      }
    })

    !overlapping && circle.r <= maxR && circle.r >= minR && circles.push(circle)
  })

  circles.forEach(({ x, y, r }) => {
    const color = _.sample(smallerPalette)!

    p5.fill(p5.color(color))
    p5.noStroke()
    p5.ellipse(x, y, r * 2, r * 2)
  })
}, 100)

const CirclesTwo: NextPage = () => (
  <SketchWrapper setup={setup} windowResized={windowResized} />
)

export default CirclesTwo
