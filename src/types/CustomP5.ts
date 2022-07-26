import type P5Types from 'p5'
import { KeyboardEvent } from 'react'

export type ColorValue = string | number | number[]

export type Setup = (p5: P5, canvasParentRef: Element) => void

export type KeyPressed = (p5: P5, e: KeyboardEvent) => void

export type Draw = (p5: P5) => void

export interface WeightedColor {
  weight: number
  value: ColorValue
}

export interface P5 extends P5Types {
  SVG?: any
}
