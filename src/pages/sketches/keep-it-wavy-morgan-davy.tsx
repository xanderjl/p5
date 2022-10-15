import { createGrain, createOverlay } from '@react-p5/utils'
import SketchWrapper from 'components/SketchWrapper'
import UI, { UIValue } from 'components/UI'
import { NextPage } from 'next'
import { Graphics } from 'p5'
import { useState } from 'react'
import { ColorValue, Draw, Setup, WindowResized } from 'types/CustomP5'
import createGrid from 'util/createGrid'
import signature from 'util/signature'

const KeepItWavyMorganDavy: NextPage = () => {
  const width: number = 2048
  const height: number = 2048
  const dimensions: number[] = [width, height]
  const padding: number[] = [40]
  const background: ColorValue = [255, 253, 252]
  let margin: number
  const [seed, setSeed] = useState<number>(0)
  const [gridDensity, setGridDensity] = useState<number>(80)
  const [grid, setGrid] = useState<number[][]>(createGrid(gridDensity))
  const [grain, setGrain] = useState<Graphics>()
  const [overlay, setOverlay] = useState<Graphics>()
  const [nScl, setNScl] = useState<number>(1000)
  const [nStr, setNStr] = useState<number>(40)
  const [speed, setSpeed] = useState<number>(100)
  const suffix: string = `seed:${seed},nScl:${nScl},nStr:${nStr},speed:${speed}`
  const values: UIValue[] = [
    {
      label: 'Seed',
      value: seed,
      setValue: setSeed,
    },
    {
      label: 'Grid Density',
      value: gridDensity,
      setValue: setGridDensity,
      max: 100,
    },
    {
      label: 'Noise Scale',
      value: nScl,
      setValue: setNScl,
      max: 4000,
    },
    {
      label: 'Noise Strength',
      value: nStr,
      setValue: setNStr,
      max: 500,
    },
    {
      label: 'Speed',
      value: speed,
      setValue: setSpeed,
      max: 1000,
    },
  ]

  const setup: Setup = p5 => {
    margin = p5.width * 0.1
    setGrain(createGrain(p5))
    setOverlay(createOverlay(p5))
    setGrid(
      grid.map(([u, v]) => {
        const x = p5.lerp(margin, p5.width - margin, u)
        const y = p5.lerp(margin, p5.height - margin, v)

        return [x, y]
      })
    )
  }

  const draw: Draw = p5 => {
    p5.clear(0, 0, 0, 0)
    margin = p5.width * 0.1

    p5.background(background)
    p5.strokeWeight(2.5)
    p5.frameRate(1)

    grid.forEach(([x, y]) => {
      const a: number = p5.noise(x / nScl, y / nScl) * nStr
      const cos: number = x + Math.cos(a) * speed
      const sin: number = y + Math.sin(a) * speed
      const isInBounds: boolean =
        cos > margin &&
        cos < p5.width - margin &&
        sin >= margin &&
        sin < p5.height - margin

      // isInBounds && p5.point(cos, sin)
      isInBounds && p5.point(x, y)
      // p5.textSize(16)
      // p5.textStyle('bold')
      // isInBounds && p5.text('+', cos, sin)
      // isInBounds && p5.text('+', x, y)
    })

    p5.image(overlay!, 0, 0, p5.width, p5.height)
    p5.image(grain!, 0, 0, p5.width, p5.height)

    signature(p5)
  }

  const windowResized: WindowResized = p5 => {
    margin = p5.width * 0.1
    setGrid(
      createGrid(gridDensity).map(([u, v]) => {
        const x = p5.lerp(0, p5.width, u)
        const y = p5.lerp(0, p5.height, v)
        return [x, y]
      })
    )
  }

  return (
    <>
      <UI values={values} />
      <SketchWrapper
        setup={setup}
        draw={draw}
        windowResized={windowResized}
        dimensions={dimensions}
        padding={padding}
        background={background}
        seed={seed}
        suffix={suffix}
      />
    </>
  )
}

export default KeepItWavyMorganDavy
