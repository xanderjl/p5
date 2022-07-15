import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { Color } from 'p5'
import { Sketch } from 'react-p5-wrapper'
import { ColorValue } from 'types/CustomP5'
import { createWeightedSelector, victoriaIsland } from 'util/colorPalettes'

let seed: number = 0
const width: number = 2048
const height: number = 2048
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: ColorValue = [255]

const sketch: Sketch = p5 => {
  const colorPicker = createWeightedSelector(p5, victoriaIsland)

  p5.draw = () => {
    p5.noLoop()
    p5.background(background)
    p5.randomSeed(seed)
    p5.noiseSeed(seed)

    Array.from({ length: 40 }).forEach(() => {
      const x = p5.random(0, p5.width)
      const y = p5.random(0, p5.height)
      const d = p5.map(
        p5.noise(p5.width, p5.height),
        0,
        1,
        p5.width * 0.002,
        p5.width * 0.02
      )
      const fill = colorPicker() as unknown as Color
      const stroke = colorPicker() as unknown as Color

      p5.fill(fill)
      p5.stroke(stroke)
      p5.ellipse(x, y, d)
    })
  }

  p5.mouseClicked = () => {
    seed++
    p5.draw()
  }
}

const MountainViews: NextPage = () => (
  <SketchWrapper
    sketch={sketch}
    dimensions={dimensions}
    padding={padding}
    background={background}
    seed={seed}
  />
)

export default MountainViews
