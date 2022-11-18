import { Draw, Setup, WindowResized } from '@react-p5/core'
import Sketch from 'components/Sketch'
import type { NextPage } from 'next'
import type { Graphics } from 'p5'

let spacing: number
let x = 0
let y = 0
let backgroundCanvas: Graphics

const setup: Setup = (p5, canvasParentRef) => {
  spacing = p5.windowWidth / 40
  p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef)
  backgroundCanvas = p5.createGraphics(p5.windowWidth, p5.windowHeight)
  backgroundCanvas.background(0)
  backgroundCanvas.clear(0, 0, 0, 0)
}

const draw: Draw = p5 => {
  p5.background(0)
  backgroundCanvas.stroke(255)
  backgroundCanvas.strokeWeight(p5.windowWidth / 200)

  if (p5.random(1) > 0.5) {
    backgroundCanvas.line(x, y, x + spacing, y + spacing)
  } else {
    backgroundCanvas.line(x, y + spacing, x + spacing, y)
  }

  x = x + spacing

  if (x > p5.width) {
    x = 0
    y = y + spacing
  }

  if (y > p5.height) {
    p5.noLoop()
  }

  p5.image(backgroundCanvas, 0, 0)
}

const windowResized: WindowResized = p5 => {
  p5.resizeCanvas(p5.windowWidth, p5.windowHeight)
  backgroundCanvas.clear(0, 0, 0, 0)
  x = 0
  y = 0
  p5.isLooping() === false && p5.loop()
}

const TenPrint: NextPage = () => (
  <Sketch setup={setup} draw={draw} windowResized={windowResized} />
)

export default TenPrint
