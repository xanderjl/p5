import { Flex } from '@chakra-ui/react'
import { format } from 'date-fns'
import useGetOs from 'hooks/useGetOs'
import dynamic from 'next/dynamic'
import { RENDERER } from 'p5'
import { FC } from 'react'
import type { P5WrapperProps, Sketch, SketchProps } from 'react-p5-wrapper'
import setup from 'util/setup'
import windowResized from 'util/windowResized'

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
    p5.setup = () =>
      setup(p5, width, height, padding, background, renderer, pixelDensity)

    p5.windowResized = () =>
      windowResized(p5, width, height, padding, background)

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
