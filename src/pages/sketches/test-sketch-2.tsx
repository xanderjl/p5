import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { Color } from 'p5'
import { ColorValue, P5 } from 'types/CustomP5'

const width: number = 2048
const height: number = 2048
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: ColorValue = [0]

const setup = (p5: P5, canvasParentRef: Element) => {
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

  if (usedWidth > p5.windowWidth || usedHeight > p5.windowHeight) {
    if (aspectRatio > windowRatio) {
      const newHeight = Math.round(maxWidth / aspectRatio)
      p5.createCanvas(maxWidth, newHeight, p5.SVG)
        // .createCanvas(maxWidth, newHeight)
        .parent(canvasParentRef)
    } else {
      const newWidth = Math.round(maxHeight * aspectRatio)
      p5.createCanvas(newWidth, maxHeight, p5.SVG)
        // .createCanvas(newWidth, maxHeight)
        .parent(canvasParentRef)
    }
  } else {
    p5.createCanvas(usedWidth, usedHeight, p5.SVG)
      // .createCanvas(usedWidth, usedHeight)
      .parent(canvasParentRef)
  }

  background && p5.background(background as unknown as Color)
}

const windowResized = (p5: P5) => {
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

  if (usedWidth > p5.windowWidth || usedHeight > p5.windowHeight) {
    if (aspectRatio > windowRatio) {
      const newHeight = Math.round(maxWidth / aspectRatio)
      p5.resizeCanvas(maxWidth, newHeight)
    } else {
      const newWidth = Math.round(maxHeight * aspectRatio)
      p5.resizeCanvas(newWidth, maxHeight)
    }
  } else {
    p5.resizeCanvas(usedWidth, usedHeight)
  }

  background && p5.background(background as unknown as Color)
  p5.loop()
}

const draw = (p5: P5) => {
  p5.noFill()
  p5.stroke(255)
  p5.translate(p5.width / 2, p5.height / 2)
  p5.ellipse(0, 0, p5.width / 2)
}

const TestSketch_2: NextPage = () => (
  <SketchWrapper
    setup={setup}
    draw={draw}
    windowResized={windowResized}
    renderSVG
  />
)

export default TestSketch_2
