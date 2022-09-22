import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
  Input,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Dispatch, FC, SetStateAction } from 'react'

export interface UIValue {
  label: string
  value: number
  setValue: Dispatch<SetStateAction<number>>
  max?: number
}

export interface UIProps {
  values?: UIValue[]
  noLoop?: boolean
}
const UI: FC<UIProps> = ({ values, noLoop }) => {
  const { pathname } = useRouter()
  const splitPath: string[] = pathname.split('/')
  const title: string = splitPath[splitPath.length - 1]

  return (
    <Accordion
      position='absolute'
      maxW='max-content'
      mt={6}
      ml={6}
      p={3}
      bg='white'
      borderRadius={8}
      borderWidth={1}
      borderColor='gray.200'
      boxShadow='md'
      allowToggle
      transition='opacity 200ms ease-out'
    >
      <AccordionItem border='none'>
        <AccordionButton>
          <Box flex={1} textAlign='left'>
            {title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <VStack align='stretch' spacing={6}>
            {values?.map((v, i) => {
              const { label, value, setValue, max } = v

              return (
                <VStack key={i} align='flex-start'>
                  <HStack>
                    <Text whiteSpace='nowrap'>{label}:</Text>
                    <Input
                      type='number'
                      value={value}
                      onChange={e => setValue(parseInt(e.target.value))}
                      maxW={`${Math.floor(value.toString().length * 2)}ch`}
                      p={0}
                      textAlign='center'
                    />
                  </HStack>
                  <Slider
                    colorScheme='red'
                    focusThumbOnChange={false}
                    defaultValue={value}
                    value={value}
                    max={max}
                    onChange={v => {
                      setValue(v)
                      if (typeof window !== 'undefined' && noLoop) {
                        window.p5.loop()
                        window.p5.noLoop()
                      }
                    }}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </VStack>
              )
            })}
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

export default UI
