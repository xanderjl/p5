import type P5Types from 'p5'

export type ColorValue = string | number | number[]

export interface WeightedColor {
  weight: number
  value: ColorValue
}

export interface P5 extends P5Types {
  SVG?: any
}
