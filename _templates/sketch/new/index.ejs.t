---
to: src/pages/sketches/<%= name %>.tsx
---
import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { Sketch } from 'react-p5-wrapper'

const sketch: Sketch = p5 => {
  p5.setup = () => {}

  p5.draw = () => {}
}

const <%= h.changeCase.pascal(name) %>: NextPage = () => <SketchWrapper sketch={sketch} />

export default <%= h.changeCase.pascal(name) %>
