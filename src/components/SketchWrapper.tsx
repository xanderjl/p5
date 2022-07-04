import { Flex } from '@chakra-ui/react'
import { format } from 'date-fns'
import useCanvasDimensions from 'hooks/useCanvasDimensions'
import useGetOs from 'hooks/useGetOs'
import dynamic from 'next/dynamic'
import { FC } from 'react'
import type { P5WrapperProps, Sketch, SketchProps } from 'react-p5-wrapper'

const ReactP5Wrapper = dynamic<P5WrapperProps>(
  () => import('react-p5-wrapper').then(mod => mod.ReactP5Wrapper),
  { ssr: false }
)

export interface SketchWrapperProps extends SketchProps {
  suffix?: string
  padding?: string | number
}

const SketchWrapper: FC<SketchWrapperProps> = ({ sketch, suffix, padding }) => {
  const os = useGetOs()
  const {
    dimensions: { width, height },
  } = useCanvasDimensions()

  const sketchGlobals: Sketch = p5 => {
    p5.setup = () => p5.createCanvas(width, height).id('sketch')

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
    <Flex
      flex={1}
      align="center"
      justify="center"
      css={{
        'div:first-of-type': {
          // width: '100%',
          // height: '100%',
          padding,
        },
        '#sketch': {
          // width: '100% !important',
          // height: '100% !important',
          boxShadow: '1px 3px 6px -1px rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <ReactP5Wrapper id="test" sketch={sketchGlobals} />
    </Flex>
  )
}

export default SketchWrapper
