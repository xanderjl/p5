import dynamic from 'next/dynamic'
import { FC } from 'react'
import type { Sketch, P5WrapperProps } from 'react-p5-wrapper'
const ReactP5Wrapper = dynamic<P5WrapperProps>(
  () => import('react-p5-wrapper').then(mod => mod.ReactP5Wrapper),
  { ssr: false }
)

export interface SketchWrapperProps {
  sketch: Sketch
}

const SketchWrapper: FC<SketchWrapperProps> = ({ sketch }) => (
  <ReactP5Wrapper sketch={sketch} />
)

export default SketchWrapper
