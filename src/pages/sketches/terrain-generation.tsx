import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { Sketch } from 'react-p5-wrapper'

const sketch: Sketch = p5 => {
  // let scale: number = 20
  // let w: number = 1400
  // let h: number = 1000
  // let cols: number = w / scale
  // let rows: number = h / scale
  // let colsArray: number[] = Array.from(Array(cols).keys())
  // let rowsArray: number[] = Array.from(Array(rows).keys())
  // let terrain: number[][] = colsArray.map(() => rowsArray.fill(0))
  // let flying: number = 0
  // console.log({ terrain })

  // p5.setup = () => p5.createCanvas(600, 600, p5.WEBGL)

  // p5.draw = () => {
  //   flying -= 0.01
  //   let yoff = flying
  //   rowsArray.forEach((_, y) => {
  //     let xoff = 0
  //     colsArray.forEach((_, x) => {
  //       terrain[x][y] = p5.map(p5.noise(xoff, yoff), 0, 1, -100, 100)
  //       xoff += 0.2
  //     })
  //     yoff += 0.2
  //   })

  //   p5.background(0)
  //   p5.stroke(255)
  //   p5.noFill()

  //   p5.translate(0, 50)
  //   p5.rotateX(p5.PI / 3)
  //   p5.translate(-w / 2, -h / 2)

  //   rowsArray.forEach((_, y) => {
  //     p5.beginShape(p5.TRIANGLE_STRIP)
  //     colsArray.forEach((_, x) => {
  //       p5.vertex(x * scale, y * scale, terrain[x][y])
  //       p5.vertex(x * scale, (y + 1) * scale, terrain[x][y + 1])
  //     })
  //     p5.endShape()
  //   })
  // }
  // Daniel Shiffman
  // http://codingtra.in
  // https://youtu.be/IKB1hWWedMk
  // https://thecodingtrain.com/CodingChallenges/011-perlinnoiseterrain.html

  // Edited by SacrificeProductions

  var cols: number, rows: number
  var scl = 20
  var w = 1400
  var h = 1000

  var flying = 0

  var terrain: number[][] = []
  cols = w / scl
  rows = h / scl
  for (var x = 0; x < cols; x++) {
    terrain[x] = []
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0 //specify a default value for now
    }
  }
  console.log({ terrain })

  p5.setup = () => p5.createCanvas(600, 600, p5.WEBGL)

  p5.draw = () => {
    flying -= 0.01
    var yoff = flying
    for (var y = 0; y < rows; y++) {
      var xoff = 0
      for (var x = 0; x < cols; x++) {
        terrain[x][y] = p5.map(p5.noise(xoff, yoff), 0, 1, -100, 100)
        xoff += 0.2
      }
      yoff += 0.2
    }

    p5.background(0)
    p5.translate(0, 50)
    p5.rotateX(p5.PI / 3)
    p5.stroke(255)
    p5.noFill()
    p5.translate(-w / 2, -h / 2)

    for (var y = 0; y < rows - 1; y++) {
      p5.beginShape(p5.TRIANGLE_STRIP)
      for (var x = 0; x < cols; x++) {
        p5.vertex(x * scl, y * scl, terrain[x][y])
        p5.vertex(x * scl, (y + 1) * scl, terrain[x][y + 1])
      }
      p5.endShape()
    }
  }
}

const TerrainGeneration: NextPage = () => <SketchWrapper sketch={sketch} />

export default TerrainGeneration
