import dynamic from 'next/dynamic'

const Sketch = dynamic(() => import('@react-p5/sketch'), { ssr: false })

export default Sketch
