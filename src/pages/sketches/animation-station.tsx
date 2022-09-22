import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { Color } from 'p5'
import { ColorValue, Draw, Setup } from 'types/CustomP5'
import signature from 'util/signature'

const AnimationStation: NextPage = () => {
  const width: number = 2048
  const height: number = 2048
  const dimensions: number[] = [width, height]
  const padding: number[] = [40]
  const background: ColorValue = '#191919'
  const primary: ColorValue = [255, 0, 0]
  const nScl: number = 10
  let margin: number
  let grid: number[][] = []

  const setup: Setup = p5 => {
    const rows: number = 10
    const cols: number = 80
    margin = p5.width * 0.1
    Array.from({ length: rows }, (_, i) =>
      Array.from({ length: cols }, (_, j) => {
        const u: number = Math.sqrt(i / (rows - 1))
        const v: number = Math.sqrt(j / (cols - 1))
        const x: number = p5.lerp(margin, p5.width - margin, u)
        const y: number = p5.lerp(margin, p5.height - margin, v)
        const noise: number = p5.noise(x / nScl, y / nScl)
        const noiseMap: number = p5.map(noise, 0, 1, 0, 1)
        const pushChance: boolean = noiseMap > 0.73

        pushChance && grid.push([x, y])
      })
    )
  }

  const draw: Draw = p5 => {
    p5.frameRate(8)
    p5.background(background)

    // p5.noFill()

    // global draw params
    margin = p5.width * 0.1

    // draw rects
    p5.shuffle(grid).forEach(([x, y]) => {
      const min: number = p5.width * 0.1
      const max: number = p5.width * 0.3
      const w: number = p5.random(min, max)
      const h: number = p5.random(min, max)

      //bounds
      const x1: number = x - w * 0.5
      const x2: number = x + w * 0.5
      const y1: number = y - h * 0.5
      const y2: number = y + h * 0.5

      const chance: boolean = p5.random(1) > 0.5
      const color = (chance ? primary : 'white') as unknown as Color

      p5.stroke(primary)
      p5.fill(color)

      p5.rectMode('corners')
      p5.rect(x1, y1, x2, y2)
    })

    signature(p5)
  }

  return (
    <SketchWrapper
      setup={setup}
      draw={draw}
      dimensions={dimensions}
      padding={padding}
      background={background}
    />
  )
}

export default AnimationStation
