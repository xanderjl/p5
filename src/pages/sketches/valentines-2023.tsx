import { ColorValue, Draw, P5 } from '@react-p5/core'
import { convertSeed } from '@react-p5/utils'
import Sketch from 'components/Sketch'
import { NextPage } from 'next'
import { getDimensions } from 'util/canvasSizes'
import signature from 'util/signature'

const drawText = (p5: P5, string: string, xStart: number, yStart?: number) => {
  let a = 0
  let freq = 10
  const inc = p5.TWO_PI / 25.0
  let range = p5.width * p5.map(p5.noise(freq), 0, 1, 0.025, 0.075)

  Array.from(string, (char: string, i: number) => {
    const x = xStart + p5.width * i * 0.02
    const y = p5.map(
      p5.noise(Math.sin(a) * freq),
      0,
      1,
      (yStart ?? xStart) - range,
      (yStart ?? xStart) + range
    )

    p5.text(char, x, y)

    a = a + inc
    freq = freq + inc * 10
    range = range + inc * 2
  })
}

const Valentines_2023: NextPage = () => {
  const dimensions: number[] = getDimensions('A4')
  const padding: number[] = [40]
  const background: ColorValue = [255, 253, 252]
  const seedPhrase: string = `
    The following story takes place in the year 2088.

    When a character is introduced, their stated age is how old they appear to be. Everyone is at least twice as old as they appear.

                                                                                                                          FADE IN:

    INT. WHIT'S APARTMENT - BEDROOM - MORNING

    ENERGETIC DARKWAVE MUSIC FADES UP as we open on WHITMER "WHIT" DEVLIN (34) buried in a pile of blankets on a naked mattress.

    The sun peaks through a sweat-stained sheet pinned over a window, directly onto Whit's face and two sun-faded movie posters above his bed.

    Whit's eyes pop open and he groans. He throws the blankets off himself and dumps a glass of water on a long-dead plant.

    BEGIN SEQUENCE

    -- Whit looks through his closet and pulls out two nearly identical torn white t-shirts.

    -- He stands in front of a full-length mirror in his boxers and holds each shirt in fron of him.

    -- He chooses the slightly less-torn shirt and puts it on.

    INT. WHIT'S APARTMENT - MOMENTS LATER

    -- Whit pulls his I.D. out of his wallet. He grins wide in the picture, hair combed and a zest for life. He places it next to his phone and keys on the kitchen table.

    -- Whit goes to his desk, writes something on a pad of sticky notes and removes the note.

    -- He takes the STICKY NOTE and locks the front door with the dead bolt on his way to the bathroom.

    INT WHIT'S APARTMENT - BATHROOM - MOMENTS LATER

    -- Whit stares at himself in his toothpaste-spattered mirror. Cavernous bags hang under his dead eyes.

    -- Whit brushes his teeth as he tries and fails to comb down his unkempt hair.
  `
  const myLove: string = "I'll love you forever, always."
  const seed = convertSeed(seedPhrase)
  const length = 15

  const draw: Draw = p5 => {
    p5.frameRate(1)
    p5.clear(0, 0, 0, 0)
    p5.background(background)

    const margin = p5.width * 0.05
    const textSize = p5.width * 0.025

    p5.textFont('Helvetica')
    p5.textSize(textSize)
    p5.textAlign('center', 'center')
    Array.from({ length }, (_, i) => {
      const y = margin * 3 + i * 30
      p5.textSize(p5.width * 0.025 * ((i + 1) * 0.5))
      drawText(p5, myLove, p5.width * 0.25, y)
    })

    p5.push()
    p5.noFill()
    p5.rect(margin, margin, p5.width - margin * 2, p5.height - margin * 2)
    p5.pop()

    signature(p5)
  }

  return (
    <Sketch
      seed={seed}
      draw={draw}
      dimensions={dimensions}
      padding={padding}
      background={background}
      renderSVG
    />
  )
}

export default Valentines_2023
