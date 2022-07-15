import { SketchWrapperProps } from 'components/SketchWrapper'
import { Color, RENDERER } from 'p5'
import { P5CanvasInstance } from 'react-p5-wrapper'

interface Setup extends Omit<SketchWrapperProps, 'sketch'> {
  p5: P5CanvasInstance
  renderer?: RENDERER
}

const setup = ({
  p5,
  width,
  height,
  dimensions,
  padding,
  background,
  renderer,
  pixelDensity,
  seed,
}: Setup): void => {
  const usedWidth = dimensions ? dimensions[0] : width ? width : p5.windowWidth
  const usedHeight = dimensions
    ? dimensions[1]
    : height
    ? height
    : p5.windowHeight
  const aspectRatio = usedWidth / usedHeight
  const windowRatio = p5.windowWidth / p5.windowHeight
  const paddingWidth = padding && padding.length > 0 ? padding[0] * 2 : 0
  const paddingHeight =
    padding && padding.length === 2
      ? padding[1] * 2
      : padding && padding.length === 1
      ? padding[0] * 2
      : 0
  const maxWidth = Math.round(p5.windowWidth - paddingWidth)
  const maxHeight = Math.round(p5.windowHeight - paddingHeight)

  seed && p5.randomSeed(seed)
  seed && p5.noiseSeed(seed)

  let canvas
  if (usedWidth > p5.windowWidth || usedHeight > p5.windowHeight) {
    if (aspectRatio > windowRatio) {
      const newHeight = Math.round(maxWidth / aspectRatio)
      canvas = p5.createCanvas(maxWidth, newHeight, renderer)
    } else {
      const newWidth = Math.round(maxHeight * aspectRatio)
      canvas = p5.createCanvas(newWidth, maxHeight, renderer)
    }
  } else {
    canvas = p5.createCanvas(usedWidth, usedHeight, renderer)
  }

  canvas.style('box-shadow', '1px 3px 6px -1px rgba(0, 0, 0, 0.5)')
  pixelDensity && p5.pixelDensity(pixelDensity)
  background && p5.background(background as unknown as Color)
}

export default setup
