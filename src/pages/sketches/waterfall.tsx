import { ColorValue, Draw, MouseClicked } from '@react-p5/core'
import Sketch from 'components/Sketch'
import { NextPage } from 'next'
import signature from 'util/signature'

const width: number = 2048
const height: number = 2048
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: ColorValue = [255, 253, 252]
const lineCount: number = 40
const pointCount: number = 400
const points = Array.from({ length: pointCount })
const lines: void[] = Array.from({ length: lineCount })
let margin: number
let xBounds: number[]
let yBounds: number[]
let seed: number = 0

const draw: Draw = p5 => {
  margin = p5.width * 0.1
  xBounds = [margin, p5.width - margin]
  yBounds = [margin, p5.height - margin]

  p5.noiseSeed(seed)
  p5.randomSeed(seed)
  p5.noLoop()

  p5.strokeWeight(p5.width * 0.00175)
  p5.background(background)
  p5.noFill()

  lines.forEach((_, i) => {
    points.forEach((_, j) => {
      const u = j / (pointCount - 1)
      const v = i / (lineCount - 1)
      const x = p5.lerp(xBounds[0], xBounds[1], u)
      const y = p5.lerp(
        yBounds[0],
        yBounds[1],
        p5.constrain(
          p5.map(
            p5.noise(u, v, j),
            0,
            p5.noise(j),
            p5.constrain(p5.noise(u), 0, 0.5),
            i * 0.1
          ),
          0,
          p5.noise(j)
        )
      )

      p5.point(x, y)
    })
  })

  signature(p5, margin)
}

const mouseClicked: MouseClicked = (p5, e) => {
  if (e?.shiftKey) {
    seed--
  } else {
    seed++
  }
  p5.draw()
}

const Waterfall: NextPage = () => (
  <Sketch
    draw={draw}
    mouseClicked={mouseClicked}
    dimensions={dimensions}
    padding={padding}
    background={background}
  />
)

export default Waterfall
