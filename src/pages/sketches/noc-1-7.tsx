import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import type { Vector } from 'p5'
import { ColorValue, Draw, Setup } from 'types/CustomP5'
import { Mover } from 'types/Mover'
import { setupDefaults } from 'util/defaults'

const width: number = 640
const height: number = 360
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: ColorValue = [255]
let location: Vector
let velocity: Vector

const setup: Setup = (p5, canvasParentRef) => {
  setupDefaults({ p5, canvasParentRef, dimensions, padding, background })
  location = p5.createVector(p5.random(p5.width), p5.random(p5.height))
  velocity = p5.createVector(p5.random(-2, 2), p5.random(-2, 2))
}

const draw: Draw = p5 => {
  p5.background(background)

  const mover = new Mover(p5, location, velocity)

  mover.update()
  mover.checkEdges()
  mover.display()
}

const Noc_1_7: NextPage = () => <SketchWrapper setup={setup} draw={draw} />

export default Noc_1_7
