import { createGrain } from '@react-p5/utils'
import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { Graphics } from 'p5'
import { ColorValue, Draw, MouseClicked, Setup } from 'types/CustomP5'
import createGrid from 'util/createGrid'
import signature from 'util/signature'

const width: number = 2048
const height: number = 2048
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: ColorValue = [255, 253, 252]
const stroke: ColorValue = [5, 0, 0]
let amp: number
// let freq: number = 121
let freq: number = 19
// let freq: number = 24
// let freq: number = 30
let grid: number[][] = createGrid(40)
let margin: number
let grain: Graphics
let seed: number = 1

const setup: Setup = p5 => {
  grain = createGrain(p5)
}

const draw: Draw = p5 => {
  p5.noiseSeed(seed)
  p5.randomSeed(seed)
  p5.noLoop()
  margin = p5.width * 0.1
  amp = margin

  p5.background(background)
  p5.stroke(stroke)

  grid.forEach(([u, v], i) => {
    const x = p5.lerp(margin, p5.width - margin, u)
    const y = p5.lerp(margin, p5.height - margin, v)
    const ySin = y + Math.sin(i * freq) * amp
    const weight = (ySin + i) * 0.006
    const inBounds: boolean =
      x < p5.width - margin &&
      x >= margin &&
      ySin < p5.height - margin &&
      ySin >= margin

    if (p5.random(1) > 0.1) {
      stroke.push(p5.map(i, 0, grid.length - 1, 160, 255))
      p5.stroke(stroke)
      stroke.pop()
      p5.strokeWeight(weight * 0.06)
      p5.noFill()
      inBounds && p5.ellipse(x, ySin, weight, weight)
    } else {
      const lesserWeight = weight * 0.85
      p5.noStroke()
      p5.fill(255, 180, 180)
      inBounds && p5.ellipse(x, ySin, lesserWeight, lesserWeight)
    }
  })

  p5.image(grain, 0, 0, p5.width, p5.height)

  signature(p5)
}

const mouseClicked: MouseClicked = (p5, e) => {
  if (e.shiftKey) {
    seed--
  } else {
    seed++
  }
  p5.draw()
}

const SinedGrid: NextPage = () => (
  <SketchWrapper
    setup={setup}
    draw={draw}
    mouseClicked={mouseClicked}
    dimensions={dimensions}
    padding={padding}
    background={background}
    seed={seed}
  />
)

export default SinedGrid
