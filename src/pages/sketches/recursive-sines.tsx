import { ColorValue, Draw } from '@react-p5/core'
import Sketch from 'components/Sketch'
import { NextPage } from 'next'
import { getDimensions } from 'util/canvasSizes'
import signature from 'util/signature'

const RecursiveSines: NextPage = () => {
  const dimensions: number[] = getDimensions('A4')
  const padding: number[] = [40]
  const background: ColorValue = [255, 253, 252]
  const nScl: number = 400
  let margin: number

  const draw: Draw = p5 => {
    // renderSVG
    p5.clear(0, 0, 0, 0)
    p5.frameRate(1)

    // draw global vars
    margin = p5.width * 0.075
    const xl: number = margin
    const xr: number = p5.width - margin
    const yt: number = margin
    const yb: number = p5.height - margin
    const cx: number = p5.width * 0.5
    const cy: number = p5.height * 0.5

    // global styles
    p5.noFill()

    // draw border
    p5.push()
    p5.rectMode('corners')
    p5.rect(xl, yt, xr, yb)
    p5.pop()

    // array of circles
    const length: number = 10
    Array.from({ length }, (_, i) => {
      // draw circle
      const length: number = 60
      const r: number = p5.width * 0.1566 + i * 10
      const x1: number = cx + r * Math.cos(0)
      const y1: number = cy + r * Math.sin(0)
      const x2: number = cx + r * Math.cos(p5.TWO_PI)
      const y2: number = cy + r * Math.sin(p5.TWO_PI)
      p5.beginShape()
      p5.curveVertex(x1, y1)
      Array.from({ length }, (_, i) => {
        const a: number = p5.radians(i * (360 / length))
        const x: number = cx + r * Math.cos(a)
        const y: number = cy + r * Math.sin(a)

        p5.curveVertex(x, y)
      })
      p5.curveVertex(x2, y2)
      p5.endShape('close')
    })

    signature(p5)
  }

  return (
    <Sketch
      draw={draw}
      dimensions={dimensions}
      padding={padding}
      background={background}
    />
  )
}

export default RecursiveSines
