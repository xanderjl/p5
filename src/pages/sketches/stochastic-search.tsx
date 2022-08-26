import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { ColorValue, Draw, P5 } from 'types/CustomP5'
import { getDimensions } from 'util/canvasSizes'
import signature from 'util/signature'

const circle = (p5: P5, x: number, y: number, r: number) => {
  p5.ellipse(x, y, r * 2, r * 2)
}

const StochasticSearch: NextPage = () => {
  const dimensions: number[] = getDimensions('A4')
  const padding: number[] = [40]
  const background: ColorValue = [255, 253, 252]
  let margin: number

  const draw: Draw = p5 => {
    // methods for renderSVG performance
    p5.clear()
    p5.frameRate(1)

    // global vars
    margin = p5.width * 0.75

    // global styles
    p5.noFill()

    // stochastic search

    signature(p5)
  }

  return (
    <SketchWrapper
      draw={draw}
      dimensions={dimensions}
      padding={padding}
      background={background}
      renderSVG
    />
  )
}

export default StochasticSearch
