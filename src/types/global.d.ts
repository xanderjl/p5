import { P5 } from './CustomP5'

declare global {
  interface Window {
    p5: P5
  }
}
