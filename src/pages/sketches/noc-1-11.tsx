import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { Sketch } from 'react-p5-wrapper'
import { Background } from 'types/CustomP5'

const width: number = 640
const height: number = 360
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: Background = [255]

const sketch: Sketch = async p5 => {
  const Mover4 = await import('types/Mover').then(mod => mod.Mover4)
  const location = p5.createVector(p5.random(p5.width), p5.random(p5.height))
  const velocity = p5.createVector(0, 0)
  const movers = Array.from(
    { length: 20 },
    () => new Mover4(p5, location, velocity)
  )

  p5.draw = () => {
    p5.background(background)

    movers.forEach(mover => {
      mover.update()
      mover.checkEdges()
      mover.display()
    })
  }
}

const Noc_1_11: NextPage = () => (
  <SketchWrapper
    sketch={sketch}
    dimensions={dimensions}
    padding={padding}
    background={background}
  />
)

export default Noc_1_11
