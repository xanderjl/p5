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
  // midnight
  {
    weight: 15,
    value: '#222C2F',
  },
  // navy
  {
    weight: 10,
    value: '#283D68',
  },
  // heron blue
  {
    weight: 8,
    value: '#6389BE',
  },
  // grey
  {
    weight: 12,
    value: '#B9C3CD',
  },
  // peach
  {
    weight: 8,
    value: '#EFB38D',
  },
  // sand
  {
    weight: 14,
    value: '#DFC5B1',
  },
  // bone
  {
    weight: 15,
    value: '#EFE4D0',
  },
  // walnut
  {
    weight: 10,
    value: '#725B46',
  },
  // bronze
  {
    weight: 8,
    value: '#976444',
  },
]
