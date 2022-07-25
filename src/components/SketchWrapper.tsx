import { Flex } from '@chakra-ui/react'
import { format } from 'date-fns'
import useGetOs from 'hooks/useGetOs'
import dynamic from 'next/dynamic'
import type P5 from 'p5'
import p5 from 'p5'
import { RENDERER } from 'p5'
import { FC } from 'react'
import { SketchProps } from 'react-p5'
import { ColorValue } from 'types/CustomP5'
import setup from 'util/setup'
import windowResized from 'util/windowResized'

const Sketch = dynamic<SketchProps>(
  () => import('react-p5').then(mod => mod.default),
  {
    ssr: false,
  }
)

export interface SketchWrapperProps {
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

  const fileName = [
    format(new Date(), 'yyyy.MM.dd-kk.mm.ss'),
    suffix ? suffix.toString() : '',
  ].join()

  const keyPressed = (p5: P5, e: any) => {
    console.log({ e })
    if (os === 'mac') {
      if (p5.key === 's' && p5.keyCode === p5.CONTROL) {
        seed && p5.randomSeed(seed)
        seed && p5.noiseSeed(seed)
        const ratio =
          ((dimensions && dimensions[0]) ?? width ?? p5.width) / p5.width
        p5.pixelDensity(ratio)
        p5.draw()
        p5.saveCanvas(fileName, 'png')
      }
    } else {
      if (p5.key === 's' && p5.keyCode === p5.CONTROL) {
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

  return (
    <Flex flex={1} align="center" justify="center">
      <Sketch
        setup={setup}
        keyPressed={keyPressed}
        windowResized={windowResized({
          p5,
          width: usedWidth,
          height: usedHeight,
          dimensions: [usedWidth, usedHeight],
          padding,
          background,
          seed,
        })}
      />
    </Flex>
  )
}

export default SketchWrapper
