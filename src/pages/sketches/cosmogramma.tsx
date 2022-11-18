import { ColorValue, Draw } from '@react-p5/core'
import Sketch from 'components/Sketch'
import { NextPage } from 'next'
import signature from 'util/signature'

const width: number = 2048
const height: number = 2048
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: ColorValue = [255, 253, 252]

const draw: Draw = p5 => {
  const tc = p5.createGraphics(p5.width, p5.height)
  const r = p5.width * 0.175
  const rgb = p5.map(p5.random(), 0, 1, 0, 40)
  p5.noLoop()

  p5.background(background)
  p5.strokeWeight(0.15)
  p5.stroke(rgb, rgb, rgb, 230)
  p5.noFill()

  tc.fill(255, 0, 0)
  tc.noStroke()
  tc.ellipse(tc.width * 0.5, tc.height * 0.5, tc.width)
  tc.translate(tc.width * 0.5, tc.height * 0.5)

  p5.translate(p5.width / 2, p5.height / 2)
  p5.image(tc, -p5.width * 0.25, 0, r, r)

  p5.ellipse(0, 0, r * 2)

  // Draw radiating lines
  Array.from({ length: 1200 }).forEach((_, i) => {
    const speed = p5.width * 0.1
    const length = r * (p5.width / speed)

    p5.push()
    p5.rotate(p5.radians(i))
    p5.beginShape()
    Array.from({ length: length }).forEach((_, j) => {
      const strokeWeight = 0.2
      const u = j / (length - 1)
      const x = p5.lerp(0, length, u) + r
      p5.strokeWeight(strokeWeight)
      p5.strokeCap(p5.ROUND)
      p5.strokeJoin(p5.ROUND)
      p5.vertex(j === 0 ? x : x + speed, 0)
    })
    p5.endShape()
    p5.pop()
  })

  signature(p5, 200, 'red')
}

const Cosmogramma: NextPage = () => (
  <Sketch
    draw={draw}
    dimensions={dimensions}
    padding={padding}
    background={background}
  />
)

export default Cosmogramma
