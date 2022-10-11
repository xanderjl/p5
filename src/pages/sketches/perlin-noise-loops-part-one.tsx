import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { Draw, Setup, WindowResized } from 'types/CustomP5'
import { setupDefaults } from 'util/defaults'

const noiseMax = 3
const delta = 0.2
let bounds: number
let rMin: number
let rMax: number
let zoff = 0

const setup: Setup = (p5, canvasParentRef) => {
  bounds = Boolean(p5.windowWidth > p5.windowHeight)
    ? p5.windowHeight
    : p5.windowWidth
  rMin = bounds * 0.25
  rMax = bounds * 0.5
  setupDefaults({ p5, canvasParentRef })
}

const draw: Draw = p5 => {
  p5.background(0)
  p5.translate(p5.width / 2, p5.height / 2)
  p5.stroke(255)
  p5.noFill()

  p5.beginShape()
  Array.from({ length: p5.TWO_PI / delta }).forEach((_, i) => {
    const a = i * delta
    const xoff = p5.map(Math.cos(a), -1, 1, 0, noiseMax)
    const yoff = p5.map(Math.sin(a), -1, 1, 0, noiseMax)
    const r = p5.map(p5.noise(xoff, yoff, zoff), 0, 1, rMin, rMax)
    const x = r * Math.cos(a)
    const y = r * Math.sin(a)
    p5.vertex(x, y)
  })
  p5.endShape(p5.CLOSE)

  zoff += 0.012
}

const windowResized: WindowResized = p5 => {
  p5.resizeCanvas(p5.windowWidth, p5.windowHeight)
  bounds = Boolean(p5.windowWidth > p5.windowHeight)
    ? p5.windowHeight
    : p5.windowWidth
  rMin = bounds * 0.25
  rMax = bounds * 0.5
  p5.clear(0, 0, 0, 0)
  p5.redraw()
}

const PerlinNoiseLoopsPartOne: NextPage = () => (
  <SketchWrapper setup={setup} draw={draw} windowResized={windowResized} />
)

export default PerlinNoiseLoopsPartOne
