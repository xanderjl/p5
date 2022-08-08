export type PaperSize = 'A0' | 'A1' | 'A2' | 'A3' | 'A4'

export interface PaperSizes {
  [key: string]: number[]
}

const paperSizes: PaperSizes = {
  A0: [9933, 14043],

  A1: [7016, 9933],

  A2: [4961, 7016],

  A3: [3508, 4961],

  A4: [2480, 3508],
}

export const getDimensions = (paperSize: PaperSize) => paperSizes[paperSize]
