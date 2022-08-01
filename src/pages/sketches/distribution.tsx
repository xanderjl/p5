import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { useState } from 'react'
import { ColorValue, Draw, MouseClicked } from 'types/CustomP5'
import createGrid from 'util/createGrid'
import signature from 'util/signature'

const width: number = 2048
const height: number = 2048
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: ColorValue = [255, 253, 252]
let seed: number = 0
const count: number = 100

const Distribution: NextPage = () => {
  const [suffixString, setSuffix] = useState<string | number>()

  const draw: Draw = p5 => {
    p5.noLoop()
    p5.background(background)
    let iter: number = 0
    const grid = createGrid(count).filter((_, i) => {
      iter += 0.1
      return (
        p5.noise(seed, i * iter, i) >
        p5.map(p5.noise(iter, p5.noise(iter, i), i), 0, iter, 0, 1) + 0.5
      )
    })
    const margin: number = Math.floor(p5.width / 10)

    grid.forEach(([u, v]) => {
      const x = p5.lerp(margin, p5.width - margin, u)
      const y = p5.lerp(margin, p5.height - margin, v)

      p5.fill(0)
      p5.rectMode(p5.CENTER)
      p5.rect(
        x,
        y,
        (p5.width - margin * 2) / count,
        (p5.height - margin * 2) / count
      )
    })

    signature(p5)
  }

  const mouseClicked: MouseClicked = (p5, e) => {
    if (e.shiftKey) {
      seed -= 1
    } else {
      seed += 1
    }
    p5.draw()
    setSuffix(seed)
  }

  return (
    <SketchWrapper
      draw={draw}
      mouseClicked={mouseClicked}
      dimensions={dimensions}
      padding={padding}
      background={background}
      seed={seed}
      suffix={suffixString}
    />
  )
}

export default Distribution
