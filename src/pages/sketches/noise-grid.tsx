import SketchWrapper from 'components/SketchWrapper'
import { sample } from 'lodash'
import { NextPage } from 'next'
import palettes from 'nice-color-palettes'
import { Sketch } from 'react-p5-wrapper'
import windowResized from 'util/windowResized'

interface Point {
  color: string
  radius: number
  rotation: number
  position: number[]
}

const dimensions: number[] = [2048, 2048]
const padding: number[] = [40]
const background: number[] = [255]
const palette: string[] = sample(palettes)!
let seed: number = 5

const sketch: Sketch = p5 => {
  let points: Point[] = []
  const createGrid = (): Point[] => {
    const count = 20
    p5.randomSeed(seed)
    p5.noiseSeed(seed)

    Array.from({ length: count }, () => Array.from({ length: count })).forEach(
      (_, x) => {
        _.forEach((_, y) => {
          const u = count <= 1 ? 0.05 : x / (count - 1)
          const v = count <= 1 ? 0.05 : y / (count - 1)
          const randomness = p5.map(p5.noise(u, v), 0, 1, -1, 1)
          const radius = Math.abs(randomness * 0.3)
          const rotation = randomness * 0.8
          const color =
            palette[Math.floor(p5.map(p5.random(), 0, 1, 0, palette.length))]
          const position = [u, v]

          points.push({
            color,
            radius,
            rotation,
            position,
          })
        })
      }
    )

    return points
  }

  const margin = 150
  const ascii = ['.', '+', '*', 'ﾊﾐ', 'ﾋ', 'ｼ']

  p5.draw = () => {
    p5.randomSeed(seed)
    p5.noiseSeed(seed)
    points = createGrid().filter(() => p5.random() > 0.5)
    p5.fill(255)
    p5.background(255)

    points.forEach(({ color, radius, rotation, position }) => {
      const [u, v] = position
      const x = p5.lerp(margin, p5.width - margin, u)
      const y = p5.lerp(margin, p5.height - margin, v)
      const text = ascii[Math.floor(p5.map(p5.random(), 0, 1, 0, ascii.length))]
      const textSize = radius * p5.noise(x, y, margin) * p5.width * 1.5

      p5.push()
      p5.fill(color)
      p5.textSize(textSize)
      p5.textStyle('bold')
      p5.translate(x, y)
      p5.rotate(rotation)
      p5.text(text, 0, 0).textFont('Helvetica')
      p5.pop()
    })

    p5.noLoop()
  }

  p5.windowResized = () => {
    windowResized({ p5, dimensions, padding, background })

    p5.randomSeed(seed)
    p5.noiseSeed(seed)
    points = createGrid().filter(() => p5.random() > 0.5)
    p5.fill(255)
    p5.background(255)

    points.forEach(({ color, radius, rotation, position }) => {
      const [u, v] = position
      const x = p5.lerp(margin, p5.width - margin, u)
      const y = p5.lerp(margin, p5.height - margin, v)
      const text = ascii[Math.floor(p5.map(p5.random(), 0, 1, 0, ascii.length))]
      const textSize = radius * p5.noise(x, y, margin) * p5.width * 0.8

      p5.push()
      p5.fill(color)
      p5.textSize(textSize)
      p5.translate(x, y)
      p5.rotate(rotation)
      p5.text(text, 0, 0).textFont('Helvetica')
      p5.pop()
    })

    p5.noLoop()
  }

  p5.mouseClicked = () => {
    seed++
    p5.loop()
    p5.noLoop()
  }
}

const NoiseGrid: NextPage = () => (
  <SketchWrapper
    sketch={sketch}
    dimensions={dimensions}
    padding={padding}
    background={background}
    suffix={seed}
  />
)

export default NoiseGrid
