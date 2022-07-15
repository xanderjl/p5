import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { Sketch } from 'react-p5-wrapper'
import { ColorValue } from 'types/CustomP5'

const width: number = 640
const height: number = 360
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: ColorValue = [255]
const pixelDensity: number = 1

const sketch: Sketch = async p5 => {
  const PVector = await import('p5').then(mod => mod.default.Vector)
  const Mover3 = await import('types/Mover').then(mod => mod.Mover3)
  const location = p5.createVector(p5.width / 2, p5.height / 2)
  const velocity = p5.createVector(0, 0)
  const acceleration = PVector.random2D()

  p5.draw = () => {
    p5.background(background)

    const mover = new Mover3(p5, location, velocity, acceleration)

    acceleration.mult(p5.random(2))

    mover.update()
    mover.checkEdges()
    mover.display()
  }
}

const Noc_1_10: NextPage = () => (
  <SketchWrapper
    sketch={sketch}
    dimensions={dimensions}
    padding={padding}
    background={background}
    pixelDensity={pixelDensity}
  />
)

export default Noc_1_10
