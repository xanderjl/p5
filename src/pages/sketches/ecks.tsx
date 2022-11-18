import { ColorValue, Draw, P5 } from '@react-p5/core'
import { convertSeed } from '@react-p5/utils'
import Sketch from 'components/Sketch'
import { NextPage } from 'next'
import signature from 'util/signature'

type Line = (p5: P5) => {
  display: () => void
}

const width: number = 2048
const height: number = 2048
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: ColorValue = [255, 253, 252]
const nScl: number = 3000
const nStr: number = 20
let margin: number
const suffix: string = 'xd'
const seed: number = convertSeed(suffix)

const draw: Draw = p5 => {
  margin = p5.width * 0.1
  p5.noLoop()
  p5.background(background)
  p5.rectMode(p5.CENTER)
  p5.noStroke()

  Array.from({ length: 800 }, () => {
    line(p5).display()
  })

  Array.from({ length: 200 }, () => {
    const x = p5.random(margin, p5.width - margin)
    const y = p5.random(margin, p5.height - margin)
    const unit = p5.random(10, 50)

    p5.push()
    p5.fill(255, 160, 160, p5.random(100, 255))
    p5.rect(x, y, unit, unit)
    p5.pop()
  })

  const unit = p5.width * 0.25
  p5.rect(p5.width * 0.5, p5.height * 0.5, unit, unit)

  signature(p5)
}

const line: Line = p5 => {
  let x = p5.random(margin, p5.width - margin)
  let y = p5.random(margin, p5.height - margin)
  const speed = p5.random(-40, 40)
  const length = p5.width * 0.05
  const stroke = p5.random(255)

  const display = () => {
    p5.push()
    p5.noFill()
    p5.stroke(stroke)
    p5.strokeWeight(
      p5.map(
        p5.noise(p5.random(1), p5.random(5), p5.random(4)),
        0,
        1,
        1,
        p5.width * 0.0065
      )
    )
    Array.from({ length }).forEach(() => {
      update()
    })
    p5.pop()
  }

  const update = () => {
    const angle = p5.noise(x / nScl, y / nScl) * nStr

    if (bounds() === true) {
      x += Math.cos(angle) * speed
      y += Math.sin(angle) * speed
      p5.text('X', x, y)
    }
  }

  const bounds = () => {
    if (x <= margin || x >= p5.width - margin) {
      if (y <= margin || y >= p5.height - margin) {
        return false
      }
    }

    return true
  }

  return { display }
}

const Ecks: NextPage = () => (
  <Sketch
    draw={draw}
    dimensions={dimensions}
    padding={padding}
    background={background}
    seed={seed}
    suffix={suffix}
  />
)

export default Ecks
