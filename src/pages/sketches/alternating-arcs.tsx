import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import p5, { Graphics } from 'p5'
import { ColorValue, Draw, P5, Setup, WindowResized } from 'types/CustomP5'
import linearGradient from 'util/linearGradient'
import signature from 'util/signature'

const width: number = 2048
const height: number = 2048
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: ColorValue = [255, 253, 252]
let grain: Graphics

const gradientArc = (
  p5: P5,
  x: number,
  y: number,
  w: number,
  h: number,
  start: number,
  stop: number,
  c1: ColorValue,
  c2: ColorValue
): void => {
  const lx1: number = x - w
  const ly1: number = y - h
  const lx2: number = x + w * 0.5
  const ly2: number = y + h * 0.5
  p5.push()
  p5.noStroke()
  linearGradient(p5, lx1, ly1, lx2, ly2, c1, c2)
  p5.arc(x, y, w, h, start, stop)
  p5.pop()
}

const setup: Setup = p5 => {
  grain = p5.createGraphics(p5.width, p5.height)
  grain.loadPixels()
  Array.from({ length: p5.width }, (_, i) => {
    Array.from({ length: p5.height }, (_, j) => {
      grain.set(i, j, p5.color(p5.random(255), 10))
    })
  })
  grain.updatePixels()
}

const draw: Draw = p5 => {
  const cx: number = p5.width * 0.5
  const cy: number = p5.height * 0.5
  p5.noLoop()

  Array.from({ length: 10 }, (_, i) => {
    const unit: number = p5.width * 0.05 * (10 - i)
    gradientArc(
      p5,
      cx,
      cy,
      unit,
      unit,
      p5.PI + p5.HALF_PI,
      p5.HALF_PI,
      [255, 0, 0],
      background
    )
  })
  Array.from({ length: 10 }, (_, i) => {
    const unit: number = p5.width * 0.05 * (10 - i)
    gradientArc(
      p5,
      cx,
      cy,
      unit,
      unit,
      p5.HALF_PI,
      p5.PI + p5.HALF_PI,
      background,
      0
    )
  })

  p5.image(grain, 0, 0)

  signature(p5)
}

const windowResized: WindowResized = p5 => {
  grain.resizeCanvas(p5.width, p5.height)
}

const AlternatingArcs: NextPage = () => (
  <SketchWrapper
    setup={setup}
    draw={draw}
    windowResized={windowResized}
    dimensions={dimensions}
    padding={padding}
    background={background}
  />
)

export default AlternatingArcs
