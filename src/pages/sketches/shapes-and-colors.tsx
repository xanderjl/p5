import { ColorValue, Draw, P5, Setup } from '@react-p5/core'
import { convertSeed, createGrain, linearGradient } from '@react-p5/utils'
import { createOverlay } from '@react-p5/utils'
import Sketch from 'components/Sketch'
import { NextPage } from 'next'
import type { Graphics } from 'p5'
import createGrid from 'util/createGrid'
import signature from 'util/signature'

const width: number = 2048
const height: number = 2048
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: ColorValue = [255, 253, 252]
const primary: ColorValue = [255, 0, 0]
const stroke: ColorValue = [10, 0, 0]
const seedPhrase: string = 'Zain is gonna fucking win this tournament'
const seed: number = convertSeed(seedPhrase)
const grid: number[][] = createGrid(20)
let overlay: Graphics
let grain: Graphics
let margin: number

const setup: Setup = p5 => {
  overlay = createOverlay(p5)
  grain = createGrain(p5)
}

const halfToneRect = (
  p5: P5,
  x: number,
  y: number,
  w: number,
  h: number,
  res: number = 10
): void => {
  const hw: number = w * 0.5
  const hh: number = h * 0.5
  const rows: number = Math.floor(w / res)
  const cols: number = Math.floor(h / res)

  p5.push()
  Array.from({ length: rows }, (_, i) => {
    Array.from({ length: cols }, (_, j) => {
      const xRes = i / rows
      const yRes = j / cols
      const x1 = p5.lerp(x - hw, x + hw, xRes)
      const y1 = p5.lerp(y - hh, y + hh, yRes)

      p5.strokeWeight((i * j) / (res * i))
      stroke.push(p5.map(j, 0, cols, 0, 100))
      p5.stroke(stroke)
      p5.point(x1, y1)
      stroke.pop()
    })
  })
  p5.pop()
}

const centreLines = (p5: P5): void => {
  const cx = p5.width * 0.5
  const cy = p5.height * 0.5
  const w = p5.width * 0.1
  const h = p5.height * 0.375

  const rect = (
    x: number,
    y: number,
    w: number,
    h: number,
    c1: ColorValue,
    c2: ColorValue
  ): void => {
    const hw = w * 0.5
    const hh = h * 0.5

    p5.push()
    linearGradient(p5, x - hw, y - hh, x + hw, y + hh, c1, c2)
    p5.rect(x, y, w, h)
    p5.pop()
  }

  rect(cx - w * 0.75, cy, w, h, primary, background)
  rect(cx + w * 0.75, cy, w, h, primary, background)
}

const draw: Draw = p5 => {
  margin = p5.width * 0.1

  p5.frameRate(1)
  p5.rectMode('center')
  p5.background(background)
  p5.stroke(stroke)

  centreLines(p5)

  grid
    .filter(() => p5.random(1) > 0.7)
    .forEach(([u, v]) => {
      const x = p5.lerp(margin, p5.width - margin, u)
      const y = p5.lerp(margin, p5.height - margin, v)
      const minW = p5.width * 0.05
      const maxW = p5.width * 0.1
      const minH = p5.width * 0.2
      const maxH = p5.height * 0.3
      const a =
        p5.random(1) > 0.5
          ? p5.PI * p5.random(1.48, 1.52)
          : p5.PI * p5.random(1.98, 2.02)

      p5.push()
      p5.translate(x, y)
      p5.rotate(a)
      halfToneRect(
        p5,
        0,
        0,
        p5.map(p5.noise(u, v, x), 0, 1, minW, maxW),
        p5.map(p5.noise(u, v, y), 0, 1, minH, maxH)
      )
      p5.pop()
    })

  p5.image(overlay, 0, 0, p5.width, p5.height)
  p5.image(grain, 0, 0, p5.width, p5.height)
  signature(p5)
}

const ShapesAndColors: NextPage = () => (
  <Sketch
    setup={setup}
    draw={draw}
    dimensions={dimensions}
    padding={padding}
    background={background}
    seed={seed}
    suffix={seedPhrase}
  />
)

export default ShapesAndColors
