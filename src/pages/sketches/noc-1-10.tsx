import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import type { Vector } from 'p5'
import { ColorValue, Draw, Setup } from 'types/CustomP5'
import { Mover3 } from 'types/Mover'
import { setupDefaults } from 'util/defaults'

const width: number = 640
const height: number = 360
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: ColorValue = [255]
const pixelDensity: number = 1
let location: Vector
let velocity: Vector
let acceleration: Vector

const setup: Setup = (p5, canvasParentRef) => {
  location = p5.createVector(p5.width / 2, p5.height / 2)
  velocity = p5.createVector(0, 0)
  acceleration = p5.constructor.Vector.random2D()
  setupDefaults({
    p5,
    canvasParentRef,
    dimensions,
    padding,
    background,
    pixelDensity,
  })
}

const draw: Draw = p5 => {
  p5.background(background)

  const mover = new Mover3(p5, location, velocity, acceleration)

  acceleration.mult(p5.random(2))

  mover.update()
  mover.checkEdges()
  mover.display()
}

const Noc_1_10: NextPage = () => <SketchWrapper setup={setup} draw={draw} />

export default Noc_1_10
