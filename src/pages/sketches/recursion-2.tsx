import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { P5CanvasInstance, Sketch } from 'react-p5-wrapper'
import { ColorValue } from 'types/CustomP5'

const width: number = 2048
const height: number = 2048
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: ColorValue = [0]

const sketch: Sketch = p5 => {
  p5.draw = () => {
    const xStart: number = p5.width / 2
    const yStart: number = p5.height / 2
    let rStart: number = p5.width * 0.03

    p5.noLoop()
    p5.background(background)
    p5.stroke(255)
    p5.noFill()

    drawSpiral(p5, xStart, yStart, rStart)
  }
}

const drawSpiral = (p5: P5CanvasInstance, x: number, y: number, r: number) => {
  p5.push()
  p5.translate(x, y)
  Array.from({ length: p5.TAU * 101 }).forEach((_, i) => {
    const a = i * 0.8
    const x = (r + a) * Math.sin(a)
    const y = (r + a) * Math.cos(a)
    r += 0.2

    p5.ellipse(x, y, a * 0.03)
  })
  p5.pop()

  if (r <= p5.width) {
    drawSpiral(p5, x, y, r)
  }
}

const Recursion_2: NextPage = () => (
  <SketchWrapper
    sketch={sketch}
    dimensions={dimensions}
    padding={padding}
    background={background}
  />
)

export default Recursion_2
