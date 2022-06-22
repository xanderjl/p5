import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { Sketch } from 'react-p5-wrapper'

const sketch: Sketch = p5 => {
  p5.setup = () => {}

  p5.draw = () => {}
}

const FlowField: NextPage = () => <SketchWrapper sketch={sketch} />

export default FlowField
