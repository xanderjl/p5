import { ColorValue, Draw, MouseClicked } from '@react-p5/core'
import Sketch from 'components/Sketch'
import { NextPage } from 'next'
import { Color } from 'p5'
import createGrid from 'util/createGrid'

const width: number = 2048
const height: number = 2048
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: ColorValue = [255, 253, 252]
const count: number = 20
const grid: number[][] = createGrid(count)
let seed: number = 0

const draw: Draw = p5 => {
  const margin: number = p5.width * 0.1

  p5.noLoop()
  p5.noiseSeed(seed)
  p5.randomSeed(seed)
  p5.background(background)

  const circles = p5.map(p5.noise(seed), 0, 1, 3, 5)

  Array.from({ length: circles }).forEach(() => {
    const x = p5.lerp(margin, p5.width - margin, p5.random())
    const y = p5.lerp(margin, p5.height - margin, p5.random())
    const color = 5
    const d = p5.map(p5.random(), 0, 1, p5.width * 0.05, p5.width * 0.5)

    p5.stroke(color)
    p5.fill(color)
    p5.ellipse(x, y, d)
  })

  grid.forEach(([u, v], i) => {
    const x = p5.lerp(margin, p5.width - margin, u)
    const y = p5.lerp(margin, p5.height - margin, v)
    const res = (p5.width - margin * 2) / (count - 1)
    const unit = p5.map(p5.random(u, v), 0, 1, res * 0.025, res)
    const colorChance = p5.noise(u * 10, v * 10, i) <= 0.6
    const fill = colorChance ? background : [255, 0, 0]
    const stroke = colorChance ? 80 : [120, 0, 0]
    const warp = p5.map(p5.noise(u, v, i), 0, 1, -2, 2)
    const c = 0.0005
    const xc = p5.constrain(x * warp, margin * c, p5.width - margin * c)
    const yc = p5.constrain(y * warp, margin * c, p5.height - margin * c)

    p5.stroke(stroke as unknown as Color)
    p5.fill(fill)

    p5.rectMode(p5.CENTER)
    p5.push()
    p5.translate(x, y)
    p5.rotate(p5.map(p5.noise(u, v), 0, 1, -0.25, 0.25))
    p5.rect(xc, yc, unit, unit)
    p5.pop()
  })
}

const mouseClicked: MouseClicked = (p5, e) => {
  if (e?.shiftKey) {
    seed--
  } else {
    seed++
  }
  p5.loop()
  p5.noLoop()
}

const Squared: NextPage = () => (
  <Sketch
    draw={draw}
    mouseClicked={mouseClicked}
    dimensions={dimensions}
    padding={padding}
    background={background}
    suffix={seed}
  />
)

export default Squared
