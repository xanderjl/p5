import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { Sketch } from 'react-p5-wrapper'

const width: number = 2048
const height: number = 2048
const padding: number[] = [40, 20]
const cols: number = 8
const rows: number = 8
const gridArray: number[][] = Array.from({ length: cols }, () =>
  Array.from({ length: rows }, () => 0)
)

const sketch: Sketch = p5 => {
  p5.draw = () => {
    p5.noFill()
    p5.stroke(255, 0, 0)

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
  <SketchWrapper
    sketch={sketch}
    width={width}
    height={height}
    padding={padding}
    background={[0]}
  />
)

export default FormBasedGridSystem
