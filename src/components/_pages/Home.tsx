import React, { FC } from 'react'
import { Container, Heading } from '@chakra-ui/react'
import { HomePageTypes } from 'types/Pages'
import FuseSearch from 'components/FuseSearch'

const HomePage: FC<HomePageTypes> = ({ data }) => {
  const { sketches } = data

  return (
    <Container maxW="container.lg">
      <Heading>Xandy's p5 Playground</Heading>
      <FuseSearch sketches={sketches} />
    </Container>
  )
}

export default HomePage
