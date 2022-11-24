import { Draw, MouseClicked, P5, Setup, WindowResized } from '@react-p5/core'
import Sketch from 'components/Sketch'
import _ from 'lodash'
import { NextPage } from 'next'
import palettes from 'nice-color-palettes'

interface Point {
  position: number[]
  diameter: number
  color: string
}

const width = 2048
const height = 2048
const dimensions = [width, height]
const padding = [40]
const background = [255]
const palette = _.sample(palettes)!
let points: Point[] = []
let margin: number = 0
let seed = 28

const createGrid = (p5: P5) => {
  const count: number = 20
  const grid: number[][] = Array.from({ length: count }, () =>
    Array.from({ length: count })
  )

  grid.forEach((_, x) => {
    _.forEach((_, y) => {
      const u = count <= 1 ? 0.5 : x / (count - 1)
      const v = count <= 1 ? 0.5 : y / (count - 1)
      const color =
        palette[Math.floor(p5.map(p5.random(), 0, 1, 0, palette.length))]
      const position = [u, v]
      const min = (p5.width - padding[0] * 2) * 0.06
      const max = (p5.width - padding[0] * 2) * 0.025
      const diameter = p5.map(p5.randomGaussian(1.5, 1.5), 0, 1, min, max)

      points.push({ position, diameter, color })
    })
  })

  return points
}

const setup: Setup = p5 => {
  p5.randomSeed(seed)
  points = createGrid(p5).filter(() => p5.random() > 0.5)
  margin = (p5.width - padding[0] * 2) * 0.125
}

const draw: Draw = p5 => {
  p5.background(background)
  points.forEach(({ position, diameter, color }) => {
    const [u, v] = position
    const x = p5.lerp(margin, p5.width - margin, u)
    const y = p5.lerp(margin, p5.height - margin, v)

    p5.noStroke()
    p5.fill(color)
    p5.circle(x, y, diameter)
  })
}

const windowResized: WindowResized = p5 => {
  points = []
  points = createGrid(p5).filter(() => p5.random() > 0.5)
  margin = (p5.width - padding[0] * 2) * 0.125
}

const mouseClicked: MouseClicked = p5 => {
  seed++
  points = []
  p5.background(background)
  points = createGrid(p5).filter(() => p5.random() > 0.5)
}

const AsymmetricGrid: NextPage = () => (
  <Sketch
    setup={setup}
    draw={draw}
    dimensions={dimensions}
    windowResized={windowResized}
    mouseClicked={mouseClicked}
    width={width}
    height={height}
    padding={padding}
    background={background}
    suffix={seed.toString()}
  />
)

export default AsymmetricGrid
