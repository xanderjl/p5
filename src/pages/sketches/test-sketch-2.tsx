import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { ColorValue, P5 } from 'types/CustomP5'

const width: number = 2048
const height: number = 2048
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: ColorValue = [0]

const draw = (p5: P5) => {
  p5.noLoop()
  p5.noFill()
  p5.stroke(255)
  p5.translate(p5.width / 2, p5.height / 2)
  p5.ellipse(0, 0, p5.width / 2)
}

const TestSketch_2: NextPage = () => (
  <SketchWrapper
    background={background}
    dimensions={dimensions}
    padding={padding}
    draw={draw}
    renderSVG
  />
)

export default TestSketch_2
