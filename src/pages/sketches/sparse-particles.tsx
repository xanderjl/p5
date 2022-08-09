import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { useState } from 'react'
import {
  ColorValue,
  Draw,
  KeyPressed,
  MouseClicked,
  P5,
  Setup,
  WindowResized,
} from 'types/CustomP5'
import createGrid from 'util/createGrid'
import signature from 'util/signature'

const width: number = 2048
const height: number = 2048
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: ColorValue = [20, 10, 30]
const stroke: ColorValue = [245, 233, 200]
const count: number = 20
const grid: number[][] = createGrid(count)
const nScl: number = 4000
const nStr: number = 10
let margin: number

const particle = (
  p5: P5,
  xStart: number,
  yStart: number,
  length: number,
  s: number,
  dMod?: number
) => {
  const leftBounds: number = margin
  const topBounds: number = margin
  const rightBounds: number = p5.width - margin
  const bottomBounds: number = p5.height - margin

  const bounds = (): boolean => {
    if (x > leftBounds && x < rightBounds) {
      return true
    }

    if (y > topBounds && x < bottomBounds) {
      return true
    }

    return false
  }

  let x: number = xStart
  let y: number = yStart
  const speed: number = p5.random(-s, s)

  Array.from({ length }).forEach(() => {
    const a = p5.noise(x / nScl, y / nScl, length) * nStr
    const d =
      p5.map(
        // p5.noise(x / nScl, y / nScl) * nStr * (dMod || p5.width * 0.000375),
        p5.noise(x / nScl, y / nScl, dMod) * nStr,
        0,
        1,
        p5.width * 0.0025,
        p5.width * 0.0175
      ) * (dMod || 1)

    p5.stroke(stroke)
    p5.strokeWeight(p5.random(2))
    console.log({ bounds: bounds() })

    bounds() && p5.ellipse(x, y, d)
    x += Math.cos(a) * speed
    y += Math.sin(a) * speed
  })
}

const setup: Setup = p5 => {
  margin = p5.width * 0.1
}

const draw: Draw = p5 => {
  p5.noLoop()
  p5.background(background)
  p5.noFill()

  grid
    .filter(() => p5.random(1) > 0.5)
    .forEach(([u, v]) => {
      const x = p5.lerp(margin, p5.width - margin, u)
      const y = p5.lerp(margin, p5.height - margin, v)
      p5.point(x, y)
      if (p5.random(1) > 0.3) {
        particle(p5, x, y, 5, Math.floor(p5.width * 0.5), p5.width * 0.0000005)
      }
      if (p5.random(1) > 0.9) {
        particle(p5, x, y, 10, Math.floor(p5.width * 0.025), p5.width * 0.00005)
      }
      if (p5.random(1) > 0.9) {
        particle(p5, x, y, 10, Math.floor(p5.width * 0.00875))
      }
    })

  signature(p5)
}

const windowResized: WindowResized = p5 => {
  margin = p5.width * 0.1
}

const SparseParticles: NextPage = () => {
  const [seed, setSeed] = useState(0)

  const mouseClicked: MouseClicked = (p5, e) => {
    if (e.shiftKey) {
      setSeed(seed - 1)
    } else {
      setSeed(seed + 1)
    }
    p5.loop()
    p5.noLoop()
  }

  const keyPressed: KeyPressed = () => setSeed(seed - 1)

  return (
    <SketchWrapper
      setup={setup}
      draw={draw}
      windowResized={windowResized}
      keyPressed={keyPressed}
      mouseClicked={mouseClicked}
      dimensions={dimensions}
      padding={padding}
      background={background}
      seed={seed}
      suffix={seed}
    />
  )
}

export default SparseParticles
