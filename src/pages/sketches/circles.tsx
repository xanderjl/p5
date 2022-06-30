import SketchWrapper from 'components/SketchWrapper'
import _ from 'lodash'
import { NextPage } from 'next'
import { Sketch } from 'react-p5-wrapper'

interface Circle {
  x: number
  y: number
  r: number
}

const sketch: Sketch = p5 => {
  let circles: Circle[] = []
  const maxR: number = 90
  const background = () => p5.background(260, 200, 20)

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight)
    p5.colorMode(p5.HSB)
    background()

    Array.from({ length: p5.windowWidth * 2 }).forEach(() => {
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

      !overlapping && circle.r < maxR && circles.push(circle)
    })

    circles.forEach(({ x, y, r }) => {
      const rand: number = Math.random()
      const h =
        rand < 0.25
          ? p5.random(10, 40)
          : rand > 0.25 && rand < 0.5
          ? p5.random(120, 200)
          : rand > 0.5 && rand < 0.75
          ? p5.random(60, 100)
          : p5.random(280, 300)
      p5.fill(h, p5.random(20, 40), p5.random(100, 150))
      p5.noStroke()
      p5.ellipse(x, y, r * 2, r * 2)
    })
  }

  p5.windowResized = _.debounce(() => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight)
    background()
    circles = []

    Array.from({ length: p5.windowWidth * 2 }).forEach(() => {
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

      !overlapping && circle.r < maxR && circles.push(circle)
    })

    circles.forEach(({ x, y, r }) => {
      const rand: number = Math.random()
      const h =
        rand < 0.25
          ? p5.random(10, 40)
          : rand > 0.25 && rand < 0.5
          ? p5.random(120, 200)
          : rand > 0.5 && rand < 0.75
          ? p5.random(60, 100)
          : p5.random(280, 300)
      p5.fill(h, p5.random(20, 40), p5.random(100, 150))
      p5.noStroke()
      p5.ellipse(x, y, r * 2, r * 2)
    })
  }, 100)
}

const Circles: NextPage = () => <SketchWrapper sketch={sketch} />

export default Circles
