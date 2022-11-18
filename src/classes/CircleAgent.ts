import { ColorValue, P5 } from '@react-p5/core'
import palettes from 'nice-color-palettes'
import { Color } from 'p5'

class Agent {
  p5: P5
  x: number
  y: number
  r: number
  strokeW: number
  rand: number
  angle: number
  aSpeed: number
  margin: number
  col1: ColorValue
  col2: ColorValue
  col: Color
  palette: string[]

  constructor(p5: P5) {
    this.p5 = p5
    this.margin = this.p5.width * 0.1
    this.x = this.p5.random(this.margin, this.p5.width - this.margin)
    this.y = this.p5.random(this.margin, this.p5.height - this.margin)
    this.r = this.p5.random(30, 100)
    this.strokeW = 15
    this.angle = this.p5.random(this.p5.TWO_PI)
    this.aSpeed = this.p5.random(-0.5, 0.5)
    this.rand = Math.floor(this.p5.random(5))
    this.palette = palettes[Math.floor(this.p5.random(palettes.length))]
    this.col1 = this.palette[Math.floor(this.p5.random(this.palette.length))]
    this.col2 = this.palette[Math.floor(this.p5.random(this.palette.length))]
    this.col = this.p5.lerpColor(
      this.p5.color(this.col1),
      this.p5.color(this.col2),
      this.p5.random(0, 1)
    )
  }

  style = (): void => {
    this.p5.stroke(this.col)
    this.p5.strokeWeight(this.strokeW)
    this.p5.strokeCap(this.p5.SQUARE)
    this.p5.noFill()
  }

  display = (): void => {
    this.style()
    this.p5.push()
    this.p5.translate(this.x, this.y)
    this.p5.rotate(this.angle)
    if (this.rand === 0) {
      this.p5.arc(0, 0, this.r * 2, this.r * 2, 0, this.p5.PI)
    } else if (this.rand === 1 || this.rand === 4) {
      this.p5.circle(0, 0, this.r * 2)
    } else if (this.rand === 2) {
      this.p5.arc(0, 0, this.r * 2, this.r * 2, 0, this.p5.PI + this.p5.HALF_PI)
    } else if (this.rand === 3) {
      this.p5.line(-this.r * 0.5, -this.r * 0.5, this.r * 0.5, this.r * 0.5)
    }
    this.p5.pop()
  }

  update = (): void => {
    this.angle += this.aSpeed
  }

  collide = (other: Agent): boolean => {
    const d = this.p5.dist(this.x, this.y, other.x, other.y)

    if (d < this.r * 2 + this.strokeW * 2 + other.r * 2 + other.strokeW * 2) {
      return true
    }

    return false
  }
}

export default Agent
