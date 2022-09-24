import SketchWrapper from 'components/SketchWrapper'
import { UIValue } from 'components/UI'
import { NextPage } from 'next'
import { useState } from 'react'
import { ColorValue, Draw } from 'types/CustomP5'
import { getDimensions } from 'util/canvasSizes'
import signature from 'util/signature'

const SinesAndLines: NextPage = () => {
  const dimensions: number[] = getDimensions('A4')
  const padding: number[] = [40]
  const background: ColorValue = [255, 253, 252]
  const [seed, setSeed] = useState<number>(0)
  const values: UIValue[] = [
    {
      label: 'Seed',
      value: seed,
      setValue: setSeed,
      max: 100000,
    },
  ]

  const draw: Draw = p5 => {
    p5.clear()

    Array.from({ length: 200 }, () => {
      p5.ellipse(p5.random(p5.width), p5.random(p5.height), 20, 20)
    })

    signature(p5)
  }

  return (
    <SketchWrapper
      draw={draw}
      dimensions={dimensions}
      padding={padding}
      background={background}
      seed={seed}
      renderSVG
      noLoop
      UIValues={values}
    />
  )
}

export default SinesAndLines
