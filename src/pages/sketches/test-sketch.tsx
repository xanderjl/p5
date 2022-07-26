import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import type P5 from 'p5'

const dimensions: number[] = [2048, 2048]

const draw = (p5: P5) => {
  p5.background(0)
}

const TestSketch: NextPage = () => (
  <SketchWrapper dimensions={dimensions} draw={draw} renderSVG />
)

export default TestSketch
