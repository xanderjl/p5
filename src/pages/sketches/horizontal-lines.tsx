import { ColorValue, Draw } from '@react-p5/core'
import { convertSeed } from '@react-p5/utils'
import Sketch from 'components/Sketch'
import { NextPage } from 'next'
import { getDimensions } from 'util/canvasSizes'
import signature from 'util/signature'

const HorizontalLines: NextPage = () => {
  const dimensions: number[] = getDimensions('A4')
  const padding: number[] = [40]
  const background: ColorValue = [255, 253, 252]
  const numLines = 100
  const seed = convertSeed('Breath of the weath')

  const draw: Draw = p5 => {
    const margin = p5.width * 0.05
    p5.background(background)

    // draw horizontal lines
    p5.push()
    Array.from({ length: numLines }, (_, i) => {
      const x1 = margin
      const x2 =
        margin + p5.map(p5.noise(i), 0, 1, p5.width * 0.66, p5.noise(p5.width))
      const x3 = x2 + p5.map(p5.noise(i), 0, 1, p5.width * 0.05, p5.width * 0.5)
      const x4 = p5.width - margin
      const y = margin + ((p5.height - margin * 2) / numLines) * (i + 1)

      // line 1
      p5.line(x1, y, x2, y)

      // line 2
      p5.line(x3, y, x4, y)
    })
    p5.pop()

    // draw border
    p5.push()
    p5.noFill()
    p5.rect(margin, margin, p5.width - margin * 2, p5.height - margin * 2)
    p5.pop()

    signature(p5)
  }

  return (
    <Sketch seed={seed} draw={draw} dimensions={dimensions} padding={padding} />
  )
}

export default HorizontalLines
