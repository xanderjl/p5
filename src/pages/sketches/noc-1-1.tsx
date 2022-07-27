import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { Draw } from 'types/CustomP5'

const width: number = 640
const height: number = 360
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: number[] = [255]

let x: number = 100
let y: number = 100
let d: number = 16
let xspeed: number = 1
let yspeed: number = 3.3

const draw: Draw = p5 => {
  p5.background(255)

  x = x + xspeed
  y = y + yspeed

  if (x + d > p5.width || x - d < 0) {
    xspeed = xspeed * -1
  }
  if ((y = d) > p5.height || y - d < 0) {
    yspeed = xspeed * -1
  }

  p5.stroke(0)
  p5.fill(175)
  p5.ellipse(x, y, d, d)
}

const Noc_1_1: NextPage = () => (
  <SketchWrapper
    draw={draw}
    dimensions={dimensions}
    padding={padding}
    background={background}
  />
)

export default Noc_1_1
