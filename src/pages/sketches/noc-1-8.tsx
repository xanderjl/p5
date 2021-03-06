import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { Sketch } from 'react-p5-wrapper'
import { ColorValue } from 'types/CustomP5'

const width: number = 640
const height: number = 360
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: ColorValue = [255]

const sketch: Sketch = async p5 => {
  const Mover2 = await import('types/Mover').then(mod => mod.Mover2)
  const location = p5.createVector(p5.width / 2, p5.height / 2)
  const velocity = p5.createVector(0, 0)
  const acceleration = p5.createVector(-0.001, 0.01)

  p5.draw = () => {
    p5.background(background)

    const mover = new Mover2(p5, location, velocity, acceleration)

    mover.update()
    mover.checkEdges()
    mover.display()
  }
}

const Noc_1_8: NextPage = () => (
  <SketchWrapper
    sketch={sketch}
    dimensions={dimensions}
    padding={padding}
    background={background}
  />
)

export default Noc_1_8
