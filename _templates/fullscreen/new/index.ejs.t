---
to: src/pages/sketches/<%= name %>.tsx
---
import Sketch from 'components/Sketch'
import { NextPage } from 'next'
import { Draw } from '@react-p5/core'
import signature from 'util/signature'


const <%= h.changeCase.pascal(name) %>: NextPage = () => {

  const draw: Draw = p5 => {

    signature(p5)
  }

  return <Sketch draw={draw} />
}

export default <%= h.changeCase.pascal(name) %>
