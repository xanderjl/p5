import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { Graphics } from 'p5'
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
import signature from 'util/signature'

type Line = (p5: P5) => {
  display: () => void
}

const width: number = 2048
const height: number = 2048
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: ColorValue = [255, 253, 252]
const nScl: number = 3000
const nStr: number = 40
let margin: number
let overlay: Graphics
let grain: Graphics

const KeepItWavy: NextPage = () => {
  const [seed, setSeed] = useState<number>(0)

  const setup: Setup = p5 => {
    grain = p5.createGraphics(p5.width, p5.height)

    grain.loadPixels()
    Array.from({ length: p5.width }, (_, i) => {
      Array.from({ length: p5.height }, (_, j) => {
        grain.set(i, j, p5.color(p5.random(255), 10))
      })
    })
    grain.updatePixels()
  }

  const draw: Draw = p5 => {
    margin = p5.width * 0.15
    overlay = p5.createGraphics(p5.width, p5.height)
    overlay.background(background)
    overlay.erase()
    overlay.rect(margin, margin, p5.width - margin * 2, p5.height - margin * 2)
    overlay.noErase()

    p5.noLoop()
    p5.background(background)

    Array.from({ length: 1000 }).forEach(() => {
      line(p5).display()
    })

    p5.image(overlay, 0, 0)
    p5.image(grain, 0, 0)

    signature(p5)
  }

  const line: Line = p5 => {
    let x = p5.random(margin, p5.width - margin)
    let y = p5.random(margin, p5.height - margin)
    const speed = p5.random(-2, 2)
    const length = p5.width * 0.05
    const stroke =
      p5.random(1) > 0.8
        ? [255, 137, 137, p5.random(230, 255)]
        : [10, 40, 10, p5.random(60, 255)]

    const display = () => {
      p5.push()
      p5.noFill()
      p5.stroke(stroke)
      p5.strokeCap(p5.SQUARE)
      p5.strokeJoin(p5.BEVEL)
      p5.strokeWeight(
        p5.map(
          p5.noise(p5.random(1), p5.random(5), p5.random(4)),
          0,
          1,
          1,
          p5.width * 0.0065
        )
      )
      p5.beginShape()
      Array.from({ length }).forEach(() => {
        update()
      })
      p5.endShape()
      p5.pop()
    }

    const update = () => {
      const angle = p5.noise(x / nScl, y / nScl) * nStr

      x += Math.cos(angle) * speed
      y += Math.sin(angle) * speed
      p5.curveVertex(x, y)
    }

    return { display }
  }

  const windowResized: WindowResized = p5 => {
    overlay.resizeCanvas(p5.width, p5.height)
    grain.resizeCanvas(p5.width, p5.height)
  }

  const keyPressed: KeyPressed = () => {
    setSeed(seed - 1)
  }

  const mouseClicked: MouseClicked = (p5, e) => {
    if (e.shiftKey) {
      setSeed(seed - 1)
    } else {
      setSeed(seed + 1)
    }
    p5.loop()
    p5.noLoop()
  }

  return (
    <SketchWrapper
      setup={setup}
      draw={draw}
      keyPressed={keyPressed}
      windowResized={windowResized}
      mouseClicked={mouseClicked}
      dimensions={dimensions}
      padding={padding}
      background={background}
      seed={seed}
      suffix={seed}
    />
  )
}

export default KeepItWavy
