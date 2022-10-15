import { convertSeed } from '@react-p5/utils'
import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import type { Graphics, Vector } from 'p5'
import { ColorValue, Draw, P5, Setup, WindowResized } from 'types/CustomP5'
import signature from 'util/signature'

const width: number = 2048
const height: number = 2048
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: ColorValue = [255, 253, 252]
const seed: number = convertSeed(`I'm afraid to see you tonight.`)
let grain: Graphics

const setup: Setup = p5 => {
  grain = p5.createGraphics(p5.width, p5.height)

  grain.loadPixels()
  Array.from({ length: p5.width }, (_, i) => {
    Array.from({ length: p5.height }, (_, j) => {
      const rgb = p5.random(255)
      grain.set(i, j, p5.color(rgb, 10))
    })
  })
  grain.updatePixels()
}

const draw: Draw = p5 => {
  const margin = p5.width * 0.1
  const length = 1000
  const cx = p5.width * 0.5
  const cy = p5.height * 0.5

  p5.noLoop()
  p5.background(background)
  p5.noFill()
  p5.stroke(5, 0, 0)

  p5.beginShape()
  Array.from({ length }, () => {
    const x = p5.random(margin, p5.width - margin)
    const y = p5.random(margin, p5.height - margin)

    p5.curveVertex(x, y)
  })
  p5.endShape()

  p5.beginShape()
  Array.from({ length }, () => {
    const r = 20 * Math.sqrt(p5.random(p5.width * 0.375))
    const a = p5.random(p5.TWO_PI)
    const x = cx + r * Math.cos(a)
    const y = cy + r * Math.sin(a)

    p5.vertex(x, y)
  })
  p5.endShape()

  p5.beginShape()
  Array.from({ length: length * 0.25 }, () => {
    const r = 20 * Math.sqrt(p5.random(p5.width * 0.1))
    const a = p5.random(p5.TWO_PI)
    const x = cx + r * Math.cos(a)
    const y = cy + r * Math.sin(a)

    background.push(p5.random(100, 200))
    p5.stroke(background)
    background.pop()

    p5.curveVertex(x, y)
  })
  p5.endShape()

  p5.noStroke()
  p5.fill(background)
  p5.ellipse(cx, cy, p5.width * 0.25)

  Array.from({ length }, () => {
    const r = 20 * Math.sqrt(p5.random(p5.width * 0.035))
    const a = p5.random(p5.TWO_PI)
    const x = cx + r * Math.cos(a)
    const y = cy + r * Math.sin(a)
    const rand = p5.random(1)

    const fill =
      rand < 0.3
        ? [5, 0, 0]
        : rand < 0.5 && rand > 0.3
        ? [0, 0, 0, 0]
        : [0, 0, 0, 190]

    p5.stroke(5, 0, 0)
    p5.fill(fill)

    p5.ellipse(x, y, p5.random(4))
  })

  p5.image(grain, 0, 0)

  signature(p5)
}

const poissonDisk = (p5: P5, radius: number, k: number): Vector[] => {
  const n: number = 2
  const points: Vector[] = []
  const active: Vector[] = []
  let grid: Vector[][] | null[][]
  const cellSize: number = Math.floor(radius / Math.sqrt(n))
  const p0: Vector = p5.createVector(p5.random(p5.width), p5.random(p5.height))

  const insertPoint = (grid: Vector[][] | null[][], point: Vector) => {
    const x = Math.floor(point.x / cellSize)
    const y = Math.floor(point.y / cellSize)

    grid[x][y] = point
  }

  const nCellsWidth = Math.ceil(p5.width / cellSize) + 1
  const nCellsHeight = Math.ceil(p5.height / cellSize) + 1

  grid = Array.from({ length: nCellsWidth }, () =>
    Array.from({ length: nCellsHeight }, () => null)
  )

  insertPoint(grid, p0)
  points.push(p0)
  active.push(p0)

  while (active.length > 0) {
    const i = Math.floor(p5.random(active.length))
    const p: Vector = active[i]

    const found = Array.from({ length: k }).filter(() => {
      const t: number = p5.random(360)
      const newR: number = p5.random(radius, 2 * radius)
      const px: number = p.x + newR * Math.cos(p5.radians(t))
      const py: number = p.y + newR * Math.sin(p5.radians(t))
      const pNew: Vector = p5.createVector(px, py)

      if (
        !isValidPoint(
          p5,
          grid,
          cellSize,
          nCellsWidth,
          nCellsHeight,
          pNew,
          radius
        )
      ) {
        return false
      }

      points.push(pNew)
      insertPoint(grid, pNew)
      active.push(pNew)
      return true
    })

    if (!found) {
      active.splice(i, 1)
    }
  }

  return points
}

const isValidPoint = (
  p5: P5,
  grid: Vector[][] | null[][],
  cellSize: number,
  gWidth: number,
  gHeight: number,
  p: Vector,
  radius: number
): boolean => {
  if (p.x < 0 || p.x >= p5.width || p.y < 0 || p.y >= p5.height) {
    return false
  }

  const x: number = Math.floor(p.x / cellSize)
  const y: number = Math.floor(p.y / cellSize)
  const i0: number = Math.max(x - 1, 0)
  const i1: number = Math.min(x + 1, gWidth - 1)
  const j0: number = Math.max(y - 1, 0)
  const j1: number = Math.min(y + 1, gHeight - 1)

  // Array.from({ length: i1 }, (_, i) => {
  //   Array.from({ length: j1 }, (_, j) => {
  //     if (grid[i][j] != null) {
  //       if (p5.dist(grid[i][j]!.x, grid[i][j]!.y, p.x, p.y) < radius) {
  //         return false
  //       }
  //     }
  //   })
  // })
  for (let i = i0; i <= i1; i++) {
    for (let j = j0; j <= j1; j++) {
      if (grid[i][j] != null) {
        if (p5.dist(grid[i][j]!.x, grid[i][j]!.y, p.x, p.y) < radius) {
          return false
        }
      }
    }
  }

  return true
}

const windowResized: WindowResized = p5 => {
  grain.resizeCanvas(p5.width, p5.height)
}

const AnxiousSketch: NextPage = () => (
  <SketchWrapper
    setup={setup}
    draw={draw}
    windowResized={windowResized}
    dimensions={dimensions}
    padding={padding}
    background={background}
    seed={seed}
  />
)

export default AnxiousSketch
