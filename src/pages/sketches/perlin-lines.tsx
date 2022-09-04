import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { ColorValue, Draw } from 'types/CustomP5'
import { getDimensions } from 'util/canvasSizes'
import signature from 'util/signature'

const PerlinLines: NextPage = () => {
  const dimensions: number[] = getDimensions('A4')
  const padding: number[] = [40]
  const background: ColorValue = [255, 253, 252]

  const draw: Draw = p5 => {

    signature(p5)
  }

  return (
    <SketchWrapper
      draw={draw}
      dimensions={dimensions}
      padding={padding}
      background={background}
    />
  )
}

export default PerlinLines