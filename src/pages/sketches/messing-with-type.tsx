import { ColorValue, Draw, P5, Setup, WindowResized } from '@react-p5/core'
import Sketch from 'components/Sketch'
import { NextPage } from 'next'
import { Graphics } from 'p5'
import { useState } from 'react'
import signature from 'util/signature'

type TileMethods = {
  display: () => void
}

type Tile = (
  p5: P5,
  pg: Graphics,
  x: number,
  y: number,
  w: number
) => TileMethods

const createTile: Tile = (p5, pg, x, y, w) => {
  const img = p5.createImage(w, w)

  img.copy(pg, x, y, w, w, 0, 0, w, w)

  const display = () => {
    p5.push()
    p5.translate(x, y)
    p5.rotate(p5.mouseX * 0.01)
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
  const background: ColorValue = [0]
  const tileRes: number = 12
  const [pg, setPg] = useState<Graphics | null>(null)
  const [text, setText] = useState<string>('')
  const [textSize, setTextSize] = useState<number>(0)
  const [tileSize, setTileSize] = useState<number>(0)
  const [tiles, setTiles] = useState<TileMethods[][] | null>(null)

  const setup: Setup = p5 => {
    // define intial values
    const text = 'NO'
    const tileSize = p5.width / tileRes
    const textSize = (p5.width * 0.33) / (text.length * 0.33)
    const pg = p5.createGraphics(p5.width, p5.height)

    // manipulate pg
    pg.textFont('Helvetica')
    pg.textAlign('center', 'center')
    pg.fill(255)
    pg.noStroke()
    pg.textSize(textSize)
    pg.text(text, pg.width * 0.5, pg.height * 0.5)

    // instantiate tiles
    const tiles = Array.from({ length: tileRes }, (_, i) =>
      Array.from({ length: tileRes }, (_, j) => {
        const x = i * tileSize
        const y = j * tileSize

        return createTile(p5, pg, x, y, tileSize)
      })
    )

    // set initial state
    setPg(pg)
    setTileSize(tileSize)
    setText(text)
    setTextSize(textSize)
    setTiles(tiles)
  }

  const draw: Draw = p5 => {
    p5.clear(0, 0, 0, 0)
    p5.background(background)

    tiles?.map(arr =>
      arr.map(tile => {
        tile.display()
      })
    )

    signature(p5)
  }

  const windowResized: WindowResized = p5 => {
    const textSize = (p5.width * 0.4) / (text.length * 0.33)

    if (pg) {
      pg.resizeCanvas(p5.width, p5.height)
      pg.text(text, pg.width * 0.5, pg.height * 0.5)
      pg.textSize(textSize)

      // instantiate tiles
      const tiles = Array.from({ length: tileRes }, (_, i) =>
        Array.from({ length: tileRes }, (_, j) => {
          const x = i * tileSize
          const y = j * tileSize

          return createTile(p5, pg, x, y, tileSize)
        })
      )

      setTiles(tiles)
    }

    // set state
    setTileSize(p5.width / tileRes)
    setTextSize(textSize)
  }

  return (
    <Sketch
      setup={setup}
      draw={draw}
      dimensions={dimensions}
      padding={padding}
      windowResized={windowResized}
    />
  )
}

export default MessingWithType
