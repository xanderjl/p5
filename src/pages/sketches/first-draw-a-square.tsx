import Rectangle from 'classes/Rectangle'
import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import palettes from 'nice-color-palettes'
import { useState } from 'react'
import { ColorValue, Draw, KeyPressed, MouseClicked, P5 } from 'types/CustomP5'
import signature from 'util/signature'

const width: number = 2048
const height: number = 2048
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: ColorValue = [255, 253, 252]
const res: number = 5
let rects: Rectangle[] = []
let margin: number
let seed: number = 0

const generate = (p5: P5, gen: number, palette: ColorValue[]) => {
  const temp: Rectangle[] = []

  if (gen >= 1) {
    rects.forEach(r => {
      const rand = p5.random(1)
      if (rand < 0.6) {
        temp.push(
          new Rectangle(p5, res, r.x, r.y, r.w * 0.5, r.h * 0.5, palette)
        )
        temp.push(
          new Rectangle(
            p5,
            res,
            r.x + r.w * 0.5,
            r.y,
            r.w * 0.5,
            r.h * 0.5,
            palette
          )
        )
        temp.push(
          new Rectangle(
            p5,
            res,
            r.x,
            r.y + r.h * 0.5,
            r.w * 0.5,
            r.h * 0.5,
            palette
          )
        )
        temp.push(
          new Rectangle(
            p5,
            res,
            r.x + r.w * 0.5,
            r.y + r.h * 0.5,
            r.w * 0.5,
            r.h * 0.5,
            palette
          )
        )
      } else {
        temp.push(new Rectangle(p5, res, r.x, r.y, r.w, r.h, palette))
      }
    })
    rects = temp
    gen--
    generate(p5, gen, palette)
  }
}

const draw: Draw = p5 => {
  p5.randomSeed(seed)
  p5.noiseSeed(seed)
  p5.noLoop()

  const palette = palettes[Math.floor(p5.random(0, palettes.length))]
  margin = p5.width * 0.05

  p5.background(background)

  rects.push(
    new Rectangle(
      p5,
      res,
      margin,
      margin,
      p5.width - margin * 2,
      p5.height - margin * 2,
      palette
    )
  )

  generate(p5, 3, palette)
  rects.forEach(rect => rect.display())

  signature(p5)
}

const FirstDrawASquare: NextPage = () => {
  const [suffix, setSuffix] = useState<number>()
  const mouseClicked: MouseClicked = (p5, e) => {
    if (e.shiftKey) {
      seed--
    } else {
      seed++
    }
    rects = []
    setSuffix(seed)
    p5.draw()
  }
  const keyPressed: KeyPressed = () => {
    rects = []
  }

  return (
    <SketchWrapper
      draw={draw}
      mouseClicked={mouseClicked}
      keyPressed={keyPressed}
      dimensions={dimensions}
      padding={padding}
      background={background}
      seed={seed}
      suffix={suffix}
    />
  )
}

export default FirstDrawASquare
