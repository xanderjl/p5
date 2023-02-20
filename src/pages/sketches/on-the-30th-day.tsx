import { ColorValue, Draw, P5, Setup } from '@react-p5/core'
// import { UIValue } from '@react-p5/sketch'
import { convertSeed, createGrain } from '@react-p5/utils'
import Sketch from 'components/Sketch'
import { NextPage } from 'next'
import { Graphics } from 'p5'
import { useState } from 'react'
import signature from 'util/signature'

const OnThe_30thDay: NextPage = () => {
  const width: number = 2048
  const height: number = 2048
  const dimensions: number[] = [width, height]
  const padding: number[] = [40]
  const background: ColorValue = [255, 253, 252]
  const phrase: string = 'The End.'
  const [seed, setSeed] = useState<number>(convertSeed(phrase))
  const [length, setLength] = useState<number>(120)
  const [nScl, setNScl] = useState<number>(1000)
  const [nStr, setNStr] = useState<number>(40)
  const [grain, setGrain] = useState<Graphics>()
  let margin: number
  // const values: UIValue[] = [
  //   {
  //     label: 'Seed',
  //     value: seed,
  //     setValue: setSeed,
  //     max: 5000,
  //   },
  //   {
  //     label: 'Array Length',
  //     value: length,
  //     setValue: setLength,
  //     max: 500,
  //   },
  //   {
  //     label: 'Noise Scale',
  //     value: nScl,
  //     setValue: setNScl,
  //     max: 5000,
  //   },
  //   {
  //     label: 'Noise Strength',
  //     value: nStr,
  //     setValue: setNStr,
  //     max: 1000,
  //   },
  // ]

  const particle = (
    p5: P5,
    xStart: number,
    yStart: number,
    speed: number = 10,
    length: number = 10
  ): void => {
    let x = xStart
    let y = yStart

    p5.push()
    p5.noFill()
    Array.from({ length }, () => {
      const a = p5.noise(x / nScl, y / nScl) * nStr
      const inBounds =
        x >= margin &&
        x < p5.width - margin &&
        y >= margin &&
        y < p5.height - margin
      const s = p5.random(-speed * 0.005, speed)

      if (inBounds) {
        p5.ellipse(x, y, s * 0.8, s * 0.8)
        x += Math.cos(a) * s
        y += Math.sin(a) * s
      }
    })
    p5.pop()
  }

  const setup: Setup = p5 => {
    setGrain(createGrain(p5))
  }

  const draw: Draw = p5 => {
    margin = p5.width * 0.1
    p5.background(background)

    const points = Array.from({ length }, () => {
      const a = p5.radians(p5.random(10))
      const x = p5.random(margin, p5.width - margin) + Math.cos(a)
      const y = p5.random(margin, p5.height - margin) + Math.sin(a)

      return [x, y]
    })

    p5.push()
    Array.from({ length: length * 0.25 }, () => {
      const x = p5.random(margin, p5.width - margin)
      const y = p5.random(margin, p5.height - margin)
      const d = p5.random(100)
      const start = p5.random(p5.PI)
      const end = start + p5.PI * 0.25
      const stroke = p5.random(1) > 0.5 ? [255, 137, 137, 255] : [5, 0, 0, 20]

      p5.strokeWeight(p5.random(0.5, 6))
      p5.stroke(stroke)
      p5.arc(x, y, d, d, start, end)
    })
    p5.pop()

    p5.push()
    points.forEach(([x, y]) => {
      p5.strokeWeight(p5.random(1))
      p5.stroke(5, 0, 0, 40)
      p5.point(x, y)
      particle(p5, x, y, 10, Math.floor(p5.random(40)))
    })
    p5.pop()

    Array.from({ length: 2 }, () => {
      const r = p5.random(p5.width * 0.05, p5.width * 0.3)

      p5.push()
      p5.translate(
        p5.random(margin + r, p5.width - (margin + r)),
        p5.random(margin + r, p5.height - (margin + r))
      )
      Array.from({ length: p5.TWO_PI * r * 0.11 }, () => {
        const rt1 = p5.random(360)
        const rt2 = p5.random(360)
        const cx1 = r * Math.cos(p5.radians(rt1))
        const cy1 = r * Math.sin(p5.radians(rt1))
        const cx2 = r * Math.cos(p5.radians(rt2))
        const cy2 = r * Math.sin(p5.radians(rt2))

        p5.stroke(5, 0, 0, p5.random(50, 80))
        p5.strokeWeight(p5.random(1.5))
        p5.line(cx1, cy1, cx2, cy2)
      })
      p5.pop()
    })

    p5.image(grain!, 0, 0, p5.width, p5.height)

    signature(p5)
  }

  return (
    <Sketch
      setup={setup}
      draw={draw}
      dimensions={dimensions}
      padding={padding}
      background={background}
      seed={seed}
      suffix={seed}
      // UIValues={values}
    />
  )
}

export default OnThe_30thDay
