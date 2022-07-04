import { Flex } from '@chakra-ui/react'
import { format } from 'date-fns'
import useGetOs from 'hooks/useGetOs'
import dynamic from 'next/dynamic'
import { RENDERER } from 'p5'
import { FC } from 'react'
import type { P5WrapperProps, Sketch, SketchProps } from 'react-p5-wrapper'

const ReactP5Wrapper = dynamic<P5WrapperProps>(
  () => import('react-p5-wrapper').then(mod => mod.ReactP5Wrapper),
  { ssr: false }
)

export interface SketchWrapperProps extends SketchProps {
  sketch: Sketch<SketchProps>
  suffix?: string
  padding?: number[]
  width?: number
  height?: number
  renderer?: RENDERER
  background?: number[]
  pixelDensity?: number
}

const SketchWrapper: FC<SketchWrapperProps> = ({
  sketch,
  suffix,
  padding,
  width,
  height,
  renderer,
  background,
  pixelDensity,
}) => {
  const os = useGetOs()

  const sketchGlobals: Sketch = p5 => {
    const usedWidth = width ? width : p5.windowWidth
    const usedHeight = height ? height : p5.windowHeight

    p5.setup = () => {
      p5.createCanvas(usedWidth, usedHeight, renderer).style(
        'box-shadow',
        '1px 3px 6px -1px rgba(0, 0, 0, 0.5)'
      )
      pixelDensity && p5.pixelDensity(pixelDensity)
      background && p5.background(background)
    }

    p5.windowResized = () => {
      const aspectRatio = usedWidth / usedHeight
      const windowRatio = p5.windowWidth / p5.windowHeight
      const paddingWidth = padding && padding.length > 0 ? padding[0] * 2 : 0
      const paddingHeight = padding && padding.length === 2 ? padding[1] * 2 : 0
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

    const fileName = [
      format(new Date(), 'yyyy.MM.dd-kk.mm.ss'),
      suffix ? suffix : '',
    ].join()

    p5.keyPressed = (e: KeyboardEvent) => {
      if (os === 'mac') {
        if (e.key === 's' && e.metaKey) {
          e.preventDefault()
          p5.saveCanvas(fileName, 'png')
        }
      } else {
        if (e.key === 's' && e.ctrlKey) {
          e.preventDefault()
          p5.saveCanvas(fileName, 'png')
        }
      }
    }

    return sketch(p5)
  }

  return (
    <Flex flex={1} align="center" justify="center">
      <ReactP5Wrapper id="test" sketch={sketchGlobals} />
    </Flex>
  )
}

export default SketchWrapper
