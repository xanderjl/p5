import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { Sketch } from 'react-p5-wrapper'

const sketch: Sketch = p5 => {
  let scale: number = 20
  let w: number = 1920
  let h: number = 1080
  let cols: number = w / scale
  let rows: number = h / scale
  let terrain: number[][] = Array.from({ length: cols }, () =>
    Array.from({ length: rows }, () => 0)
  )
  let flying: number = 0

  p5.draw = () => {
    flying -= 0.01
    let yoff = flying
    terrain.forEach((cell, y) => {
      let xoff = 0
      cell.forEach((_, x) => {
        terrain[x][y] = p5.map(p5.noise(xoff, yoff), 0, 1, -100, 100)
        xoff += 0.2
      })
      yoff += 0.2
    })

    p5.background(0)
    p5.stroke(255)
    p5.noFill()

    p5.translate(0, 50)
    p5.rotateX(p5.PI / 3)
    p5.translate(-w / 2, -h / 2)

    terrain.forEach((cell, y) => {
      p5.beginShape(p5.TRIANGLE_STRIP)
      cell.forEach((_, x) => {
        p5.vertex(x * scale, y * scale, terrain[x][y])
        p5.vertex(x * scale, (y + 1) * scale, terrain[x][y + 1])
      })
      p5.endShape()
    })
  }
}

const TerrainGeneration: NextPage = () => (
  <SketchWrapper sketch={sketch} renderer="webgl" />
)

export default TerrainGeneration
