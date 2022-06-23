import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import type { Vector } from 'p5'
import { Sketch } from 'react-p5-wrapper'
import { Particle } from 'types/Particle'

const sketch: Sketch = async p5 => {
  const Dector = await import('p5').then(mod => mod.default.Vector)

  let scale: number = 20
  let inc: number = 0.1
  let zinc: number = 0.0005
  const width: number = p5.windowWidth
  const height: number = p5.windowHeight
  const particles: Particle[] = Array.from(
    { length: 5000 },
    () => new Particle(p5, Dector as unknown as Vector)
  )

  p5.setup = () => {
    p5.createCanvas(width, height, p5.P2D)
    p5.background(255)
  }
  p5.draw = () => {
    particles.forEach(particle => {
      const { pos, follow, update, edges, show } = particle
      const x = Math.floor(pos.x / scale)
      const y = Math.floor(pos.y / scale)
      const xoff = x * inc
      const yoff = y * inc
      const zoff = y * zinc

      const angle = p5.noise(xoff, yoff, zoff) * p5.TWO_PI * 4
      const vector = Dector.fromAngle(angle)
      vector.setMag(0.45)

      follow(vector)
      update()
      edges()
      show()
    })
  }
}

const FlowField: NextPage = () => <SketchWrapper sketch={sketch} />

export default FlowField
