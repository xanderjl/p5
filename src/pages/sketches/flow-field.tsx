import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import type { Vector } from 'p5'
import { Sketch } from 'react-p5-wrapper'
import { Particle } from 'types/Particle'

const sketch: Sketch = async p5 => {
  const Dector = await import('p5').then(mod => mod.default.Vector)

  let scale: number = 50
  let inc: number = 0.1
  let zoff: number = 0
  let zinc: number = 0.0005
  const width: number = p5.windowWidth
  const height: number = p5.windowHeight
  const cols: number = Math.floor(width / scale)
  const rows: number = Math.floor(height / scale)
  const colsArray: number[] = Array.from({ length: cols })
  const rowsArray: number[] = Array.from({ length: rows })
  const particles: Particle[] = Array.from(
    { length: 10000 },
    () => new Particle(p5, Dector as unknown as Vector)
  )
  const flowfield: Vector[] = Array.from({ length: cols * rows })

  p5.setup = () => {
    p5.createCanvas(width, height, p5.P2D)
    p5.background(255)
  }
  p5.draw = () => {
    let yoff: number = 0

    rowsArray.forEach((_, y) => {
      let xoff: number = 0

      colsArray.forEach((_, x) => {
        const index = x + y * cols
        const angle = p5.noise(xoff, yoff, zoff) * p5.TWO_PI * 4
        const vector = Dector.fromAngle(angle)
        vector.setMag(1)
        flowfield[index] = vector

        xoff += inc
        // p5.stroke(0, 50)
        // p5.strokeWeight(1)
        // p5.push()
        // p5.translate(x * scale, y * scale)
        // p5.rotate(vector.heading())
        // p5.line(0, 0, scale, 0)
        // p5.pop()
      })
      yoff += inc
      zoff += zinc
    })

    particles.forEach(particle => {
      particle.follow(flowfield, scale, cols)
      particle.update()
      particle.edges()
      particle.show()
    })
  }
}

const FlowField: NextPage = () => <SketchWrapper sketch={sketch} />

export default FlowField
