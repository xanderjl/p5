import { ColorValue, Draw, MouseClicked } from '@react-p5/core'
import Sketch from 'components/Sketch'
import { NextPage } from 'next'

const width: number = 2048
const height: number = 2048
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: ColorValue = [0]

const d = 8
const n = 6
let k = n / d

const draw: Draw = p5 => {
  p5.background(background)
  p5.noLoop()
  p5.stroke(255)
  p5.noFill()
  p5.strokeWeight(1)

  p5.push()
  p5.translate(p5.width / 2, p5.height / 2)

  p5.beginShape()
  Array.from({ length: p5.TWO_PI * d * 101 }).forEach((_, i) => {
    const a = i * d * 0.001
    const r = p5.width * 0.4 * Math.cos(k * a)
    const x = r * Math.cos(a)
    const y = r * Math.sin(a)

    p5.vertex(x, y)
  })
  p5.endShape()
  p5.pop()
}

const mouseClicked: MouseClicked = p5 => {
  k++
  p5.draw()
}

const Rose: NextPage = () => (
  <Sketch
    draw={draw}
    mouseClicked={mouseClicked}
    dimensions={dimensions}
    padding={padding}
    background={background}
    pixelDensity={1}
  />
)

export default Rose
