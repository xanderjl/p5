import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { Sketch } from 'react-p5-wrapper'

interface Circle {
  x: number
  y: number
  r: number
}

const sketch: Sketch = p5 => {
  const circles: Circle[] = []
  let padding = 20

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight)
    p5.background(255)
    let protection = 0

    while (circles.length < 800) {
      const circle: Circle = {
        x: p5.random(p5.width),
        y: p5.random(p5.height),
        r: p5.random(12, 128),
      }

      let overlapping = circles.find(other => {
        const d = p5.dist(circle.x, circle.y, other.x, other.y)
        if (d < circle.r + other.r + padding) {
          return true
        }
      })

      !overlapping && circles.push(circle)
      protection++
      if (protection > 10000) {
        break
      }
    }

    circles.forEach(({ x, y, r }) => {
      p5.fill(p5.random(0, 255), p5.random(0, 255), p5.random(0, 255))
      p5.noStroke()
      p5.ellipse(x, y, r * 2, r * 2)
    })
  }
}

const Circles: NextPage = () => <SketchWrapper sketch={sketch} />

export default Circles
