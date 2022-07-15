import { P5CanvasInstance } from 'react-p5-wrapper'
import { WeightedColor } from 'types/CustomP5'

export const createWeightedSelector = (
  p5: P5CanvasInstance,
  colors: WeightedColor[]
) => {
  const weightedArray: WeightedColor['value'][] = []

  colors.forEach(({ weight, value }) =>
    Array.from({ length: weight }).forEach(() => weightedArray.push(value))
  )

  return () => weightedArray[Math.floor(p5.random() * weightedArray.length)]
}

export const vancouverIsland: WeightedColor[] = [
  {
    weight: 40,
    value: '#222C2F',
  },
  {
    weight: 20,
    value: '#55709E',
  },
  {
    weight: 25,
    value: '#976444',
  },
  {
    weight: 10,
    value: '#DFC5B1',
  },
  {
    weight: 5,
    value: '#FFF4D7',
  },
]
