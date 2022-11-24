import {
  ColorValue,
  Draw,
  MouseClicked,
  P5Function,
  Setup,
  WindowResized,
} from '@react-p5/core'
import { createGrid } from '@react-p5/utils'
import Sketch from 'components/Sketch'
import { NextPage } from 'next'
import { Graphics, Image } from 'p5'
import sourceImg from 'public/sketch-assets/source-gradient.jpg'
import signature from 'util/signature'

const width: number = 2048
const height: number = 2048
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: ColorValue = [255, 253, 252]
const count = 20
const grid = createGrid(count)
let img: Image
let margin: number
let shadows: Graphics
let seed: number = 0

const preload: P5Function = p5 => {
  img = p5.loadImage(sourceImg.src, src => src)
}

const setup: Setup = p5 => {
  shadows = p5.createGraphics(p5.width, p5.height)
}

const draw: Draw = p5 => {
  p5.noiseSeed(seed)
  p5.randomSeed(seed)
  p5.background(background)
  margin = p5.width * 0.1
  img.resize(p5.width, p5.height)
  p5.image(shadows, 0, 0)
  shadows.clear(0, 0, 0, 0)
  shadows.noStroke()
  shadows.fill(0, 0, 120, 80)

  grid.forEach(([u, v]) => {
    const x = p5.lerp(margin, p5.width - margin, u)
    const y = p5.lerp(margin, p5.height - margin, v)
    const d = p5.width * 0.0175
    const shadowOffset = 2
    const a = p5.noise(u, v) * p5.PI
    const unit = p5.constrain(d * a, d * 0.5, d * 1.5)

    p5.noFill()
    p5.stroke(img.get(x, y))
    p5.strokeWeight(p5.width * 0.004)
    p5.ellipse(x, y, d)

    shadows.push()
    shadows.rotate(p5.radians(a))
    shadows.rectMode(p5.CENTER)
    shadows.ellipse(x + shadowOffset, y + shadowOffset, unit)
    shadows.pop()
  })

  signature(p5)
}

const windowResized: WindowResized = p5 => {
  shadows.resizeCanvas(p5.width, p5.height)
}

const mouseClicked: MouseClicked = (p5, e) => {
  if (e?.shiftKey) {
    seed--
  } else {
    seed++
  }
  p5.redraw()
}

const ColorFromImage: NextPage = () => (
  <Sketch
    preload={preload}
    setup={setup}
    draw={draw}
    windowResized={windowResized}
    mouseClicked={mouseClicked}
    dimensions={dimensions}
    padding={padding}
    background={background}
    seed={seed}
  />
)

export default ColorFromImage
