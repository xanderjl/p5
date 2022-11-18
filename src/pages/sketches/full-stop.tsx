import { ColorValue, Draw } from '@react-p5/core'
import Sketch from 'components/Sketch'
import { NextPage } from 'next'

const width: number = 2048
const height: number = 2048
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: ColorValue = [0, 0, 0]

const draw: Draw = p5 => {
  const xMid = p5.width / 2
  const yMid = p5.height / 2

  const circles = Array.from({ length: 7 })

  p5.noLoop()

  p5.noFill()
  p5.stroke(255)

  p5.translate(xMid, yMid)
  circles.forEach((_, i) => {
    const n = circles.length - i
    const x = i * (p5.width * 0.075)
    const d = (n + 1) * (p5.width * 0.03)

    p5.ellipse(x, 0, d)
    p5.ellipse(-x, 0, d)

    if (i === circles.length - 1) {
      p5.stroke(0)
      p5.fill(9)
      p5.rect(x, -d * 0.5, d, d)
      p5.noFill()
      p5.stroke(255)
      p5.line(x, d * 0.75, x, -d * 0.75)
    }
  })
}

const FullStop: NextPage = () => (
  <Sketch
    draw={draw}
    dimensions={dimensions}
    padding={padding}
    background={background}
  />
)

export default FullStop
