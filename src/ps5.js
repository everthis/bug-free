import React, { useState } from 'react'
import styled from 'styled-components'

import { payload as ps5 } from './components/ps5'

import Image from './components/img'

const AppWrap = styled.div`
  width: 95%;
  max-width: 900px;
  margin: 0 auto;
  padding: 1.2em 0 5em 0;
`

export function PS5() {
  const styles = {
    display: 'none',
  }
  console.log(ps5)
  const ratio = '56%'
  return (
    <AppWrap>
      {ps5.map((e) => {
        const { title, images } = e
        return <Image key={title} title={title} images={images} ratio={ratio} />
      })}
    </AppWrap>
  )
}
