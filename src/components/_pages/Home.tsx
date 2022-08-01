import { Container, Heading } from '@chakra-ui/react'
import FuseSearch from 'components/FuseSearch'
import React, { FC } from 'react'
import { HomePageTypes } from 'types/Pages'

const HomePage: FC<HomePageTypes> = ({ data }) => {
  const { sketches } = data

  return (
    <Container maxW="container.md" pt={8} pb={12}>
      <Heading pb={4}>Xandy's p5 Playground</Heading>
      <FuseSearch sketches={sketches} />
    </Container>
  )
}

export default HomePage
