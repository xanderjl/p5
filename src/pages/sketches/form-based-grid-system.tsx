import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { Draw } from 'types/CustomP5'
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
  <SketchWrapper
    draw={draw}
    width={width}
    height={height}
    padding={padding}
    background={[0]}
  />
)

export default FormBasedGridSystem
