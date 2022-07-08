import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { Sketch } from 'react-p5-wrapper'

const width: number = 640
const height: number = 260
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: number[] = [255]

const sketch: Sketch = p5 => {
  const location = p5.createVector(100, 100)
  const velocity = p5.createVector(2.5, 5)
  p5.draw = () => {
    p5.background(255)

    location.add(velocity)
    if (location.x > p5.width || location.x < 0) {
      velocity.x = velocity.x * -1
    }
    if (location.y > p5.height || location.y < 0) {
      velocity.y = velocity.y * -1
    }

    p5.stroke(0)
    p5.fill(175)
    p5.ellipse(location.x, location.y, 16, 16)
  }
}

const Noc_1_2: NextPage = () => (
  <SketchWrapper
    sketch={sketch}
    dimensions={dimensions}
    padding={padding}
    background={background}
  />
)

export default Noc_1_2
