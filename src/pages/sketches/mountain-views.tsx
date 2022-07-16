import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { Color } from 'p5'
import { Sketch } from 'react-p5-wrapper'
import { ColorValue } from 'types/CustomP5'
import { createWeightedSelector, vancouverIsland } from 'util/colorPalettes'

let seed: number = 0
const width: number = 2048
const height: number = 2048
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: ColorValue = '#FFFDFB'

const sketch: Sketch = p5 => {
  const colorPicker = createWeightedSelector(p5, vancouverIsland)

  p5.draw = () => {
    const count = Math.floor(p5.width / 25)
    const fidelity = 200
    const range = 2
    const margin = p5.width / 10

    p5.noLoop()
    p5.background(background)
    p5.randomSeed(seed)
    p5.noiseSeed(seed)
    p5.fill(background)

    Array.from({ length: count }).forEach((_, i) => {
      let xoff = 0
      const u = count <= 1 ? 0.5 : i / (count - 1)
      const x = p5.lerp(margin, p5.width - margin, u)
      const color = colorPicker() as unknown as Color

      p5.stroke(color)
      p5.beginShape()
      Array.from({ length: fidelity }).forEach((_, j) => {
        const v = count <= 1 ? 0.5 : j / (fidelity - 1)
        const xr = p5.map(p5.noise(xoff), 0, 1, x - range, x + range)
        const y = p5.lerp(margin, p5.height - margin, v)
        xoff += 0.1

        p5.vertex(xr, y)
      })
      p5.endShape()
    })

    const d = 0.01
    let xoff = 0
    let yoff = 0
    let amp = 0.03
    const color = colorPicker() as unknown as Color

    p5.push()
    p5.translate(p5.width / 2, p5.height / 2)
    p5.stroke(color)
    p5.beginShape()
    Array.from({ length: p5.TWO_PI / d }).forEach((_, i) => {
      const a = i * d
      const rMin = p5.width / 4.099999999
      const rMax = p5.width / 3.999999999
      const r = p5.map(p5.noise(xoff, yoff), 0, 1, rMin, rMax)
      const x = r * Math.cos(a)
      const y = r * Math.sin(a)

      xoff += amp
      yoff += amp

      p5.vertex(x, y)
    })
    p5.endShape(p5.CLOSE)
    p5.pop()
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
