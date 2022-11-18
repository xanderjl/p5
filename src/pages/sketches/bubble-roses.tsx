import { ColorValue, Draw, Setup, WindowResized } from '@react-p5/core'
import { UIValue } from '@react-p5/sketch'
import { convertSeed } from '@react-p5/utils'
import Sketch from 'components/Sketch'
import { NextPage } from 'next'
import { useState } from 'react'
import { getDimensions } from 'util/canvasSizes'
import createGrid from 'util/createGrid'
import signature from 'util/signature'

const BubbleRoses: NextPage = () => {
  const dimensions: number[] = getDimensions('A4')
  const padding: number[] = [40]
  const coral: ColorValue = [255, 141, 161]
  const cyan: ColorValue = [87, 164, 153]
  const gridRes: number = 0.0475
  let margin: number
  let rows: number
  let cols: number
  // const phrase: string = `bananna`
  // const phrase: string = `psl`
  // const phrase: string = `dune`
  // const phrase: string = `random`
  const phrase: string = `corn`
  const [seed, setSeed] = useState<number>(convertSeed(phrase))
  const [grid, setGrid] = useState<number[][]>([[0, 0]])
  const suffix: string = `phrase:${phrase}_seed:${seed}`
  const values: UIValue[] = [
    {
      label: 'seed',
      value: seed,
      setValue: setSeed,
      max: 10000,
    },
  ]

  const setup: Setup = p5 => {
    margin = p5.width * 0.075
    rows = Math.floor((p5.width - margin * 2) * gridRes)
    cols = Math.floor((p5.height - margin * 2) * gridRes)
    setGrid(createGrid(rows, cols))
  }

  const draw: Draw = p5 => {
    const bubbles: number[][] = []
    // render for svg
    p5.clear(0, 0, 0, 0)

    // global styles
    p5.noFill()

    // global vars
    margin = p5.width * 0.075
    const xl: number = margin
    const xr: number = p5.width - margin
    const yt: number = margin
    const yb: number = p5.height - margin

    // draw border
    p5.push()
    p5.rectMode('corners')
    p5.rect(xl, yt, xr, yb)
    p5.pop()

    // define bubble vectors
    grid.forEach(([u, v]) => {
      const buffer: number = margin * 1.75
      const x: number = p5.lerp(buffer, p5.width - buffer, u)
      const y: number = p5.lerp(buffer, p5.height - buffer, v)
      const isBubble: boolean = p5.random(1) > 0.99

      isBubble && bubbles.push([x, y])
    })

    // draw grid
    p5.push()
    p5.noStroke()
    grid.forEach(([u, v]) => {
      const buffer: number = margin * 1.75
      const x: number = p5.lerp(buffer, p5.width - buffer, u)
      const y: number = p5.lerp(buffer, p5.height - buffer, v)
      const threshold: number = 100
      let d: number = 4

      // scoped styles
      p5.fill(cyan)

      bubbles.forEach(([bx, by]) => {
        const distance: number = p5.dist(x, y, bx, by)
        const distanceRatio: number = p5.map(distance, 0, threshold, 0, 1)
        const calcDiam: number = p5.map(1 - distanceRatio, 0, 1, 4, 20)
        const inRange: boolean = distance <= threshold

        if (inRange) {
          d = calcDiam
          p5.fill(coral)
        }
      })

      p5.ellipse(x, y, d, d)
    })
    p5.pop()

    signature(p5)
  }

  const windowResized: WindowResized = p5 => {
    margin = p5.width * 0.075
    rows = Math.floor((p5.width - margin * 2) * gridRes)
    cols = Math.floor((p5.height - margin * 2) * gridRes)
    setGrid(createGrid(rows, cols))
  }

  return (
    <Sketch
      setup={setup}
      draw={draw}
      windowResized={windowResized}
      dimensions={dimensions}
      padding={padding}
      seed={seed}
      suffix={suffix}
      UIValues={values}
      renderSVG
      noLoop
    />
  )
}

export default BubbleRoses
