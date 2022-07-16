import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { Sketch } from 'react-p5-wrapper'
import { ColorValue } from 'types/CustomP5'
import createGrid from 'util/createGrid'

const width: number = 2048
const height: number = 2048
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: ColorValue = [255, 253, 252]
let seed: number = 0
const count: number = 40
const grid = createGrid(count)

const sketch: Sketch = p5 => {
  p5.draw = () => {
    const margin: number = Math.floor(p5.width / 10)

    grid.forEach(([u, v]) => {
      const x = p5.lerp(margin, p5.width - margin, u)
      const y = p5.lerp(margin, p5.height - margin, v)

      p5.point(x, y)
    })
  }
}

const Distribution: NextPage = () => (
  <SketchWrapper
    sketch={sketch}
    dimensions={dimensions}
    padding={padding}
    background={background}
    suffix={seed}
  />
)

export default Distribution
