import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import type { Vector } from 'p5'
import { Sketch } from 'react-p5-wrapper'
import { Particle } from 'types/Particle'

const sketch: Sketch = async p5 => {
  const P5Vector = await import('p5').then(mod => mod.default.Vector)

  let scale: number = 10
  let inc: number = 0.08
  let zinc: number = 0.05
  const width: number = p5.windowWidth
  const height: number = p5.windowHeight
  const particles: Particle[] = Array.from(
    { length: Math.floor((p5.windowWidth * p5.windowHeight) / 800) },
    () => new Particle(p5, P5Vector as unknown as Vector)
  )

  p5.setup = () => {
    p5.createCanvas(width, height, p5.P2D)
    p5.background(255)
  }
  p5.draw = () => {
    p5.background(255, 255, 255, 1)
    particles.forEach(particle => {
      const { pos, follow, update, edges, show } = particle
      const x = Math.floor(pos.x / scale)
      const y = Math.floor(pos.y / scale)
      const xoff = x * inc
      const yoff = y * inc
      const zoff = y * zinc

      const angle = p5.noise(xoff, yoff, zoff) * p5.TWO_PI * 4
      const vector = P5Vector.fromAngle(angle)
      vector.setMag(0.28)

      follow(vector)
      update()
      edges()
      show()
    })
  }
}

const FlowField: NextPage = () => <SketchWrapper sketch={sketch} />

export default FlowField
