import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { Vector } from 'p5'
import { ColorValue, Draw } from 'types/CustomP5'
import { getDimensions } from 'util/canvasSizes'
import convertSeed from 'util/convertSeed'
import signature from 'util/signature'

const Orb: NextPage = () => {
  const dimensions: number[] = getDimensions('A4')
  const padding: number[] = [40]
  const background: ColorValue = [255, 253, 252]
  const phrase: string = ``
  const seed: number = convertSeed(phrase)
  const suffix: string = `seed:${seed}_phrase:${phrase.replaceAll(' ', '_')}`
  let margin: number

  const draw: Draw = p5 => {
    // renderSVG defaults
    p5.clear()
    p5.frameRate(1)
    p5.noLoop()

    // global vars
    margin = p5.width * 0.075
    const xbl: number = margin
    const xbr: number = p5.width - margin
    const ybt: number = margin
    const ybb: number = p5.height - margin
    const cx: number = p5.width * 0.5
    const cy: number = p5.height * 0.5
    const r: number = p5.width * 0.33
    const d: number = r * 2

    // global styles
    p5.noFill()
    p5.stroke(0, 0, 255)

    // draw border
    p5.push()
    p5.rectMode('corners')
    p5.rect(xbl, ybt, xbr, ybb)
    p5.pop()

    // draw ellipse
    p5.ellipse(cx, cy, d, d)

    // draw bound lines
    p5.push()
    p5.stroke(255, 0, 0)
    const length: number = 200
    Array.from({ length }, (_, i) => {
      const inc: number = i + 90
      const t: number = (inc / length) * 360
      const t2: number = -(t - 180)
      const x1: number = cx + r * Math.cos(p5.radians(t))
      const y1: number = cy + r * Math.sin(p5.radians(t))
      const x2: number = cx + r * Math.cos(p5.radians(t2))
      const y2: number = cy + r * Math.sin(p5.radians(t2))

      // draw individual line
      const innerLength: number = 180
      let y: number = y1
      let incr: number = 0
      p5.beginShape()
      Array.from({ length: innerLength }, (_, j) => {
        const freq: number = 1.7
        const nScl: number = 70
        const u: number = j / (innerLength - 1)
        const v1: Vector = p5.createVector(x1, y1)
        const v2: Vector = p5.createVector(x2, y2)
        const v3: Vector = p5.constructor.Vector.lerp(v1, v2, u)

        p5.curveVertex(v3.x, y)

        incr += 0.08
        y += Math.sin(p5.noise(v3.x / nScl, v3.y / nScl) * freq + incr)
      })
      p5.endShape()
    })
    p5.pop()

    signature(p5)
  }

  return (
    <SketchWrapper
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

export default Orb
