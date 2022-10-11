import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { useState } from 'react'
import { ColorValue, Draw, Setup, WindowResized } from 'types/CustomP5'
import { getDimensions } from 'util/canvasSizes'
import createGrid from 'util/createGrid'
import signature from 'util/signature'

const Rings: NextPage = () => {
  const dimensions: number[] = getDimensions('A4')
  const padding: number[] = [40]
  const background: ColorValue = [255, 253, 252]
  const [grid, setGrid] = useState<number[][]>([[0, 0]])
  let margin: number

  const setup: Setup = p5 => {
    margin = p5.width * 0.2
    const res = 0.00835
    const rows: number = Math.floor(p5.width * res)
    const cols: number = Math.floor(p5.height * res)

    setGrid(
      createGrid(rows, cols).map(([u, v]) => {
        const x = p5.lerp(margin, p5.width - margin, u)
        const y = p5.lerp(margin, p5.height - margin, v)

        return [x, y]
      })
    )
  }

  const draw: Draw = p5 => {
    p5.clear(0, 0, 0, 0)

    // global consts
    const resolution: number =
      p5.dist(grid[0][0], grid[0][1], grid[1][0], grid[1][1]) * 1.25

    // global styles
    p5.noFill()
    p5.strokeWeight(2)
    const ctx = p5.drawingContext as CanvasRenderingContext2D
    ctx.setLineDash([5, 9, 1, 9])

    // plot along grid
    grid.forEach(([x, y]) => {
      p5.ellipse(x, y, resolution, resolution)
    })

    signature(p5)
  }

  const windowResized: WindowResized = p5 => {
    margin = p5.width * 0.2
    const res = 0.00835
    const rows: number = Math.floor(p5.width * res)
    const cols: number = Math.floor(p5.height * res)

    setGrid(
      createGrid(rows, cols).map(([u, v]) => {
        const x = p5.lerp(margin, p5.width - margin, u)
        const y = p5.lerp(margin, p5.height - margin, v)

        return [x, y]
      })
    )
  }

  return (
    <SketchWrapper
      setup={setup}
      draw={draw}
      windowResized={windowResized}
      dimensions={dimensions}
      padding={padding}
      background={background}
      renderSVG
    />
  )
}

export default Rings
