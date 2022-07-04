import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { Sketch } from 'react-p5-wrapper'

const sketch: Sketch = p5 => {
  p5.draw = () => {
    const scale: number = 100
    const cols: number = Math.round(p5.width / scale)
    const rows: number = Math.round(p5.height / scale)
    const gridArray: number[][] = Array.from({ length: cols }, () =>
      Array.from({ length: rows }, () => 0)
    )

    p5.background(0)
    p5.noFill()
    p5.stroke(255)

    gridArray.forEach((cell, col) => {
      cell.forEach((_, row) => {
        const colsScale = p5.width / cols
        const rowsScale = p5.height / rows
        p5.rect(col * colsScale, row * rowsScale, colsScale, rowsScale)
      })
    })
  }
}

const FormBasedGridSystem: NextPage = () => (
  <SketchWrapper sketch={sketch} padding={[40, 20]} width={800} height={800} />
)

export default FormBasedGridSystem
