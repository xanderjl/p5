import { P5 } from './CustomP5'
// import type P5 from 'p5'

declare global {
  interface Window {
    p5: P5
  }
}
