import { ColorValue, Draw, Setup } from '@react-p5/core'
import { convertSeed, createGrain } from '@react-p5/utils'
import Sketch from 'components/Sketch'
import { NextPage } from 'next'
import { Graphics } from 'p5'
import createGrid from 'util/createGrid'
import signature from 'util/signature'

const width: number = 2048
const height: number = 2048
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: ColorValue = [255, 253, 252]
const stroke: ColorValue = [5, 0, 0]
const nScl: number = 2
const phrase: string = `Nothing behind those eyes.`
const seed: number = convertSeed(phrase)
const count: number = 100
let grain: Graphics
let margin: number
let grid: number[][] = createGrid(count)
const length: number = 40

const setup: Setup = p5 => {
  grain = createGrain(p5)
}

const draw: Draw = p5 => {
  margin = p5.width * 0.1
  p5.background(background)
  p5.stroke(stroke)
  p5.noFill()
  p5.push()
  p5.translate(p5.width * 0.5, p5.height * 0.5)
  Array.from({ length }, (_, i) => {
    const a = p5.radians((360 / length) * i)

    Array.from({ length }, (_, j) => {
      const rand = p5.noise(j / nScl, i / nScl)
      const min = p5.width * 0.0875
      const max = p5.width - margin * 2 - min * 2
      const x2 = p5.map(rand, 0, 1, min, max) * Math.cos(a)
      const y2 = p5.map(rand, 0, 1, min, max) * Math.sin(a)
      const unit = j * p5.width * 0.000175

      p5.ellipse(x2, y2, unit, unit)
    })
  })
  p5.pop()

  p5.push()
  p5.noStroke()
  p5.fill(255, 0, 0, 100)
  grid
    .filter(() => p5.random(1) > 0.99)
    .forEach(([u, v]) => {
      const x = p5.lerp(margin, p5.width - margin, u)
      const y = p5.lerp(margin, p5.height - margin, v)
      const unit = p5.width * 0.0025

      p5.ellipse(x, y, unit, unit)
    })
  p5.pop()

  p5.push()
  p5.stroke(255, 0, 0, 100)
  p5.strokeWeight(0.4)
  Array.from({ length: length * 2 }, (_, i) => {
    const x = p5.lerp(margin, p5.width - margin, i / (length * 2 - 1))
    const y = p5.height * 0.5
    const ydiff = p5.height * 0.4
    const a = Math.sin(p5.radians((360 / length) * i)) * 30

    // i !== 0 && i !== length - 1
    //   ? p5.line(x - a, y - ydiff, x + a, y + ydiff)
    //   : p5.line(x, y - ydiff, x, y + ydiff)

    p5.line(x - a, y - ydiff, x + a, y + ydiff)
  })
  p5.pop()

  p5.image(grain, 0, 0, p5.width, p5.height)
  signature(p5)
}

const Dandelions: NextPage = () => (
  <Sketch
    setup={setup}
    draw={draw}
    dimensions={dimensions}
    padding={padding}
    background={background}
    seed={seed}
    suffix={phrase}
  />
)

export default Dandelions
