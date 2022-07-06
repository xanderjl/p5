import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { Sketch } from 'react-p5-wrapper'
import createGrid from 'util/createGrid'

const width: number = 2048
const height: number = 2048
const padding: number[] = [40, 20]
const count: number = 8
const points = createGrid(count)
const vertices: number[][] = [
  [0, 0],
  [0, 8],
  [8, 8],
]

const sketch: Sketch = p5 => {
  p5.draw = () => {
    const scale = p5.width / count

    p5.fill(255)
    p5.beginShape()
    vertices.forEach(([x, y]) => {
      p5.vertex(x * scale, y * scale)
    })
    p5.endShape()

    p5.noFill()
    p5.stroke(255, 0, 0)
    points.forEach(([u, v]) => {
      const x = u * p5.width
      const y = v * p5.height
      p5.line(x - scale, y, x + scale, y)
      p5.line(x, y - scale / 4, x, y + scale / 4)
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
