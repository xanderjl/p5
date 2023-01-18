import { ColorValue, Draw, P5, Setup } from '@react-p5/core'
import { convertSeed } from '@react-p5/utils'
import Sketch from 'components/Sketch'
import { NextPage } from 'next'
import { Graphics } from 'p5'
import { useState } from 'react'
import { getDimensions } from 'util/canvasSizes'
import signature from 'util/signature'

// const warpedText = (
//   p5: P5,
//   pg: Graphics,
//   phrase: string,
//   x: number,
//   y: number,
//   width: number,
//   height: number
// ) => {
//   const fontSize = pg.width * 0.0275
//   const tileW = width / phrase.length
//   const tileH = height / phrase.length

//   pg.color(p5.random(255), 0, 200)

//   pg.textFont('Georgia')
//   pg.textSize(p5.random(fontSize * 0.5, fontSize * 1.5))
//   pg.text(phrase, x, y)

//   p5.image(pg, x, y, width, height)

//   Array.from(Array(phrase.length), i => {
//     Array(phrase.length).map(j => {
//       const wave = Math.sin(p5.frameCount * 0.01 + x * y) * 30

//       // src
//       const sx = i * tileW + wave
//       const sy = j + tileH
//       const sw = tileW
//       const sh = tileH

//       // dest
//       const dx = i * tileW
//       const dy = j + tileH
//       const dw = tileW
//       const dh = tileH

//       p5.copy(pg, sx, sy, sw, sh, dx, dy, dw, dh)
//     })
//   })
// }

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
  const [tiles, setTiles] = useState<number[][]>([[]])
  const [pg, setPg] = useState<Graphics>()

  const setup: Setup = p5 => {
    setPg(p5.createGraphics(p5.width, p5.height))
  }

  const draw: Draw = p5 => {
    // p5.noLoop()
    p5.background(background)
    p5.noFill()

    const margin = p5.width * 0.05

    // pg &&
    //   poem.map(phrase => {
    //     const width = p5.random(p5.width * 0.01, p5.width * 0.5)
    //     const height = p5.random(p5.height * 0.025, p5.height * 0.9)
    //     const x = p5.random(p5.width - margin)
    //     const y = p5.random(p5.height - margin)

    //     warpedText(p5, pg, phrase, x, y, width, height)
    // })

    // poem.map(phrase => {
    //   const r = (p5.width / phrase.length) ^ 100
    //   const x = p5.random(p5.width)
    //   const y = p5.random(p5.height)

    //   p5.strokeWeight(p5.width * 0.001)
    //   p5.stroke(255, 0, 0)
    //   p5.ellipse(x, y, r)
    // })

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
      // renderSVG
    />
  )
}

export default Rachelle
