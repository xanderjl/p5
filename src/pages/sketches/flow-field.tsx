import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { Draw, Setup } from 'types/CustomP5'
import { Particle } from 'types/Particle'
import { setupDefaults } from 'util/defaults'

const scale: number = 10
const inc: number = 0.08
const zinc: number = 0.05
const background: number[] = [255]
let particles: Particle[]

const setup: Setup = (p5, canvasParentRef) => {
  const width: number = p5.windowWidth
  const height: number = p5.windowHeight
  const dimensions: number[] = [width, height]
  particles = Array.from(
    { length: Math.floor((p5.windowWidth * p5.windowHeight) / 800) },
    () => new Particle(p5, p5.constructor.Vector)
  )
  setupDefaults({
    p5,
    canvasParentRef,
    dimensions,
    background,
    renderer: 'p2d',
  })
}

const draw: Draw = p5 => {
  p5.background(255, 255, 255, 1)
  particles.forEach(particle => {
    const { pos, follow, update, edges, show } = particle
    const x = Math.floor(pos.x / scale)
    const y = Math.floor(pos.y / scale)
    const xoff = x * inc
    const yoff = y * inc
    const zoff = y * zinc

    const angle = p5.noise(xoff, yoff, zoff) * p5.TWO_PI * 4
    const vector = p5.constructor.Vector.fromAngle(angle)
    vector.setMag(0.28)

    follow(vector)
    update()
    edges()
    show()
  })
}

const FlowField: NextPage = () => <SketchWrapper setup={setup} draw={draw} />

export default FlowField
