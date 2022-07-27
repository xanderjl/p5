import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { ColorValue, Draw, P5 } from 'types/CustomP5'

const width: number = 2048
const height: number = 2048
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: ColorValue = [0]

const draw: Draw = p5 => {
  const xStart: number = p5.width / 2
  const yStart: number = p5.height / 2
  const dStart: number = p5.width * 0.66

  p5.noLoop()
  p5.background(background)
  p5.stroke(255)
  p5.noFill()
  drawCircle(p5, xStart, yStart, dStart)
}

const drawCircle = (p5: P5, x: number, y: number, d: number) => {
  p5.ellipse(x, y, d)

  if (x < p5.width) {
    drawCircle(p5, x + x * 0.01, y, d * 0.99)
  }
}

const Recursion_1: NextPage = () => (
  <SketchWrapper
    draw={draw}
    dimensions={dimensions}
    padding={padding}
    background={background}
  />
)

export default Recursion_1
