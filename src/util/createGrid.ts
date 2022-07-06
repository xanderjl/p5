const createGrid = (count: number) => {
  const points: number[][] = []

  Array.from({ length: count }, (_, u) =>
    Array.from({ length: count }, (_, v) => {
      const x = u / (count - 1)
      const y = v / (count - 1)
      points.push([x, y])
    })
  )

  return points
}

export default createGrid
