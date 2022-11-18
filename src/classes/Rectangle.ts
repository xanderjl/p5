import { ColorValue, P5 } from '@react-p5/core'
import { Color } from 'p5'

type Wave = (
  p5: P5,
  res: number,
  x: number,
  y: number,
  xgap: number,
  ygap: number,
  xoff: number,
  yoff: number
) => void

class Rectangle {
  p5: P5
  res: number
  x: number
  y: number
  w: number
  h: number
  palette: ColorValue[]

  constructor(
    p5: P5,
    res: number,
    x: number,
    y: number,
    w: number,
    h: number,
    palette: ColorValue[]
  ) {
    this.p5 = p5
    this.res = res
    this.x = x + 2
    this.y = y + 2
    this.w = w - 2
    this.h = h - 2
    this.palette = palette
  }

  wave: Wave = (p5, res, x, y, xgap, ygap, xoff, yoff) => {
    p5.beginShape()
    p5.curveVertex(xgap + x + p5.random(xoff), ygap + y + p5.random(yoff))
    Array.from({ length: res + 1 }).forEach((_, i) => {
      p5.curveVertex(
        i * xgap + x + p5.random(xoff),
        i * ygap + y + p5.random(yoff)
      )
    })
    p5.curveVertex(
      res * xgap + x + p5.random(xoff),
      res * ygap + y + p5.random(yoff)
    )
    p5.endShape()
  }

  display = () => {
    const xgap = this.w / this.res
    const ygap = this.h / this.res
    const off = 4
    const color =
      this.palette[Math.floor(this.p5.random(0, this.palette.length))]

    this.p5.fill(color as unknown as Color)
    this.p5.noStroke()
    this.p5.rect(this.x + 2, this.y + 2, this.w - 2, this.h - 2)

    this.p5.stroke(0)
    this.wave(this.p5, this.res, this.x, this.y, xgap, 0, 0, off)
    this.wave(this.p5, this.res, this.x + this.w, this.y, 0, ygap, off, 0)
    this.wave(this.p5, this.res, this.x, this.y + this.h, xgap, 0, 0, off)
    this.wave(this.p5, this.res, this.x, this.y, 0, ygap, off, 0)
  }
}

export default Rectangle
