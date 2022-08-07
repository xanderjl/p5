import CircleAgent from 'classes/CircleAgent'
import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { ColorValue, Draw } from 'types/CustomP5'
import signature from 'util/signature'

const width: number = 2048
const height: number = 2048
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: ColorValue = [255, 253, 252]
let agents: CircleAgent[] = []
let maxCount: number

const draw: Draw = p5 => {
  maxCount = Math.floor(p5.width * 0.02)
  p5.background(background)
  agents.length < maxCount && agents.push(new CircleAgent(p5))

  // TODO: fix collision logic bug
  // agents.forEach((_, i) => {
  //   const j = agents.length - 1

  //   agents.length <= maxCount &&
  //     agents[i].collide(agents[j]) &&
  //     agents.splice(j)
  // })

  agents.forEach(agent => {
    agent.display()
    agent.update()
  })

  signature(p5)
}

const ColorInterpolation: NextPage = () => (
  <SketchWrapper
    draw={draw}
    dimensions={dimensions}
    padding={padding}
    background={background}
  />
)

export default ColorInterpolation
