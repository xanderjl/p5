import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { Sketch } from 'react-p5-wrapper'
import { Background } from 'types/CustomP5'

const width: number = 640
const height: number = 360
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: Background = [255]

const sketch: Sketch = p5 => {
  p5.draw = () => {
    p5.background(background)

    const mouse = p5.createVector(p5.mouseX, p5.mouseY)
    const center = p5.createVector(p5.width / 2, p5.height / 2)

    mouse.sub(center)

    const m: number = mouse.mag()
    p5.fill(0)
    p5.rect(0, 0, m, 10)

    p5.translate(p5.width / 2, p5.height / 2)
    p5.line(0, 0, mouse.x, mouse.y)
  }
}

const Noc_1_5: NextPage = () => (
  <SketchWrapper
    sketch={sketch}
    dimensions={dimensions}
    padding={padding}
    background={background}
  />
)

export default Noc_1_5
