import { Input, InputProps, List, ListItem } from '@chakra-ui/react'
import Fuse from 'fuse.js'
import { Link } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FC } from 'react'

export interface FuseSearchProps extends InputProps {
  sketches: string[]
}

const FuseSearch: FC<FuseSearchProps> = ({ sketches }) => {
  const [value, setValue] = useState<string>('')
  const fuse = new Fuse(sketches, { includeScore: true })
  const filteredSketches = fuse.search(value)

  return (
    <>
      <Input value={value} onChange={e => setValue(e.target.value)} />
      <List>
        {value !== ''
          ? filteredSketches.map(({ item }, i) => {
              return (
                <Link key={item + i} href={`/sketches/${item}`}>
                  <ListItem>{item.replace('-', ' ')}</ListItem>
                </Link>
              )
            })
          : sketches.map((sketch, i) => {
              return (
                <Link key={sketch + i} href={`/sketches/${sketch}`}>
                  <ListItem>{sketch.replace('-', ' ')}</ListItem>
                </Link>
              )
            })}
      </List>
    </>
  )
}

export default FuseSearch
