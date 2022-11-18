import { ColorValue, Draw } from '@react-p5/core'
import { convertSeed } from '@react-p5/utils'
import Sketch from 'components/Sketch'
import { NextPage } from 'next'
import { getDimensions } from 'util/canvasSizes'
import signature from 'util/signature'

const BezierBoogie: NextPage = () => {
  const dimensions: number[] = getDimensions('A4')
  const padding: number[] = [40]
  const background: ColorValue = [255, 253, 252]
  const phrase: string = `You didn't call me.`
  const seed: number = convertSeed(phrase)
  const suffix: string = `seed:${seed}_phrase:${phrase}`
  let margin: number

  const draw: Draw = p5 => {
    p5.clear(0, 0, 0, 0)
    p5.frameRate(1)

    margin = p5.width * 0.075
    const x1: number = margin
    const x2: number = p5.width - margin
    const y1: number = margin
    const y2: number = p5.height - margin
    const length: number = 100

    p5.noFill()

    const verticalLines: number[] = Array.from({ length }, (_, i) => {
      const v: number = i / (length - 1)
      const y: number = p5.lerp(y1, y2, v)

      return y
    })

    // draw border
    p5.push()
    p5.noFill()
    p5.rectMode('corners')
    p5.rect(x1, y1, x2, y2)
    p5.pop()

    // draw line
    p5.push()
    verticalLines.forEach(y => {
      p5.beginShape()
      p5.vertex(x1, y)
      // set line resolution
      const length: number = 90
      Array.from({ length }, (_, i) => {
        const nScl: number = 140
        const u: number = i / (length - 1)
        const x: number = p5.lerp(margin, p5.width - margin, u)
        const yn: number = p5.noise(x / nScl, y / nScl)
        const mod: number = p5.height * 0.05
        const yr1: number = p5.constrain(y - mod, y1 - 40, y2)
        const yr2: number = p5.constrain(y + mod, y1, y2 + 25)
        const yr: number = p5.map(yn, 0, 1, yr1, yr2)

        p5.curveVertex(x, p5.random(yr, yr))
      })
      p5.vertex(x2, y)
      p5.endShape()
    })
    p5.pop()

    signature(p5)
  }

  return (
    <Sketch
      draw={draw}
      dimensions={dimensions}
      padding={padding}
      background={background}
      seed={seed}
      suffix={suffix}
      renderSVG
    />
  )
}

export default BezierBoogie
