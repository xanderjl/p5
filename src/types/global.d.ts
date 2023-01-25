import { P5 } from '@react-p5/core'
// import type P5 from 'p5'

declare global {
  interface Window {
    p5: P5
  }
}
