import { ColorValue, Draw } from '@react-p5/core'
import Sketch from 'components/Sketch'
import { NextPage } from 'next'
import signature from 'util/signature'

const width: number = 2048
const height: number = 2048
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: ColorValue = [255, 253, 252]
const cols: string[] = ['#cdb4db', '#ffc8dd', '#ffafcc', '#bde0fe', '#a2d2ff']
let margin: number

const draw: Draw = p5 => {
  margin = p5.width * 0.1

  p5.frameRate(24)

  Array.from({ length: p5.width * 0.2 }).forEach((_, i) => {
    const x = p5.random(margin, p5.width - margin)
    const y = p5.random(margin, p5.height - margin)
    const d = p5.width * 0.05
    const color = p5.lerpColor(
      p5.color(cols[Math.floor(p5.random(cols.length))]),
      p5.color(cols[Math.floor(p5.random(cols.length))]),
      0.5
    )

    p5.fill(color)
    p5.stroke(color)

    p5.ellipse(x, y, d)
  })

  signature(p5)
}

const ColorConversion: NextPage = () => (
  <Sketch
    draw={draw}
    dimensions={dimensions}
    padding={padding}
    background={background}
  />
)

export default ColorConversion
