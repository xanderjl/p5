import { ColorValue, Draw } from '@react-p5/core'
import Sketch from 'components/Sketch'
import { NextPage } from 'next'

const width: number = 2048
const height: number = 2048
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: ColorValue = [80, 60, 120]
const stroke: ColorValue = [255, 250, 200]
const numCols: number = 6
const numRows: number = 6
const lines: void[][] = Array.from({ length: numCols }, () =>
  Array.from({ length: numRows })
)
let a: number = Math.PI

const draw: Draw = p5 => {
  const xMargin = p5.width * 0.2
  const yMargin = p5.height * 0.2
  const xRes = (p5.width - xMargin * 2) / numCols

  p5.noLoop()
  p5.stroke(stroke)
  p5.fill(stroke)
  p5.strokeWeight(p5.width * 0.0015)

  lines.forEach((_, i) => {
    _.forEach((_, j) => {
      a = a * Math.cos(i)
      const u = i / (numCols - 1)
      const v = j / (numRows - 1)
      const x = p5.lerp(xMargin, p5.width - xMargin, u)
      const y = p5.lerp(yMargin, p5.height - yMargin, v)

      p5.push()
      p5.translate(x, y)
      Array.from({ length: p5.TWO_PI * 5.05 }).forEach((_, i) => {
        const a = i * 0.21
        const r = xRes * 0.5
        const x = r * Math.cos(a) * 0.05
        const y = r * Math.sin(a) * 0.05
        const speed = xRes * 0.15

        p5.push()
        p5.beginShape()
        p5.rotate(a)
        p5.vertex(x, y)
        p5.translate(speed, speed)
        p5.vertex(x + speed, y + speed)
        p5.endShape()
        p5.pop()
      })
      p5.pop()
    })
  })
}

const MessingWithPi: NextPage = () => (
  <Sketch
    draw={draw}
    dimensions={dimensions}
    padding={padding}
    background={background}
  />
)

export default MessingWithPi
