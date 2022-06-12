import dynamic from 'next/dynamic'
import type { FC } from 'react'
import type { P5WrapperProps, Sketch } from 'react-p5-wrapper'
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
