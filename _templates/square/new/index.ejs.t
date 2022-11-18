---
to: src/pages/sketches/<%= name %>.tsx
---
import Sketch from 'components/Sketch'
import { NextPage } from 'next'
import { ColorValue, Draw } from '@react-p5/core'
import signature from 'util/signature'

const <%= h.changeCase.pascal(name) %>: NextPage = () => {
  const width: number = 2048
  const height: number = 2048
  const dimensions: number[] = [width, height]
  const padding: number[] = [40]
  const background: ColorValue = [255, 253, 252]

  const draw: Draw = p5 => {

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

export default <%= h.changeCase.pascal(name) %>