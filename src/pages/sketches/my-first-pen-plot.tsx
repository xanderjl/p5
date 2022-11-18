import { ColorValue, Draw } from '@react-p5/core'
import Sketch from 'components/Sketch'
import { NextPage } from 'next'
import { getDimensions } from 'util/canvasSizes'
import signature from 'util/signature'

const MyFirstPenPlot: NextPage = () => {
  const dimensions: number[] = getDimensions('A4')
  const padding: number[] = [40]
  const background: ColorValue = [255, 253, 252]
  let margin: number

  const draw: Draw = p5 => {
    p5.clear(0, 0, 0, 0)

    // Draw globals
    margin = p5.width * 0.075
    const mx1: number = margin
    const mx2: number = p5.width - margin
    const my1: number = margin
    const my2: number = p5.height - margin
    const length: number = 30

    p5.noFill()

    // Border
    p5.rectMode('corners')
    p5.rect(mx1, my1, mx2, my2)

    // plot ellipse
    p5.push()
    Array.from({ length }, (_, i) => {
      const xStart: number = p5.width * 0.5
      const yStart: number = p5.height * 0.5
      const r: number = p5.width * 0.075
      const a: number = (i / length) * p5.TWO_PI
      const x1: number = xStart + r * Math.cos(a)
      const y1: number = yStart + r * Math.sin(a)
      const isXHalf: boolean = x1 >= p5.width * 0.5
      const isYHalf: boolean = y1 >= p5.height * 0.5
      const xdefault: number = p5.width * 0.75
      const ydefault: number = p5.height * 0.75
      const xdist = isXHalf
        ? xStart + xdefault > p5.width - margin
          ? p5.width - margin - xStart
          : xdefault
        : xStart - xdefault < margin
        ? xStart - margin
        : xdefault
      const ydist = isYHalf
        ? yStart + ydefault > p5.height - margin
          ? p5.height - margin - yStart
          : ydefault
        : yStart - ydefault < margin
        ? yStart - margin
        : ydefault
      // const xdist = xStart - margin
      // const ydist = yStart - margin
      const x2: number = xStart + xdist * Math.cos(a)
      const y2: number = yStart + ydist * Math.sin(a)
      // const x2: number = x1 + xdist * Math.cos(a)
      // const y2: number = y1 + ydist * Math.sin(a)
      // const xdist: number = x1 + p5.width * 0.75 * Math.cos(a)
      // const ydist: number = y1 + p5.height * 0.75 * Math.sin(a)

      // const x2: number = isXHalf
      //   ? xdist > p5.width - margin
      //     ? p5.width - margin
      //     : xdist
      //   : xdist < margin
      //   ? margin
      //   : xdist
      // const y2: number = isYHalf
      //   ? ydist > p5.height - margin
      //     ? p5.height - margin
      //     : ydist
      //   : ydist < margin
      //   ? margin
      //   : ydist

      // p5.line(x1, y1, xdist, ydist)
      p5.line(x1, y1, x2, y2)
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
      renderSVG
    />
  )
}

export default MyFirstPenPlot
