import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import type P5 from 'p5'
import { ColorValue } from 'types/CustomP5'
const Sketch = dynamic<any>(
  () =>
    import('react-p5').then(mod => {
      require('p5.js-svg')
      return mod.default
    }),
  { ssr: false }
)

const width: number = 800
const height: number = 800
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: ColorValue = [255, 253, 252]

const setup = (p5: P5, canvasParentElement: Element) => {
  p5.createCanvas(width, height, p5.SVG).parent(canvasParentElement)
  p5.background(0)
}

const TestSketch_2: NextPage = () => <Sketch setup={setup} />

export default TestSketch_2
