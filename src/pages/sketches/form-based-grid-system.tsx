import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { Sketch } from 'react-p5-wrapper'

const sketch: Sketch = p5 => {
  const scale: number = 100
  const cols: number = p5.windowWidth / scale
  const rows: number = p5.windowHeight / scale
  const gridArray: number[][] = Array.from({ length: cols }, () =>
    Array.from({ length: rows }, () => 0)
  )

  p5.setup = () => {
    p5.createCanvas(800, 800)
  }

  p5.draw = () => {
    p5.background(0)
    p5.noFill()
    p5.stroke(255)

    gridArray.forEach((cell, col) => {
      cell.forEach((_, row) => p5.rect(col * scale, row * scale, scale, scale))
    })
  }
}

const FormBasedGridSystem: NextPage = () => <SketchWrapper sketch={sketch} />

export default FormBasedGridSystem
