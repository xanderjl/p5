import { ColorValue, Draw, Setup } from '@react-p5/core'
import { convertSeed, createGrid } from '@react-p5/utils'
import Sketch from 'components/Sketch'
import { NextPage } from 'next'
import { useState } from 'react'
import { getDimensions } from 'util/canvasSizes'
import signature from 'util/signature'

const FriendsOfFriends: NextPage = () => {
  const dimensions: number[] = getDimensions('A4')
  const padding: number[] = [40]
  const background: ColorValue = [255, 253, 252]
  const phrase: string = 'Friend Name'
  const handle: string = '@insta_handle'
  const seed: number = convertSeed(phrase)
  let margin: number
  const [grid, setGrid] = useState<number[][]>([[0, 0]])
  const [nScl, setNScl] = useState<number>(1000)
  const [nStr, setNStr] = useState<number>(30)
  const suffix: string = `phrase:${phrase}_seed:${seed}`

  const setup: Setup = p5 => {
    margin = p5.width * 0.075
    const res: number = 0.09
    const rows: number = Math.floor(p5.width * res)
    const cols: number = Math.floor(p5.height * res)
    const strength: number = p5.random(500, 1000)
    const scale: number = p5.random(3000, 4000)
    setNScl(scale)
    setNStr(strength)
    setGrid(createGrid(rows, cols))
  }

  const draw: Draw = p5 => {
    p5.clear(0, 0, 0, 0)
    p5.frameRate(1)

    // global styles
    p5.noFill()

    // global vars
    margin = p5.width * 0.075
    const speed: number = p5.map(p5.noise(convertSeed(handle)), 0, 1, 100, 800)

    // draw borders
    p5.rectMode('corners')
    p5.rect(margin, margin, p5.width - margin, p5.height - margin)

    // set points
    const points: number[][] = grid.map(([u, v]) => {
      const inner: number = p5.width * 0.025
      const xl: number = margin + inner
      const xr: number = p5.width - (margin + inner)
      const yt: number = margin + inner
      const yb: number = p5.height - (margin + inner)
      const x: number = p5.lerp(xl, xr, u)
      const y: number = p5.lerp(yt, yb, v)

      return [x, y]
    })

    // draw at points
    points.forEach(([x, y]) => {
      const a: number = p5.noise(x / nScl, y / nScl) * nStr
      const cos: number = x + speed * Math.cos(a)
      const sin: number = y + speed * Math.sin(a)
      const inBounds: boolean =
        cos >= margin &&
        cos <= p5.width - margin &&
        sin >= margin &&
        sin <= p5.height - margin
      const selectedChar: string = phrase[Math.floor(p5.random(phrase.length))]

      p5.fill(0)
      p5.textAlign('center')
      inBounds && p5.text(selectedChar, x, y)
    })

    signature(p5)
  }

  return (
    <Sketch
      setup={setup}
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

export default FriendsOfFriends
