import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { Sketch } from 'react-p5-wrapper'
import { Background } from 'types/CustomP5'
import { Mover } from 'types/Mover'

const width: number = 640
const height: number = 360
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: Background = [255]

const sketch: Sketch = p5 => {
  const location = p5.createVector(p5.random(p5.width), p5.random(p5.height))
  const velocity = p5.createVector(p5.random(-2, 2), p5.random(-2, 2))

  p5.draw = () => {
    p5.background(background)

    const mover = new Mover(p5, location, velocity)

    mover.update()
    mover.checkEdges()
    mover.display()
  }
}

const Noc_1_7: NextPage = () => (
  <SketchWrapper
    sketch={sketch}
    dimensions={dimensions}
    padding={padding}
    background={background}
  />
)

export default Noc_1_7
