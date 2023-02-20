import { ColorValue, Draw } from '@react-p5/core'
// import { UIValue } from '@react-p5/sketch'
import Sketch from 'components/Sketch'
import { NextPage } from 'next'
import { useState } from 'react'
import { getDimensions } from 'util/canvasSizes'
import signature from 'util/signature'

const SinesAndLines: NextPage = () => {
  const dimensions: number[] = getDimensions('A4')
  const padding: number[] = [40]
  const background: ColorValue = [255, 253, 252]
  const [seed, setSeed] = useState<number>(0)
  // const values: UIValue[] = [
  //   {
  //     label: 'Seed',
  //     value: seed,
  //     setValue: setSeed,
  //     max: 100000,
  //   },
  // ]

  const draw: Draw = p5 => {
    p5.clear(0, 0, 0, 0)

    Array.from({ length: 200 }, () => {
      p5.ellipse(p5.random(p5.width), p5.random(p5.height), 20, 20)
    })

    signature(p5)
  }

  return (
    <Sketch
      draw={draw}
      dimensions={dimensions}
      padding={padding}
      background={background}
      seed={seed}
      renderSVG
      noLoop
      // UIValues={values}
    />
  )
}

export default SinesAndLines
