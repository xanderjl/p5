import { P5 } from '@react-p5/core'
import { Graphics } from 'p5'

export type TileMethods = {
  display: () => void
}

export type Tile = (
  p5: P5,
  pg: Graphics,
  x: number,
  y: number,
  w: number
) => TileMethods

export const createTile: Tile = (p5, pg, x, y, w) => {
  const img = p5.createImage(w, w)

  img.copy(pg, x, y, w, w, 0, 0, w, w)

  const display = () => {
    p5.push()
    p5.translate(x, y)
    p5.rotate(p5.mouseX * 0.01)
    p5.image(img, 0, 0)
    p5.pop()
  }

  return { display }
}
