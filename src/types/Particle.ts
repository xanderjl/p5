import type { Vector } from 'p5'
import type { P5CanvasInstance } from 'react-p5-wrapper'

export class Particle {
  p5: P5CanvasInstance
  pos: Vector
  vel: Vector
  acc: Vector
  maxSpeed: number
  prevPos: Vector

  constructor(p5: P5CanvasInstance, vector: Vector) {
    this.p5 = p5
    this.pos = p5.createVector(
      p5.random(p5.windowWidth),
      p5.random(p5.windowHeight)
    )
    // @ts-ignore
    this.vel = vector.random2D()
    this.acc = this.p5.createVector(0, 0)
    this.maxSpeed = 4
    this.prevPos = this.pos.copy()
  }

  follow = (vectors: Vector[], scale: number, cols: number) => {
    const x = Math.floor(this.pos.x / scale)
    const y = Math.floor(this.pos.y / scale)
    const index = x + y * cols
    const force = vectors[index]
    this.useTheForce(force)
  }

  update = () => {
    this.vel.add(this.acc)
    this.vel.limit(this.maxSpeed)
    this.pos.add(this.vel)
    this.acc.mult(0)
  }

  useTheForce = (force: any) => {
    this.acc.add(force)
  }

  show = () => {
    this.p5.stroke(0, 5)
    this.p5.strokeWeight(1)
    this.p5.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y)
    this.updatePrev()
    // this.p5.point(this.pos.x, this.pos.y)
  }

  updatePrev = () => {
    this.prevPos.x = this.pos.x
    this.prevPos.y = this.pos.y
  }

  edges = () => {
    if (this.pos.x > this.p5.width) {
      this.pos.x = 0
      this.updatePrev()
    }
    if (this.pos.x < 0) {
      this.pos.x = this.p5.width
      this.updatePrev()
    }
    if (this.pos.y > this.p5.height) {
      this.pos.y = 0
      this.updatePrev()
    }
    if (this.pos.y < 0) {
      this.pos.y = this.p5.height
      this.updatePrev()
    }
  }
}
