import { Draw, Setup } from '@react-p5/core'
import Sketch from 'components/Sketch'
import { NextPage } from 'next'
import { Vector } from 'p5'
import { setupDefaults } from 'util/defaults'

const width: number = 640
const height: number = 260
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: number[] = [255]
let location: Vector
let velocity: Vector

const setup: Setup = (p5, canvasParentRef) => {
  location = p5.createVector(100, 100)
  velocity = p5.createVector(2.5, 5)
  setupDefaults({ p5, canvasParentRef, dimensions, padding, background })
}

const draw: Draw = p5 => {
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

const Noc_1_2: NextPage = () => <Sketch setup={setup} draw={draw} />

export default Noc_1_2
