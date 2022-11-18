import { Draw, WindowResized } from '@react-p5/core'
import Sketch from 'components/Sketch'
import { NextPage } from 'next'
import { windowResizedDefaults } from 'util/defaults'

interface Point {
  position: number[]
}

const width = 2048
const height = 2048
const padding = [40]
const background = [0]

const createGrid = () => {
  const points: Point[] = []
  const count: number = 50
  const grid: number[][] = Array.from({ length: count }, () =>
    Array.from({ length: count })
  )

  grid.forEach((_, x) => {
    _.forEach((_, y) => {
      const u = count <= 1 ? 0.5 : x / (count - 1)
      const v = count <= 1 ? 0.5 : y / (count - 1)
      const position = [u, v]

      points.push({ position })
    })
  })

  return points
}
const points: Point[] = createGrid().filter(() => Math.random() > 0.5)
const margin: number = 100

const draw: Draw = p5 => {
  p5.noLoop()
  p5.background(background)
  points.forEach(({ position }) => {
    const [u, v] = position
    const x = p5.lerp(margin, p5.width - margin, u)
    const y = p5.lerp(margin, p5.height - margin, v)
    const d = p5.width * 0.0075

    p5.fill(255)
    p5.circle(x, y, d)
  })
}

const windowResized: WindowResized = p5 => {
  windowResizedDefaults({ p5, width, height, padding })
  p5.background(background)
  points.forEach(({ position }) => {
    const [u, v] = position
    const x = p5.lerp(margin, p5.width - margin, u)
    const y = p5.lerp(margin, p5.height - margin, v)
    const d = p5.width * 0.0075

    p5.fill(255)
    p5.circle(x, y, d)
  })
}

const GridDots: NextPage = () => (
  <Sketch
    draw={draw}
    windowResized={windowResized}
    width={width}
    height={width}
    padding={padding}
    background={background}
  />
)

export default GridDots
