import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { Sketch } from 'react-p5-wrapper'

const sketch: Sketch = p5 => {
  const noiseMax = 3
  const bounds = Boolean(p5.windowWidth > p5.windowHeight)
    ? p5.windowHeight
    : p5.windowWidth
  const rMin = bounds * 0.25
  const rMax = bounds * 0.5
  const delta = 0.2
  let zoff = 0

  p5.setup = () => p5.createCanvas(p5.windowWidth, p5.windowHeight)

  p5.draw = () => {
    p5.background(0)
    p5.translate(p5.width / 2, p5.height / 2)
    p5.stroke(255)
    p5.noFill()

    p5.beginShape()
    Array.from({ length: p5.TWO_PI / delta }).forEach((_, i) => {
      const a = i * delta
      const xoff = p5.map(Math.cos(a), -1, 1, 0, noiseMax)
      const yoff = p5.map(Math.sin(a), -1, 1, 0, noiseMax)
      const r = p5.map(p5.noise(xoff, yoff, zoff), 0, 1, rMin, rMax)
      const x = r * Math.cos(a)
      const y = r * Math.sin(a)
      p5.vertex(x, y)
    })
    p5.endShape(p5.CLOSE)

    zoff += 0.012
  }
}

const PerlinNoiseLoopsPartOne: NextPage = () => <SketchWrapper sketch={sketch} />

export default PerlinNoiseLoopsPartOne
