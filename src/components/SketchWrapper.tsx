import { Flex } from '@chakra-ui/react'
import { format } from 'date-fns'
import useGetOs from 'hooks/useGetOs'
import dynamic from 'next/dynamic'
import { RENDERER } from 'p5'
import { FC } from 'react'
import type { P5WrapperProps, Sketch, SketchProps } from 'react-p5-wrapper'
import { ColorValue } from 'types/CustomP5'
import setup from 'util/setup'
import windowResized from 'util/windowResized'

const ReactP5Wrapper = dynamic<P5WrapperProps>(
  () => import('react-p5-wrapper').then(mod => mod.ReactP5Wrapper),
  { ssr: false }
)

export interface SketchWrapperProps {
  sketch: Sketch<SketchProps>
  suffix?: string | number
  padding?: number[]
  width?: number
  height?: number
  dimensions?: number[]
  renderer?: RENDERER
  background?: ColorValue
  pixelDensity?: number
  seed?: number
}

const SketchWrapper: FC<SketchWrapperProps> = ({
  sketch,
  suffix,
  padding,
  width,
  height,
  dimensions,
  renderer,
  background,
  pixelDensity,
  seed,
}) => {
  const os = useGetOs()

  const sketchGlobals: Sketch = p5 => {
    const usedWidth = dimensions
      ? dimensions[0]
      : width && height
      ? width
      : p5.windowWidth
    const usedHeight = dimensions
      ? dimensions[1]
      : width && height
      ? height
      : p5.windowHeight

    p5.setup = () =>
      setup({
        p5,
        width: usedWidth,
        height: usedHeight,
        dimensions: [usedWidth, usedHeight],
        padding,
        background,
        renderer,
        pixelDensity,
        seed,
      })

    p5.windowResized = () =>
      windowResized({
        p5,
        width: usedWidth,
        height: usedHeight,
        dimensions: [usedWidth, usedHeight],
        padding,
        background,
        seed,
      })

    const fileName = [
      format(new Date(), 'yyyy.MM.dd-kk.mm.ss'),
      suffix ? suffix.toString() : '',
    ].join()

    p5.keyPressed = (e: KeyboardEvent) => {
      if (os === 'mac') {
        if (e.key === 's' && e.metaKey) {
          e.preventDefault()
          seed && p5.randomSeed(seed)
          seed && p5.noiseSeed(seed)
          const ratio =
            ((dimensions && dimensions[0]) ?? width ?? p5.width) / p5.width
          p5.pixelDensity(ratio)
          p5.draw()
          p5.saveCanvas(fileName, 'png')
        }
      } else {
        if (e.key === 's' && e.ctrlKey) {
          e.preventDefault()
          seed && p5.randomSeed(seed)
          seed && p5.noiseSeed(seed)
          const ratio =
            ((dimensions && dimensions[0]) ?? width ?? p5.width) / p5.width
          p5.pixelDensity(ratio)
          p5.draw()
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
