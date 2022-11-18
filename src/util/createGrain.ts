import type { P5 } from '@react-p5/core'
import type { Graphics } from 'p5'

const createGrain = (p5: P5, opacity: number = 10): Graphics => {
  const grain = p5.createGraphics(p5.width, p5.height)
  grain.loadPixels()
  Array.from({ length: p5.width }, (_, i) => {
    Array.from({ length: p5.height }, (_, j) => {
      grain.set(i, j, p5.color(p5.random(255), opacity))
    })
  })
  grain.updatePixels()

  return grain
}

export default createGrain
