import dynamic from 'next/dynamic'
import { Dispatch, FC, useEffect, useState } from 'react'
import type { P5WrapperProps, Sketch } from 'react-p5-wrapper'
const ReactP5Wrapper = dynamic<P5WrapperProps>(
  () => import('react-p5-wrapper').then(mod => mod.ReactP5Wrapper),
  { ssr: false }
)
import { format } from 'date-fns'

export interface SketchWrapperProps {
  sketch: Sketch
  suffix?: string
}

const SketchWrapper: FC<SketchWrapperProps> = ({ sketch, suffix }) => {
  const [os, setOs] = useState<string>('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const osString = navigator.userAgent.includes('Mac') ? 'mac' : ''
      setOs(osString)
    }
  }, [os])

  const doTheOtherStuff: Sketch = p5 => {
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

  return <ReactP5Wrapper sketch={doTheOtherStuff} />
}

export default SketchWrapper
