// tutorial from: https://www.youtube.com/watch?v=ktPnruyC6cc

import { ColorValue, Draw, Setup } from '@react-p5/core'
import Sketch from 'components/Sketch'
import { NextPage } from 'next'
import signature from 'util/signature'

const SineWaves: NextPage = () => {
  const width: number = 2048
  const height: number = 2048
  const dimensions: number[] = [width, height]
  const padding: number[] = [40]
  const background: ColorValue = [10, 20, 30]

  const setup: Setup = p5 => {
    p5.angleMode('degrees')
    p5.rectMode('center')
  }

  const draw: Draw = p5 => {
    const cx = p5.width * 0.5
    const cy = p5.height * 0.5

    p5.background(background)
    p5.noFill()

    p5.translate(cx, cy)

    Array.from({ length: 200 }, (_, i) => {
      const x = p5.width * 0.004 * i
      const y = p5.height * 0.004 * i
      const br = p5.width * 0.001 * i
      const r = p5.map(p5.sin(p5.frameCount), -1, 1, 100, 255)
      const g = p5.map(p5.cos(p5.frameCount / 2), -1, 1, 100, 255)
      const b = p5.map(p5.sin(p5.frameCount / 4), -1, 1, 100, 255)

      p5.push()
      p5.stroke(r, g, b)
      p5.rotate(p5.sin(p5.frameCount + i) * 100)
      p5.rect(0, 0, x, y, br)
      p5.pop()
    })

    signature(p5)
  }

  return (
    <Sketch
      setup={setup}
      draw={draw}
      dimensions={dimensions}
      padding={padding}
    />
  )
}

export default SineWaves
