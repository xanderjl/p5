import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { useState } from 'react'
import { ColorValue, Draw, P5 } from 'types/CustomP5'
import { getDimensions } from 'util/canvasSizes'
import signature from 'util/signature'

// Read More: https://sighack.com/post/circle-packing-using-stochastic-search

class Circle {
  p5: P5
  x: number
  y: number
  r: number

  constructor(p5: P5, x: number, y: number, r: number) {
    this.p5 = p5
    this.x = x
    this.y = y
    this.r = r
  }

  collides = (c: Circle): boolean => {
    if (this.p5.dist(this.x, this.y, c.x, c.y) < this.r + c.r) {
      return true
    }

    return false
  }

  draw = (): void => {
    this.p5.ellipse(this.x, this.y, this.r * 2, this.r * 2)
  }
}

const StochasticSearch: NextPage = () => {
  const dimensions: number[] = getDimensions('A4')
  const padding: number[] = [40]
  const background: ColorValue = [255, 253, 252]
  const [failedTries, setFailedTries] = useState<number>(0)
  let margin: number
  let circles: Circle[]

  const isValidCircle = (circle: Circle): boolean => {
    // TODO: refactor to use filter
    circles.forEach(c => {
      if (circle.collides(c)) {
        return false
      }
    })
    return true
  }

  const draw: Draw = p5 => {
    // methods for renderSVG performance
    p5.clear(0, 0, 0, 0)
    p5.frameRate(1)

    // global vars
    margin = p5.width * 0.75

    // global styles
    p5.noFill()

    // generate array of circles
    const nc = new Circle(
      p5,
      p5.random(p5.width - margin),
      p5.random(p5.height - margin),
      16
    )

    if (isValidCircle(nc)) {
      nc.draw()
      circles.push(nc)
    } else {
      setFailedTries(failedTries + 1)
      if (failedTries > 16 * 1024) {
        p5.noLoop()
      }
    }

    // stochastic search

    signature(p5)
  }

  return (
    <SketchWrapper
      draw={draw}
      dimensions={dimensions}
      padding={padding}
      background={background}
      renderSVG
    />
  )
}

export default StochasticSearch
