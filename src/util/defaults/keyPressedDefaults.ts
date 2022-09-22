import { Color } from 'p5'
import { KeyboardEvent } from 'react'
import { ColorValue, P5 } from 'types/CustomP5'

export interface KeyPressed {
  p5: P5
  event: KeyboardEvent
  os: string
  fileName: string
  seed?: number
  width?: number
  dimensions?: number[]
  background?: ColorValue
  renderSVG?: boolean
  noLoop?: boolean
}

const keyPressed = ({
  p5,
  event,
  os,
  fileName,
  seed,
  width,
  dimensions,
  background,
  renderSVG,
  noLoop,
}: KeyPressed) => {
  if (os === 'mac') {
    if (event.key === 's' && event.metaKey) {
      seed && p5.randomSeed(seed)
      seed && p5.noiseSeed(seed)
      event.preventDefault()
      const ratio =
        ((dimensions && dimensions[0]) ?? width ?? p5.width) / p5.width
      p5.pixelDensity(ratio)
      background && p5.background(background as unknown as Color)
      noLoop ? (p5.loop(), p5.noLoop()) : p5.draw()
      renderSVG ? p5.save(fileName) : p5.saveCanvas(fileName, 'png')
    }
  } else {
    if (event.key === 's' && event.ctrlKey) {
      seed && p5.randomSeed(seed)
      seed && p5.noiseSeed(seed)
      event.preventDefault()
      const ratio =
        ((dimensions && dimensions[0]) ?? width ?? p5.width) / p5.width
      p5.pixelDensity(ratio)
      background && p5.background(background as unknown as Color)
      noLoop ? (p5.loop(), p5.noLoop()) : p5.draw()
      renderSVG ? p5.save(fileName) : p5.saveCanvas(fileName, 'png')
    }
  }
}

export default keyPressed
