import { ColorValue, Draw, P5, Setup, WindowResized } from '@react-p5/core'
import Sketch from 'components/Sketch'
import { NextPage } from 'next'
import { Graphics } from 'p5'
import { useState } from 'react'
import signature from 'util/signature'

type Tile = (
  p5: P5,
  pg: Graphics,
  x: number,
  y: number,
  w: number
) => {
  display: () => void
}

const createTile: Tile = (p5, pg, x, y, w) => {
  const img = p5.createImage(w, w)

  img.copy(pg, x, y, w, w, 0, 0, w, w)

  const display = () => {
    p5.push()
    p5.translate(x, y)
    p5.image(img, 0, 0)
    p5.pop()
  }

  return { display }
}

const MessingWithType: NextPage = () => {
  const width: number = 2048
  const height: number = 2048
  const dimensions: number[] = [width, height]
  const padding: number[] = [40]
  const background: ColorValue = [255, 253, 252]
  const tileRes: number = 10
  const [pg, setPg] = useState<Graphics>()
  const [tileSize, setTileSize] = useState<number>()
  const [tiles, setTiles] = useState<Array<ReturnType<Tile>>>()

  const setup: Setup = p5 => {
    const pg = p5.createGraphics(p5.width, p5.height)
    setPg(pg)
    setTileSize(p5.width / tileRes)

    pg.textFont('Helvetica')
    pg.textAlign('center', 'center')
    pg.fill(255)
    pg.noStroke()

    if (tileSize) {
      const tiles = Array.from({ length: tileSize }, (_, row) =>
        Array.from({ length: tileSize }, (_, col) => {
          const x = p5.width / (row * tileSize)
          const y = p5.width / (col * tileSize)
          const tile = createTile(p5, pg, x, y, tileSize)
          console.log({ x, y, tile })

          return tile
        })
      )

      setTiles(tiles)
    }
  }

  const draw: Draw = p5 => {
    if (pg) {
      pg.background(0)
      pg.textSize(p5.width * 0.4)
      pg.text('NO', pg.width * 0.5, pg.height * 0.5)

      p5.image(pg, 0, 0)
    }

    tiles?.map(tile => tile.display())

    signature(p5)
  }

  const windowResized: WindowResized = p5 => {
    pg?.resizeCanvas(p5.width, p5.height)
    setTileSize(p5.width / tileRes)
  }

  return (
    <Sketch
      setup={setup}
      draw={draw}
      dimensions={dimensions}
      padding={padding}
      background={background}
      windowResized={windowResized}
    />
  )
}

export default MessingWithType
