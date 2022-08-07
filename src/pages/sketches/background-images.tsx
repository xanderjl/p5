import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import palettes from 'nice-color-palettes'
import { Color, Image } from 'p5'
import paper from 'public/sketch-assets/paper-1.jpg'
import { ColorValue, Draw, P5, P5Function, Setup } from 'types/CustomP5'
import createGrid from 'util/createGrid'
import signature from 'util/signature'

const width: number = 2048
const height: number = 2048
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: ColorValue = [255, 253, 252]
const noiseScale: number = 500
const noiseStrength: number = 100
const count: number = 5
const area: number = count * count
let agents: Agent[] = []
let img: Image
let grid: number[][]
let margin: number

class Agent {
  p5: P5
  x: number
  y: number
  z: number
  size: number
  speed: number
  palette: ColorValue[]
  col: ColorValue

  constructor(p5: P5, x: number, y: number) {
    this.p5 = p5
    this.x = x
    this.y = y
    this.z = this.p5.random(0.02, 0.08)
    this.size = this.p5.random(0.5, 3)
    this.speed = this.p5.random(1, 5)
    this.palette = palettes[Math.floor(this.p5.random(palettes.length))]
    this.col = this.palette[Math.floor(this.p5.random(this.palette.length))]
  }

  style = () => {
    this.p5.strokeWeight(this.size)
    this.p5.stroke(this.col as unknown as Color)
  }

  display = () => {
    this.style()
    this.p5.point(this.x, this.y)
  }

  update = () => {
    const angle: number =
      this.p5.noise(this.x / noiseScale, this.y / noiseScale, this.z) *
      noiseStrength

    this.bounds()
    this.x += Math.cos(angle) * this.speed
    this.y += Math.sin(angle) * this.speed
    this.z += 0.005
  }

  bounds = () => {
    this.x = this.p5.constrain(this.x, margin, this.p5.width - margin)
    this.y = this.p5.constrain(this.y, margin, this.p5.height - margin)
  }
}

const preload: P5Function = p5 => {
  img = p5.loadImage(paper.src!, pimg => pimg)
}

const setup: Setup = p5 => {
  margin = p5.width * 0.1
  grid = createGrid(area)
  agents = Array.from(
    { length: count }
    // () => new Agent(p5, p5.random(p5.width), p5.random(p5.height))
  )
  p5.noFill()
}

const draw: Draw = p5 => {
  margin = p5.width * 0.1
  p5.image(img, 0, 0, p5.width, p5.height)

  grid.forEach(([u, v], i) => {
    const x = p5.lerp(margin, p5.width - margin, u)
    const y = p5.lerp(margin, p5.height - margin, v)
    agents[i] = new Agent(p5, x, y)
  })

  agents.forEach(agent => {
    agent.display()
    agent.update()
  })

  signature(p5)
}

const BackgroundImages: NextPage = () => (
  <SketchWrapper
    preload={preload}
    setup={setup}
    draw={draw}
    dimensions={dimensions}
    padding={padding}
    background={background}
  />
)

export default BackgroundImages
