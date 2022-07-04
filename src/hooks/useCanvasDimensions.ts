import { useState } from 'react'

export interface Dimensions {
  width: number
  height: number
}

const useCanvasDimensions = () => {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  })

  return { dimensions, setDimensions }
}

export default useCanvasDimensions
