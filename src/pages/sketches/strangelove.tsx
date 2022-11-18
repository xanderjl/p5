import { Draw, KeyPressed, MouseClicked, P5 } from '@react-p5/core'
import Sketch from 'components/Sketch'
import { NextPage } from 'next'
import { useState } from 'react'
import createGrid from 'util/createGrid'

const width: number = 2048
const height: number = 2048
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const count: number = 10
const grid: number[][] = createGrid(count)
let margin: number

const particle = (
  p5: P5,
  xStart: number,
  yStart: number,
  length: number = 20,
  nScl: number = 1000,
  nStr: number = 30,
  speed: number = 10,
  r: number = 8
) => {
  let x = xStart
  let y = yStart

  Array.from({ length }, () => {
    const a = p5.noise(x / nScl, y / nScl) * nStr
    const triRotation = a + p5.PI * 0.66

    const x1 = x + Math.cos(p5.radians(120) + triRotation) * r
    const y1 = y + Math.sin(p5.radians(120) + triRotation) * r
    const x2 = x + Math.cos(p5.radians(240) + triRotation) * r
    const y2 = y + Math.sin(p5.radians(240) + triRotation) * r
    const x3 = x + Math.cos(p5.radians(360) + triRotation) * r
    const y3 = y + Math.sin(p5.radians(360) + triRotation) * r

    p5.triangle(x1, y1, x2, y2, x3, y3)
    x += Math.cos(a) * speed
    y += Math.sin(a) * speed
  })
}

const draw: Draw = p5 => {
  p5.noLoop()
  p5.noStroke()
  p5.fill(0)

  margin = p5.width * 0.1

  grid.forEach(([u, v]) => {
    const x = p5.lerp(margin, p5.width - margin, u)
    const y = p5.lerp(margin, p5.height - margin, v)

    p5.point(x, y)
    particle(p5, x, y, 3, 3000, 20, 30, 20)
  })
}

const Strangelove: NextPage = () => {
  const [seed, setSeed] = useState<number>(0)

  const mouseClicked: MouseClicked = (p5, e) => {
    if (e?.shiftKey) {
      setSeed(seed - 1)
    } else {
      setSeed(seed + 1)
    }
    p5.clear(0, 0, 0, 0)
    p5.loop()
    p5.noLoop()
  }

  const keyPressed: KeyPressed = () => {
    setSeed(seed - 1)
  }

  return (
    <Sketch
      draw={draw}
      mouseClicked={mouseClicked}
      keyPressed={keyPressed}
      dimensions={dimensions}
      padding={padding}
      // background={background}
      seed={seed}
      renderSVG
    />
  )
}

export default Strangelove
