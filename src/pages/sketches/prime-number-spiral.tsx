import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { Sketch } from 'react-p5-wrapper'

const sketch: Sketch = p5 => {
  p5.setup = () => {
    p5.createCanvas(500, 500)
  }

  p5.draw = () => {
    p5.background(0)
  }
}

const PrimeNumberSpiral: NextPage = () => <SketchWrapper sketch={sketch} />

export default PrimeNumberSpiral
