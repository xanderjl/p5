import { ColorValue, Draw, Setup } from '@react-p5/core'
import Sketch from 'components/Sketch'
import { NextPage } from 'next'
import type { Vector } from 'p5'
import { Mover3 } from 'types/Mover'

const width: number = 640
const height: number = 360
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: ColorValue = [255]
const pixelDensity: number = 1
let location: Vector
let velocity: Vector
let acceleration: Vector

const setup: Setup = p5 => {
  location = p5.createVector(p5.width / 2, p5.height / 2)
  velocity = p5.createVector(0, 0)
  acceleration = p5.constructor.Vector.random2D()
}

const draw: Draw = p5 => {
  p5.background(background)

  const mover = new Mover3(p5, location, velocity, acceleration)

  acceleration.mult(p5.random(2))

  mover.update()
  mover.checkEdges()
  mover.display()
}

const Noc_1_10: NextPage = () => (
  <Sketch
    setup={setup}
    draw={draw}
    dimensions={dimensions}
    padding={padding}
    pixelDensity={pixelDensity}
  />
)

export default Noc_1_10
