import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { Sketch } from 'react-p5-wrapper'

const sketch: Sketch = p5 => {
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
    grid.forEach((cell, col) => {
      cell.forEach((_, row) => {
        const angle: number = (row / numRows) * Math.PI

        grid[col][row] = angle
      })
    })
  }

  p5.draw = () => {}
}

const LearningMoreFlowFields: NextPage = () => <SketchWrapper sketch={sketch} />

export default LearningMoreFlowFields
