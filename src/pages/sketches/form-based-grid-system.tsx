import { Draw } from '@react-p5/core'
import Sketch from 'components/Sketch'
import { NextPage } from 'next'
import createGrid from 'util/createGrid'
import { redGrid } from 'util/shapes'

const width: number = 2048
const height: number = 2048
const padding: number[] = [40, 20]
const count: number = 8
const points = createGrid(count)
const vertices: number[][] = [
  [0, 0],
  [0, count],
  [count, count],
]

const draw: Draw = p5 => {
  const scale = p5.width / count

  p5.fill(255)
  p5.beginShape()
  vertices.forEach(([x, y]) => {
    p5.vertex(x * scale, y * scale)
  })
  p5.endShape()

  redGrid(p5, points, scale)
}

const FormBasedGridSystem: NextPage = () => (
  <Sketch
    draw={draw}
    width={width}
    height={height}
    padding={padding}
    background={[0]}
  />
)

export default FormBasedGridSystem
