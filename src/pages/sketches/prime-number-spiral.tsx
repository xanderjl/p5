import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { Sketch } from 'react-p5-wrapper'
import getIsPrime from 'util/getIsPrime'

const sketch: Sketch = p5 => {
  let x: number
  let y: number
  let step: number = 1
  let stepSize: number = 10
  let numSteps: number = 1
  let state: number = 0
  let turnCounter: number = 1
  let totalSteps: number

  p5.draw = () => {
    p5.background(0)
    const cols = p5.width / stepSize
    const rows = p5.height / stepSize
    totalSteps = cols * rows * 2

    x = p5.width / 2
    y = p5.height / 2
    p5.background(0)

    while (step <= totalSteps) {
      p5.fill(255)
      p5.stroke(255)
      p5.rectMode(p5.CENTER)
      getIsPrime(step) && p5.circle(x, y, stepSize * 0.25)

      switch (state) {
        case 0:
          x += stepSize
          break
        case 1:
          y -= stepSize
          break
        case 2:
          x -= stepSize
          break
        case 3:
          y += stepSize
          break
      }

      if (step % numSteps == 0) {
        state = (state + 1) % 4
        turnCounter++
        if (turnCounter % 2 == 0) {
          numSteps++
        }
      }
      step++

      if (step > totalSteps) {
        p5.noLoop()
      }
    }

    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, p5.windowHeight)
      step = 0
      x = p5.width / 2
      y = p5.height / 2
      numSteps = 1
      state = 0
      turnCounter = 1
      p5.clear(0, 0, 0, 0)
      p5.loop()
    }
  }
}

const PrimeNumberSpiral: NextPage = () => <SketchWrapper sketch={sketch} />

export default PrimeNumberSpiral
