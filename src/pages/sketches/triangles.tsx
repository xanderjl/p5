import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { Graphics } from 'p5'
import {
  ColorValue,
  Draw,
  MouseClicked,
  P5,
  Setup,
  WindowResized,
} from 'types/CustomP5'
import createGrain from 'util/createGrain'
import createGrid from 'util/createGrid'
import signature from 'util/signature'

const width: number = 2048
const height: number = 2048
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: ColorValue = [255, 253, 252]
const stroke: ColorValue = [5, 0, 0]
const primary: ColorValue = [255, 177, 177]
const length: number = 120
const gridCount: number = 20
let margin: number
let particleGrid: number[][]
let guideGrid: number[][]
let seed: number = 0
let grain: Graphics

const equilateralTriangle = (
  p5: P5,
  x: number,
  y: number,
  r: number,
  rotation: number = 30,
  color?: ColorValue
) => {
  const x1: number = x + Math.cos(p5.radians(rotation) + p5.radians(0)) * r
  const x2: number = x + Math.cos(p5.radians(rotation) + p5.radians(120)) * r
  const x3: number = x + Math.cos(p5.radians(rotation) + p5.radians(240)) * r
  const y1: number = y + Math.sin(p5.radians(rotation) + p5.radians(0)) * r
  const y2: number = y + Math.sin(p5.radians(rotation) + p5.radians(120)) * r
  const y3: number = y + Math.sin(p5.radians(rotation) + p5.radians(240)) * r

  p5.push()
  color && p5.fill(p5.color(color as string))
  p5.triangle(x1, y1, x2, y2, x3, y3)
  p5.pop()
}

const setup: Setup = p5 => {
  p5.noiseSeed(seed)
  p5.randomSeed(seed)
  margin = p5.width * 0.1
  guideGrid = createGrid(gridCount)
  guideGrid = guideGrid.map(([u, v]) => {
    const x = p5.lerp(margin, p5.width - margin, u)
    const y = p5.lerp(margin, p5.height - margin, v)
    return [x, y]
  })
  particleGrid = Array.from({ length }, () => {
    const x = p5.random(margin, p5.width - margin)
    const y = p5.random(margin, p5.height - margin)

    return [x, y]
  })
  grain = createGrain(p5)
}

const draw: Draw = p5 => {
  p5.noiseSeed(seed)
  p5.randomSeed(seed)

  margin = p5.width * 0.1
  const cx: number = p5.width * 0.5
  const cy: number = p5.height * 0.5
  const offset: number = p5.width * 0.00975

  p5.background(background)
  p5.fill(stroke)
  p5.noStroke()

  guideGrid.forEach(([x, y]) => p5.ellipse(x, y, 2, 2))

  p5.push()
  p5.stroke(stroke)
  p5.noFill()
  particleGrid.forEach(([x, y]) => {
    const r = p5.random(p5.width * 0.00875, p5.width * 0.0175)

    p5.strokeWeight(p5.random(0.4, 1))
    p5.random(1) > 0.33
      ? equilateralTriangle(
          p5,
          x,
          y,
          r,
          p5.random(27, 32),
          p5.random(1) > 0.7 ? stroke : undefined
        )
      : p5.ellipse(x, y, r, r)
  })
  p5.pop()

  Array.from({ length: 10 }, () => {
    const minMargin = margin * 2
    const maxMargin = p5.width - margin * 2
    const r = p5.random(p5.width * 0.05, p5.width * 0.25)
    const x = p5.random(minMargin, maxMargin)
    const y = p5.random(minMargin, maxMargin)
    const style1 = () => {
      p5.noFill()
      p5.stroke(stroke)
      p5.strokeCap('square')
      p5.strokeWeight(p5.random(r * 0.175))
    }

    p5.push()
    p5.blendMode('multiply')
    p5.fill(primary)
    p5.random(1) > 0.5 && style1()
    p5.arc(x, y, r, r, p5.PI * -0.25, p5.PI * 0.75)
    p5.pop()
  })

  p5.push()
  p5.stroke(stroke)
  p5.strokeCap('square')
  Array.from({ length: 60 }, () => {
    const cx = p5.random(0, p5.width)
    const cy = p5.random(0, p5.height)
    const r = p5.random(p5.width * 0.025, p5.width * 0.05)
    const x1 = cx + r * Math.cos(p5.radians(45))
    const x2 = cx - r * Math.cos(p5.radians(45))
    const y1 = cy + r * Math.sin(p5.radians(45))
    const y2 = cy - r * Math.sin(p5.radians(45))

    p5.strokeWeight(p5.random(0.3, 1.5))
    p5.line(x1, y1, x2, y2)
  })
  p5.pop()

  equilateralTriangle(p5, cx + offset, cy + offset * 0.7, p5.width * 0.2)
  equilateralTriangle(p5, cx, cy, p5.width * 0.2, undefined, primary)

  p5.image(grain, 0, 0, p5.width, p5.height)

  signature(p5)
}

const windowResized: WindowResized = p5 => {
  p5.noiseSeed(seed)
  p5.randomSeed(seed)
  margin = p5.width * 0.1
  guideGrid = createGrid(gridCount)
  guideGrid = guideGrid.map(([u, v]) => {
    const x = p5.lerp(margin, p5.width - margin, u)
    const y = p5.lerp(margin, p5.height - margin, v)
    return [x, y]
  })
  particleGrid = Array.from({ length }, () => {
    const x = p5.random(margin, p5.width - margin)
    const y = p5.random(margin, p5.height - margin)

    return [x, y]
  })
}

const mouseClicked: MouseClicked = (p5, e) => {
  if (e.shiftKey) {
    seed--
  } else {
    seed++
  }
  console.log({ seed })
  p5.draw()
}

const Triangles: NextPage = () => (
  <SketchWrapper
    setup={setup}
    draw={draw}
    windowResized={windowResized}
    mouseClicked={mouseClicked}
    dimensions={dimensions}
    padding={padding}
    background={background}
    seed={seed}
  />
)

export default Triangles
