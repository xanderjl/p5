import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { Sketch } from 'react-p5-wrapper'

const sketch: Sketch = async p5 => {
  const Vector = await import('p5').then(mod => mod.default.Vector)

  const left: number = p5.windowWidth * -0.5
  const right: number = p5.windowWidth * 1.5
  const top: number = p5.windowHeight * -0.5
  const bottom: number = p5.windowHeight * 1.5
  const res: number = p5.windowWidth * 0.01
  const numColumns: number = (right - left) / res
  const numRows: number = (bottom - top) / res
  const defaultAngle: number = Math.PI * 0.25
  const grid: number[][] = Array.from({ length: numColumns }, () =>
    Array.from({ length: numRows }, () => defaultAngle)
  )

  p5.setup = () => {
    p5.createCanvas(1000, 1000)
    p5.background(0)
    p5.stroke(255)
    p5.strokeWeight(1)

    grid.forEach((cell, col) => {
      cell.forEach((_, row) => {
        const angle: number = (row / numRows) * Math.PI

        grid[col][row] = angle

        const vector = Vector.fromAngle(angle)
        const { x, y } = vector

        p5.beginShape()
        p5.curveVertex(x, y)
        p5.curveVertex(row * res, col * res)
        p5.endShape()
      })
    })
  }

  p5.draw = () => {}
}

const LearningMoreFlowFields: NextPage = () => <SketchWrapper sketch={sketch} />

export default LearningMoreFlowFields
