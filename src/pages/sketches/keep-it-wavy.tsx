import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { ColorValue, Draw, MouseClicked, Setup } from 'types/CustomP5'

const width: number = 1000
const height: number = 1000
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: ColorValue = [255, 253, 252]

let xLeft: number
let xRight: number
let yTop: number
let yBottom: number
let resolution: number
let numColumns: number
let numRows: number
let grid: number[][]
let angle: number
let seed: number = 0

const setup: Setup = p5 => {
  xLeft = p5.width * -0.5
  xRight = p5.width * 1.5
  yTop = p5.height * -0.5
  yBottom = p5.height * 1.5
  resolution = p5.width * 0.01
  numColumns = (xRight - xLeft) / resolution
  numRows = (yBottom - yTop) / resolution
}

const draw: Draw = p5 => {
  grid = Array.from({ length: numColumns }, () =>
    Array.from({ length: numRows })
  )
  p5.noiseSeed(seed)
  p5.randomSeed(seed)
  p5.noLoop()
  p5.background(background)

  // show flow field
  grid = grid.map((_, x) => {
    return _.map((_, y) => {
      const xScaled = x * 0.005
      const yScaled = y * 0.005
      const noiseVal = p5.noise(xScaled, yScaled)
      angle = p5.map(noiseVal, 0, 1, 0, p5.TWO_PI)
      const vec = p5.constructor.Vector.fromAngle(angle)
      vec.setMag(0.25)

      p5.stroke(0)
      p5.strokeWeight(1)
      p5.push()
      p5.translate(x * resolution, y * resolution)
      p5.rotate(vec.heading())
      p5.ellipse(0, 0, 2)
      p5.line(0, 0, resolution, 0)
      p5.pop()

      return angle
    })
  })

  // draw curve
  let xStart = p5.map(p5.noise(seed, seed), 0, 1, 0, numColumns)
  let yStart = p5.map(p5.noise(seed, seed), 0, 1, 0, numRows)
  let stepLength = 4

  p5.stroke('red')
  p5.strokeWeight(3)
  p5.noFill()
  p5.beginShape()
  Array.from({ length: 100 }).forEach(() => {
    p5.vertex(xStart, yStart)
    let xOff = xStart - xLeft
    let yOff = yStart - yTop
    let colIndex = Math.floor(xOff / resolution)
    let rowIndex = Math.floor(yOff / resolution)
    angle = grid[colIndex][rowIndex]
    let xStep = stepLength * Math.cos(angle)
    let yStep = stepLength * Math.sin(angle)

    xStart = xStart + xStep
    yStart = yStart + yStep
  })
  p5.endShape()
}

const mouseClicked: MouseClicked = (p5, e) => {
  if (e.shiftKey) {
    seed--
  } else {
    seed++
  }
  p5.loop()
  p5.noLoop()
}

const KeepItWavy: NextPage = () => (
  <SketchWrapper
    setup={setup}
    draw={draw}
    mouseClicked={mouseClicked}
    dimensions={dimensions}
    padding={padding}
    background={background}
  />
)

export default KeepItWavy
