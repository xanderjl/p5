import { Flex } from '@chakra-ui/react'
import { format } from 'date-fns'
import useGetOs from 'hooks/useGetOs'
import dynamic from 'next/dynamic'
import type P5 from 'p5'
import { RENDERER } from 'p5'
import { ComponentClass, FC, KeyboardEvent, useMemo } from 'react'
import { SketchProps } from 'react-p5'
import { ColorValue } from 'types/CustomP5'
import setupDefault from 'util/setup'

export interface SketchWrapperProps
  extends Omit<SketchProps, 'keyPressed' | 'setup'> {
  setup?: (p5: P5, CanvasParentRef: Element) => void
  keyPressed?: (p5: P5, e: KeyboardEvent) => void
  suffix?: string | number
  padding?: number[]
  width?: number
  height?: number
  dimensions?: number[]
  renderer?: RENDERER
  background?: ColorValue
  pixelDensity?: number
  seed?: number
  renderSVG?: boolean
}

const Sketch = dynamic<SketchWrapperProps>(
  () =>
    import('react-p5').then(mod => mod.default) as Promise<
      ComponentClass<SketchWrapperProps, any>
    >,
  {
    ssr: false,
  }
)

const SketchSVG = dynamic<SketchWrapperProps>(
  () =>
    import('react-p5').then(mod => {
      require('p5.js-svg')

      return mod.default
    }) as Promise<ComponentClass<SketchWrapperProps, any>>,
  {
    ssr: false,
  }
)

const SketchWrapper: FC<SketchWrapperProps> = ({
  setup,
  suffix,
  padding,
  width,
  height,
  dimensions,
  renderer,
  background,
  pixelDensity,
  seed,
  renderSVG,
  ...rest
}) => {
  const os = useGetOs()

  // const usedWidth = dimensions
  //   ? dimensions[0]
  //   : width && height
  //   ? width
  //   : p5.windowWidth
  // const usedHeight = dimensions
  //   ? dimensions[1]
  //   : width && height
  //   ? height
  //   : p5.windowHeight

  // windowResized({
  //   p5,
  //   width: usedWidth,
  //   height: usedHeight,
  //   dimensions: [usedWidth, usedHeight],
  //   padding,
  //   background,
  //   seed,
  // })

  const fileName = [
    format(new Date(), 'yyyy.MM.dd-kk.mm.ss'),
    suffix ? suffix.toString() : '',
  ].join()

  const keyPressed = (p5: P5, e: KeyboardEvent) => {
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

  return (
    <Flex flex={1} align="center" justify="center">
      {/* {renderSVG ? ( */}
      <SketchSVG
        setup={(p5, canvasParentRef) => {
          p5.createCanvas(2048, 2048, p5.SVG).parent(canvasParentRef)
        }}
        // setup={
        //   (p5, canvasParentRef) => {
        //     p5.createCanvas(dimensions[0], dimensions[1], p5.SVG)
        //   }
        //   // setupDefault({
        //   //   p5,
        //   //   canvasParentRef,
        //   //   padding,
        //   //   width,
        //   //   height,
        //   //   dimensions,
        //   //   renderer,
        //   //   background,
        //   //   pixelDensity,
        //   //   seed,
        //   //   renderSVG,
        //   // })
        // }
        keyPressed={keyPressed}
        {...rest}
      />
      {/* ) : (
        <Sketch
          setup={(p5, canvasParentRef) =>
            setupDefault({
              p5,
              canvasParentRef,
              padding,
              width,
              height,
              dimensions,
              renderer,
              background,
              pixelDensity,
              seed,
            })
          }
          keyPressed={keyPressed}
          {...rest}
        />
      )} */}
    </Flex>
  )
}

export default SketchWrapper
