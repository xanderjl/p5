import { ColorValue, Draw, MouseClicked, Setup } from '@react-p5/core'
import Sketch from 'components/Sketch'
import { NextPage } from 'next'
import palettes from 'nice-color-palettes'

const width: number = 2048
const height: number = 2048
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: ColorValue = [255, 253, 252]
let seed: number = 0

const setup: Setup = p5 => {
  p5.angleMode(p5.DEGREES)
}

const draw: Draw = p5 => {
  p5.randomSeed(seed)
  p5.noiseSeed(seed)
  p5.noLoop()

  const palette =
    palettes[Math.floor(p5.map(p5.random(), 0, 1, 0, palettes.length))]
  const n = Math.floor(p5.width * 0.5)
  const degree = p5.map(p5.random(), 0, 1, 137.3, 137.8)

  p5.background(background)

  p5.push()
  p5.translate(p5.width / 2, p5.height / 2)
  Array.from({ length: n }).forEach((_, i) => {
    const a = i * degree
    const r = i * 0.1 * Math.sqrt(i)
    const x = r * Math.cos(a)
    const y = r * Math.sin(a)
    const colors = Array.from(
      { length: 5 },
      () => palette[Math.floor(p5.map(p5.random(), 0, 1, 0, palette.length))]
    )

    p5.stroke(colors[0])
    p5.fill(colors[1])
    p5.ellipse(x, y, r * 0.03)
    p5.noFill()
    p5.stroke(colors[1])
    p5.ellipse(x, y, r * 0.045)
    p5.stroke(colors[2])
    p5.ellipse(x, y, r * 0.055)
    p5.stroke(colors[3])
    p5.ellipse(x, y, r * 0.065)
    p5.stroke(colors[4])
    p5.strokeWeight(0.5)
    p5.ellipse(x, y, r * 0.08)
  })
  p5.pop()
}

const mouseClicked: MouseClicked = (p5, e) => {
  if (e?.shiftKey) {
    seed--
  } else {
    seed++
  }
  p5.loop()
  p5.noLoop()
}

const Phyllotaxis: NextPage = () => (
  <Sketch
    setup={setup}
    draw={draw}
    mouseClicked={mouseClicked}
    dimensions={dimensions}
    padding={padding}
    background={background}
    seed={seed}
  />
)

export default Phyllotaxis
