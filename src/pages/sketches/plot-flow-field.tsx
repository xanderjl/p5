import { convertSeed } from '@react-p5/utils'
import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { useState } from 'react'
import { ColorValue, Draw, P5 } from 'types/CustomP5'
import { getDimensions } from 'util/canvasSizes'
import signature from 'util/signature'

const PlotFlowField: NextPage = () => {
  const dimensions: number[] = getDimensions('A4')
  const padding: number[] = [40]
  const background: ColorValue = [255, 253, 252]
  let margin: number
  const numNodes: number = 200
  const phrase: string = 'Xander Low'
  const [seed] = useState<number>(convertSeed(phrase))

  const particle = (
    p5: P5,
    xStart: number,
    yStart: number,
    length: number = 10,
    nScl: number = 1000,
    nStr: number = 40,
    speed: number = 10
  ) => {
    let x: number = xStart
    let y: number = yStart

    p5.beginShape()
    Array.from({ length }, () => {
      let a: number = p5.noise(x / nScl, y / nScl) * nStr
      const s: number = p5.random(speed)
      const inBounds: boolean =
        x >= margin &&
        x <= p5.width - margin &&
        y >= margin &&
        y <= p5.height - margin

      inBounds && p5.curveVertex(x, y)
      x += Math.cos(a) * s
      y += Math.sin(a) * s
    })
    p5.endShape()
  }

  const draw: Draw = p5 => {
    p5.clear(0, 0, 0, 0)

    margin = p5.width * 0.075
    const mx1: number = margin
    const mx2: number = p5.width - margin
    const my1: number = margin
    const my2: number = p5.height - margin

    // global styles
    p5.stroke(5, 0, 0)
    p5.noFill()

    // draw border
    p5.push()
    p5.rectMode('corners')
    p5.rect(mx1, my1, mx2, my2)
    p5.pop()

    // spawn particle nodes
    const nodes: number[][] = Array.from({ length: numNodes }, () => {
      const x: number = p5.random(margin, p5.width - margin)
      const y: number = p5.random(margin, p5.height - margin)

      return [x, y]
    })

    // draw particles
    p5.push()
    p5.strokeWeight(3)
    nodes.forEach(([x, y]) =>
      particle(p5, x, y, Math.floor(p5.random(30, 120)), 3500, 50, 10)
    )
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
      suffix={seed.toString()}
      renderSVG
    />
  )
}

export default PlotFlowField
