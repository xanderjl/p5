import { ColorValue, Draw } from '@react-p5/core'
import Sketch from 'components/Sketch'
import { NextPage } from 'next'

const width: number = 640
const height: number = 360
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: ColorValue = [255]

const draw: Draw = p5 => {
  p5.background(background)

  const mouse = p5.createVector(p5.mouseX, p5.mouseY)
  const center = p5.createVector(p5.width / 2, p5.height / 2)

  mouse.sub(center)
  mouse.normalize()
  mouse.mult(50)

  p5.translate(p5.width / 2, p5.height / 2)
  p5.line(0, 0, mouse.x, mouse.y)
}

const Noc_1_6: NextPage = () => (
  <Sketch
    draw={draw}
    dimensions={dimensions}
    padding={padding}
    background={background}
  />
)

export default Noc_1_6
