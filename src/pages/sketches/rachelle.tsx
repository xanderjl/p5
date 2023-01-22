import { ColorValue, Draw, P5, Setup } from '@react-p5/core'
import { convertSeed } from '@react-p5/utils'
import Sketch from 'components/Sketch'
import { NextPage } from 'next'
import { Graphics } from 'p5'
import { useState } from 'react'
import { getDimensions } from 'util/canvasSizes'
import { TileMethods } from 'util/createTile'
import signature from 'util/signature'

const Rachelle: NextPage = () => {
  const dimensions: number[] = getDimensions('A4')
  const padding: number[] = [40]
  const background: ColorValue = [255, 253, 252]
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
  const seed = convertSeed(poemString)
  const [tileSize, setTileSize] = useState<number>(0)
  const [tiles, setTiles] = useState<TileMethods[][] | null>(null)
  const [pg, setPg] = useState<Graphics>()

  const setup: Setup = p5 => {
    setPg(p5.createGraphics(p5.width, p5.height))
  }

  const draw: Draw = p5 => {
    p5.background(background)
    p5.noFill()

    const margin = p5.width * 0.05

    signature(p5)
  }

  return (
    <Sketch
      seed={seed}
      setup={setup}
      draw={draw}
      dimensions={dimensions}
      padding={padding}
      background={background}
    />
  )
}

export default Rachelle
