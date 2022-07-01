import dynamic from 'next/dynamic'
import { FC, useEffect, useState } from 'react'
import type { P5WrapperProps, Sketch } from 'react-p5-wrapper'
const ReactP5Wrapper = dynamic<P5WrapperProps>(
  () => import('react-p5-wrapper').then(mod => mod.ReactP5Wrapper),
  { ssr: false }
)

export interface SketchWrapperProps {
  sketch: Sketch
}

const SketchWrapper: FC<SketchWrapperProps> = ({ sketch }) => {
  const [os, setOs] = useState<string>('')
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const osString = navigator.userAgent.includes('Mac') ? 'mac' : ''
      setOs(osString)
    }
  }, [os])

  const doTheOtherStuff: Sketch = p5 => {
    p5.keyPressed = (e: KeyboardEvent) => {
      if (os === 'mac') {
        if (e.key === 's' && e.metaKey) {
          e.preventDefault()
          p5.saveCanvas('bimbim', 'png')
        }
      } else {
        if (e.key === 's' && e.ctrlKey) {
          e.preventDefault()
          p5.saveCanvas('bimbim', 'png')
        }
      }
    }
    return sketch(p5)
  }

  return <ReactP5Wrapper sketch={doTheOtherStuff} />
}

export default SketchWrapper
