import { ColorValue, Draw, P5, Setup, WindowResized } from '@react-p5/core'
import {
  convertSeed,
  createGrain,
  createOverlay,
  linearGradient,
} from '@react-p5/utils'
import Sketch from 'components/Sketch'
import { NextPage } from 'next'
import { Graphics } from 'p5'
import createGrid from 'util/createGrid'
import signature from 'util/signature'

const phrase: string = 'degradation'
const seed: number = convertSeed(phrase)
const width: number = 2048
const height: number = 2048
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: ColorValue = [10, 0, 0]
const stroke: ColorValue = [255, 253, 252]
const count: number = 8
let grid1: number[][] = createGrid(count)
let grid2: number[][] = createGrid(count)
let grain: Graphics
let overlay: Graphics
let margin: number

const lines = (p5: P5, length: number = 3, margin: number = p5.width * 0.1) => {
  const ranges: number[] = Array.from({ length }, (_, i) => {
    const division: number = i / length
    const range: number = (p5.width - margin * 2) * division

    return range
  })
  const rows: void[] = Array.from({ length }, (_, i) => {
    const x1: number = margin
    const x2: number = p5.width - margin
    const y: number = p5.random(margin, ranges[i] || p5.height - margin)

    p5.push()
    p5.strokeWeight(p5.random(0.2, 0.8))
    p5.line(x1, y, x2, y)
    p5.pop()
  })
  const cols: void[] = Array.from({ length }, (_, i) => {
    const y1: number = margin
    const y2: number = p5.height - margin
    const x: number = p5.random(margin, ranges[i] || p5.width - margin)

    p5.push()
    p5.strokeWeight(p5.random(0.2, 0.8))
    p5.line(x, y1, x, y2)
    p5.pop()
  })

  rows
  cols
}

const cornerArc = (p5: P5) => {
  const x = p5.width - margin
  const y = p5.height - margin
  const r = p5.width - margin * 2
  const mod = 0.375
  const xr = x - r * mod
  const yr = y - r * mod

  p5.push()
  p5.noStroke()
  stroke.push(200)
  linearGradient(p5, x, y, xr, yr, [255, 80, 80], stroke)
  p5.arc(x, y, r, r, -p5.PI, p5.PI * 1.5)
  stroke.pop()
  p5.pop()
}

const noisyEllipses = (
  p5: P5,
  sx: number,
  sy: number,
  length: number,
  s: number,
  nScl: number,
  nStr: number
) => {
  const speed = p5.random(s * 0.5, s)
  let x = sx
  let y = sy

  const display = () => {
    Array.from({ length }, (_, i) => update(i))
  }

  const update = (i: number) => {
    const a = p5.noise(x / nScl, y / nScl) * nStr
    const d = i * p5.width * 0.000875

    x += Math.cos(a) * speed
    y -= Math.sin(a) * speed
    p5.push()
    p5.noFill()
    p5.ellipse(x, y, d, d)
    p5.pop()
  }

  display()
  x = sx
  y = sy
}

const setup: Setup = p5 => {
  margin = p5.width * 0.1

  grid1 = grid1.map(([u, v]) => {
    const x = p5.lerp(margin, p5.width - margin, u)
    const y = p5.lerp(margin, p5.height - margin, v)

    return [x, y]
  })

  grid2 = grid2
    .map(([u, v]) => {
      const x = p5.lerp(margin, p5.width - margin, u)
      const y = p5.lerp(margin, p5.height - margin, v)

      return [x, y]
    })
    .filter(() => p5.random(1) > 0.5)

  overlay = createOverlay(p5, background, margin)
  grain = createGrain(p5)
}

const draw: Draw = p5 => {
  margin = p5.width * 0.1

  p5.background(background)
  p5.stroke(stroke)

  p5.push()
  p5.strokeWeight(2)
  grid1.forEach(([x, y]) => p5.point(x, y))
  p5.pop()
  p5.push()
  p5.strokeWeight(0.5)
  grid2.forEach(([x, y]) =>
    noisyEllipses(
      p5,
      x,
      y,
      Math.floor(p5.random(10, 50)),
      p5.width * 0.025,
      2000,
      10
    )
  )
  p5.pop()

  lines(p5, 6)

  cornerArc(p5)

  p5.image(overlay, 0, 0, p5.width, p5.height)
  p5.image(grain, 0, 0, p5.width, p5.height)

  signature(p5)
}

const windowResized: WindowResized = p5 => {
  grid1 = createGrid(count)
  grid1 = grid1.map(([u, v]) => {
    const x = p5.lerp(margin, p5.width - margin, u)
    const y = p5.lerp(margin, p5.height - margin, v)

    return [x, y]
  })
  grid2 = createGrid(count)
  grid2 = grid2
    .map(([u, v]) => {
      const x = p5.lerp(margin, p5.width - margin, u)
      const y = p5.lerp(margin, p5.height - margin, v)

      return [x, y]
    })
    .filter(() => p5.random(1) > 0.5)
}

const _14_08_2022: NextPage = () => (
  <Sketch
    setup={setup}
    draw={draw}
    windowResized={windowResized}
    dimensions={dimensions}
    padding={padding}
    background={background}
    seed={seed}
    suffix={phrase}
  />
)

export default _14_08_2022
