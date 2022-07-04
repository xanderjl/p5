import { P5CanvasInstance } from 'react-p5-wrapper'

const windowResized = (
  p5: P5CanvasInstance,
  width?: number,
  height?: number,
  padding?: number[]
) => {
  const usedWidth = width ? width : p5.windowWidth
  const usedHeight = height ? height : p5.windowHeight
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
}

export default windowResized
