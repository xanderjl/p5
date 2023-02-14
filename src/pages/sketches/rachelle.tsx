import { ColorValue, Draw, Setup, WindowResized } from '@react-p5/core'
import { convertSeed } from '@react-p5/utils'
import Sketch from 'components/Sketch'
import { NextPage } from 'next'
import { useState } from 'react'
import { getDimensions } from 'util/canvasSizes'
import signature from 'util/signature'

const Rachelle: NextPage = () => {
  const dimensions: number[] = getDimensions('A4')
  const padding: number[] = [40]
  const background: ColorValue = [255, 253, 252]
  const test: [number, number, string][] = [[0, 0, 'frick']]
  const poem: string[] = [
    `We went to the coffee shop, where`,
    `I walked up and introduced myself, I was afraid that he might run away`,
    `It made me weirdly sad to imagine`,
    `like-minded oddballs and`,
    `capacities for empathy and warmth`,
    `pinpoints in a greater darkness,`,
    `tells this metaphysical love story`,
    `desired by a ghost, who inhabits`,
    `a house in rural upstate New York, with a`,
    `human skeleton on a shelf in the basement.`,
    `took a break to watch a movie together.`,
    `Time moves whether we want it to or not.`,
    `The moon lit up the mountains as I drove to the valley below.`,
    `Big Husband.`,
    `"He's sleepy`,
    `But I want to see him.`,
    `"I hope that I was able to help you`,
  ]
  const poemString = poem.join()
  const marginRatio = 0.05
  const seed = convertSeed(poemString)
  const [coordinates, setCoordinates] = useState<
    (number | string)[][][] | null
  >(null)
  const [margin, setMargin] = useState<number>(0)

  const setup: Setup = p5 => {
    const margin = p5.width * marginRatio

    const coordinates = poem.map(phrase =>
      Array.from({ length: phrase.length }, () => [
        p5.random(margin * 2, p5.width - margin * 2),
        p5.random(margin * 2, p5.height - margin * 2),
        phrase,
      ])
    )

    // initialize state
    setMargin(margin)
    setCoordinates(coordinates)
  }

  const draw: Draw = p5 => {
    p5.noLoop()

    p5.background(background)
    p5.noFill()

    // mark starting coordinates
    coordinates?.forEach(phrase =>
      phrase.forEach(([x, y, s]) => {
        // const sMod = p5.width / s.length
        const d = p5.width * 0.0025

        p5.circle(x as number, y as number, d)
      })
    )

    // apply border
    p5.rect(margin, margin, p5.width - margin * 2, p5.height - margin * 2)

    signature(p5)
  }

  const windowResized: WindowResized = p5 => {
    const margin = p5.width * marginRatio

    const coordinates = poem.map(phrase =>
      Array.from({ length: phrase.length }, () => [
        p5.random(margin * 2, p5.width - margin * 2),
        p5.random(margin * 2, p5.height - margin * 2),
        phrase,
      ])
    )

    // update state
    setMargin(margin)
    setCoordinates(coordinates)
  }

  return (
    <Sketch
      seed={seed}
      setup={setup}
      draw={draw}
      windowResized={windowResized}
      dimensions={dimensions}
      padding={padding}
      renderSVG
    />
  )
}

export default Rachelle
