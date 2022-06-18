import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import React from 'react'
import { Sketch } from 'react-p5-wrapper'

const sketch: Sketch = p5 => {
  let t: number
  let step: number = 0
  let totalSteps: number

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight)
    p5.background(255)
    p5.noFill()
    p5.stroke(0, 18, 0)
    t = 0
    totalSteps = 300

    const saveButton = p5.createButton('save')
    const redrawButton = p5.createButton('redraw')

    saveButton.style(`
      background: #ED225D;
      color: white;
      padding: 6px 12px;
      border-radius: 8px;
    `)
    saveButton.position(10, 10)
    saveButton.mouseClicked(() => p5.saveCanvas('perlin-noise'))

    redrawButton.style(`
      background: #00df8f;
      color: white;
      padding: 6px 12px;
      border-radius: 8px;
    `)
    redrawButton.position(80, 10)
    redrawButton.mouseClicked(() => {
      step = 0
      p5.clear(0, 0, 0, 0)
      p5.background(255)
      p5.redraw()
    })
  }

  p5.draw = () => {
    while (step <= totalSteps) {
      const x1 = p5.width * p5.noise(t + 150)
      const x2 = p5.width * p5.noise(t + 35)
      const x3 = p5.width * p5.noise(t + 55)
      const x4 = p5.width * p5.noise(t + 75)
      const y1 = p5.height * p5.noise(t + 85)
      const y2 = p5.height * p5.noise(t + 95)
      const y3 = p5.height * p5.noise(t + 125)
      const y4 = p5.height * p5.noise(t + 150)

      // draw bezier curve
      p5.bezier(x1, y1, x2, y2, x3, y3, x4, y4)

      // speed of time
      t += 0.0045

      // increment step
      step++
    }
  }
}

const PerlinNoise: NextPage = () => <SketchWrapper sketch={sketch} />

export default PerlinNoise
