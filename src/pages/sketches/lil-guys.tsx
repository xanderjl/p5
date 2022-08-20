import SketchWrapper from 'components/SketchWrapper'
import UI, { UIValue } from 'components/UI'
import { NextPage } from 'next'
import { useState } from 'react'
import { ColorValue, Draw, P5 } from 'types/CustomP5'
import signature from 'util/signature'

const LilGuys: NextPage = () => {
  const width: number = 2048
  const height: number = 2048
  const dimensions: number[] = [width, height]
  const padding: number[] = [40]
  const background: ColorValue = [255, 253, 252]
  let margin: number
  const [seed, setSeed] = useState<number>(0)
  const [nScl, setNScl] = useState<number>(1000)
  const [nStr, setNStr] = useState<number>(20)
  const [radius, setRadius] = useState<number>(300)
  const [resolution, setResolution] = useState<number>(360)
  const [rings, setRings] = useState<number>(10)
  const values: UIValue[] = [
    {
      label: 'Seed',
      value: seed,
      setValue: setSeed,
      max: 3000,
    },
    {
      label: 'Noise Scale',
      value: nScl,
      setValue: setNScl,
      max: 6000,
    },
    {
      label: 'Noise Strength',
      value: nStr,
      setValue: setNStr,
      max: 2000,
    },
    {
      label: 'Resolution',
      value: resolution,
      setValue: setResolution,
      max: 3600,
    },
    {
      label: 'Radius',
      value: radius,
      setValue: setRadius,
      max: width * 0.5,
    },
    {
      label: 'Rings',
      value: rings,
      setValue: setRings,
      max: 100,
    },
  ]

  const lilGuy = (
    p5: P5,
    x: number,
    y: number,
    r: number,
    resolution: number = 360
  ): void => {
    Array.from({ length: resolution }, (_, i) => {
      const a = p5.radians(i * (360 / resolution))
      const rand = p5.noise(a / nScl, i / nScl) * nStr

      // const x2: number = x + rand + r * Math.cos(x + r * Math.cos(a))
      const x2: number = x + r * Math.cos(x + rand + r * Math.cos(a))

      p5.push()
      p5.translate(x, y)
      p5.rotate(a)
      p5.point(x2, 0)
      p5.pop()
    })
  }

  const draw: Draw = p5 => {
    margin = p5.width * 0.1

    p5.background(background)

    p5.push()
    Array.from({ length: rings }, (_, i) => {
      p5.strokeWeight(i * 0.25)
      let inc: number = (i + 1) * 20
      lilGuy(p5, p5.width * 0.5, p5.height * 0.5, radius + inc, resolution)

      inc += 100
    })
    p5.pop()
    // lilGuy(p5, p5.width * 0.5, p5.height * 0.5, radius, resolution)
    // lilGuy(p5, p5.width * 0.5, p5.height * 0.5, radius + 20, resolution)

    signature(p5)
  }

  return (
    <>
      <UI values={values} />
      <SketchWrapper
        draw={draw}
        dimensions={dimensions}
        padding={padding}
        background={background}
        seed={seed}
      />
    </>
  )
}

export default LilGuys
