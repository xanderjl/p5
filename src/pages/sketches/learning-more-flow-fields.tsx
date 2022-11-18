import { Draw, WindowResized } from '@react-p5/core'
import Sketch from 'components/Sketch'
import { NextPage } from 'next'

const draw: Draw = p5 => {
  p5.noLoop()

  const left: number = p5.windowWidth * -0.5
  const right: number = p5.windowWidth * 1.5
  const top: number = p5.windowHeight * -0.5
  const bottom: number = p5.windowHeight * 1.5
  const res: number = p5.windowWidth * 0.01
  const numColumns: number = Math.ceil((right - left) / res)
  const numRows: number = Math.ceil((bottom - top) / res)
  const defaultAngle: number = Math.PI * 0.25
  const grid: number[][] = Array.from({ length: numColumns }, () =>
    Array.from({ length: numRows }, () => defaultAngle)
  )
  p5.stroke(255)
  p5.strokeWeight(2)

  grid.forEach((cell, col) => {
    cell.forEach((_, row) => {
      const angle: number = (row / numRows) * Math.PI

      grid[col][row] = angle
      const vector = p5.constructor.Vector.fromAngle(angle)

      p5.push()
      p5.translate(col * res, row * res)
      p5.rotate(vector.heading())
      p5.beginShape()
      p5.vertex(0, 0)
      p5.vertex(res, 0)
      p5.endShape()
      p5.pop()
    })
  })
}

const windowResized: WindowResized = p5 => {
  p5.resizeCanvas(p5.windowWidth, p5.windowHeight)
  p5.background(0)
  p5.redraw()
}

const LearningMoreFlowFields: NextPage = () => (
  <Sketch draw={draw} windowResized={windowResized} background={[0]} />
)

export default LearningMoreFlowFields
