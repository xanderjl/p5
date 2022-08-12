import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import type { Vector } from 'p5'
import { ColorValue, Draw, P5 } from 'types/CustomP5'
import signature from 'util/signature'

const width: number = 2048
const height: number = 2048
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: ColorValue = [255, 253, 252]

const poissonDiscSampling = (p5: P5, radius: number, k: number) => {
  const n: number = 2
  const points: Vector[] = []
  

  return points
}

const draw: Draw = p5 => {
  signature(p5)
}

const FishDiscs: NextPage = () => (
  <SketchWrapper
    draw={draw}
    dimensions={dimensions}
    padding={padding}
    background={background}
  />
)

export default FishDiscs
