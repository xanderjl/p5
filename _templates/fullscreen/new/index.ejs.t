---
to: src/pages/sketches/<%= name %>.tsx
---
import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { Draw } from 'types/CustomP5'
import signature from 'util/signature'

const draw: Draw = p5 => {

  signature(p5)
}

const <%= h.changeCase.pascal(name) %>: NextPage = () => <SketchWrapper draw={draw} />

export default <%= h.changeCase.pascal(name) %>
