import { ColorValue, P5 } from '@react-p5/core'
import { Color, COLOR_MODE } from 'p5'

const signature = (
  p5: P5,
  margin?: number,
  color?: ColorValue,
  colorMode?: COLOR_MODE
): void => {
  let d: number = p5.width * 0.01
  let x: number = p5.width - d * 2.5
  let y: number = p5.height - d * 2.5

  if (typeof margin !== 'undefined') {
    x = p5.width - margin - d * 2.5
    y = p5.height - margin - d * 2.5
  }
  const ellipseColor: ColorValue = color || [255, 137, 137]

  p5.push()
  p5.colorMode(colorMode || p5.RGB)
  p5.stroke(ellipseColor as unknown as Color)
  p5.fill(ellipseColor as unknown as Color)

  p5.ellipse(x, y, d)
  p5.pop()
}

export default signature
