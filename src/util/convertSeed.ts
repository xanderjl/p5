const convertSeed = (seedPhrase: string): number => {
  const bufferArray = Buffer.from(seedPhrase, 'utf-8')
  let value: number = 0

  bufferArray.forEach((val, i) => {
    value = val * 256 + bufferArray[i]
  })

  return value
}

export default convertSeed
