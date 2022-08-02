import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { useState } from 'react'
import { ColorValue, Draw, MouseClicked, P5 } from 'types/CustomP5'
import createGrid from 'util/createGrid'
import signature from 'util/signature'

const width: number = 2048
const height: number = 2048
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: ColorValue = [13, 10, 10]
const stroke: ColorValue = [255, 230, 230]
const grid: number[][] = createGrid(3)
let margin: number
let seed: number = 0

const arcs = (p5: P5, length: number, iter?: number) => {
  Array.from({ length }).forEach((_, i) => {
    const arcMin = p5.map(
      p5.noise(i, i * 1.1, iter),
      0,
      1,
      -p5.TWO_PI,
      p5.HALF_PI
    )
    const arcMax = p5.map(
      p5.noise(i, i * 1.1, iter),
      0,
      1,
      -p5.HALF_PI,
      p5.TWO_PI
    )
    const ratio = p5.width * 0.025
    const d = i * ratio

    p5.strokeWeight((length - i) * 0.3)
    p5.arc(0, 0, d, d, arcMin, arcMax)
  })
}

const draw: Draw = p5 => {
  margin = p5.width * 0.3

  p5.background(background)
  p5.randomSeed(seed)
  p5.noiseSeed(seed)
  p5.noFill()
  p5.stroke(stroke)
  p5.strokeCap(p5.ROUND)
  p5.strokeJoin(p5.BEVEL)

  grid.forEach(([u, v]) => {
    const x = p5.lerp(margin, p5.width - margin, u)
    const y = p5.lerp(margin, p5.height - margin, v)

    p5.push()
    p5.translate(x, y)
    arcs(p5, 8, u)
    p5.pop()
  })

  signature(p5)
}

const Arcs: NextPage = () => {
  const [suffix, setSuffix] = useState<number>()

  const mouseClicked: MouseClicked = (p5, e) => {
    if (e.shiftKey) {
      seed--
    } else {
      seed++
    }
    setSuffix(seed)
    p5.draw()
  }

  return (
    <SketchWrapper
      draw={draw}
      mouseClicked={mouseClicked}
      dimensions={dimensions}
      padding={padding}
      background={background}
      suffix={suffix}
    />
  )
}

export default Arcs
