import { ColorValue, Draw, KeyPressed, MouseClicked } from '@react-p5/core'
import Sketch from 'components/Sketch'
import { NextPage } from 'next'
import { useState } from 'react'
import signature from 'util/signature'

const width: number = 2048
const height: number = 2048
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: ColorValue = [255, 253, 252]

const SketchyCircle: NextPage = () => {
  const [seed, setSeed] = useState<number>(0)

  const draw: Draw = p5 => {
    const margin: number = p5.width * 0.1
    const stroke: ColorValue = [15, 10, 0]
    const r: number = p5.width * 0.25

    p5.noLoop()
    p5.background(background)
    p5.stroke(stroke)
    p5.noFill()

    p5.push()
    p5.translate(p5.width * 0.5, p5.height * 0.5)
    p5.strokeWeight(0.3)
    p5.ellipse(0, 0, r * 2)
    Array.from({ length: p5.TWO_PI * r * 0.11 }, () => {
      const rt1 = p5.random(360)
      const rt2 = p5.random(360)
      const cx1 = r * Math.cos(p5.radians(rt1))
      const cy1 = r * Math.sin(p5.radians(rt1))
      const cx2 = r * Math.cos(p5.radians(rt2))
      const cy2 = r * Math.sin(p5.radians(rt2))

      stroke.push(p5.random(50, 100))
      p5.stroke(stroke)
      p5.strokeWeight(p5.random(1.5))
      p5.line(cx1, cy1, cx2, cy2)
      stroke.pop()
    })
    p5.pop()

    p5.push()
    p5.fill(255, 137, 137)
    p5.noStroke()
    p5.translate(
      p5.width * 0.5 - p5.width * 0.25,
      p5.height * 0.5 - p5.height * 0.05
    )
    p5.ellipse(0, 0, r * 0.25)
    p5.pop()

    p5.push()
    p5.translate(p5.width - margin, margin)
    p5.strokeWeight(1)

    const nScl: number = 1000
    let x: number = 0
    let y: number = 0
    const halfWidth = p5.width * 0.05

    Array.from({ length: 30 }, () => {
      const a = p5.map(p5.noise(x / nScl, y / nScl), 0, 1, -10, -18)
      const x1 = x - halfWidth
      const x2 = x + halfWidth

      p5.push()
      p5.rotate(a)

      p5.line(x1, y, x2, y)
      x += Math.sin(a) + 2
      y += Math.cos(a) + 8
      p5.pop()
    })
    p5.pop()

    p5.push()
    p5.translate(margin, p5.height - margin)

    Array.from({ length: 100 }, () => {
      let x: number = p5.random(p5.width - margin * 2)
      let y: number = 0

      return Array.from({ length: Math.floor(p5.random(10, 40)) }, () => {
        const a = p5.noise(x / nScl, y / nScl) * 8

        p5.strokeWeight(2)
        p5.point(x, y)
        console.log({ x, y })

        x += Math.sin(a) * 8
        y -= Math.cos(a) * 8
      })
    })

    p5.pop()

    signature(p5)
  }

  const mouseClicked: MouseClicked = (p5, e) => {
    if (e?.shiftKey) {
      setSeed(seed - 1)
    } else {
      setSeed(seed + 1)
    }
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
      background={background}
      seed={seed}
    />
  )
}

export default SketchyCircle
