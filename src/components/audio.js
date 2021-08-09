import { Howl, Howler } from 'howler';
import React, { useState } from "react"
import styled from "styled-components"
import { list } from '../audio/w3'

const prefix = 'https://static.everthis.com/music/witcher3/'

const Op = styled.span`
  display: inline-block;
  cursor: pointer;
  border: 1px solid #ddd;
  margin: 0 5px;
  padding: 5px;
  &:first-child {
    margin-left: 0;
  }
  ${({ disabled }) => disabled && `
  background: #ddd;
`}
`
const Track = styled.div`
  cursor: pointer;
  ${({ active }) => active && `
    background: #ea9999;
  `}
`
const Container = styled.div`
  position: relative;
`
const Wrap = styled.div`
  position: relative;
  height: 1.5em;
`
const Abs = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: white;
  z-index: 1;
`

const Switch = styled.span`
  display: inline-block;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`
const Left = styled.div``
const Right = styled.div``
const List = styled.div`
  padding: 1em 0;
`

let curMusic

export function Player() {
  const [curTrack, setCurTrack] = useState(null)
  const [playing, setPlaying] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  const onTrackClick = (i) => {
    const e = list[i]
    setCurTrack(i)
    playTrack(i)
  }

  function playTrack(i) {
    const name = list[i]
    const src = `${prefix}${name}`
    if (curMusic) curMusic.stop()
    curMusic = new Howl({
      src: [src]
    });
    curMusic.play()
    setPlaying(true)
  }

  function togglePlay() {
    if (curMusic) {
      if (curMusic.playing()) {
        curMusic.pause()
        setPlaying(false)
      } else {
        curMusic.play()
        setPlaying(true)
      }
    } else {
      setCurTrack(0)
      playTrack(0)
      setPlaying(true)
    }
  }

  function playPrev() {
    if (curTrack == null) return
    const n = list.length
    let res = 0
    if (curTrack === 0) {
      res = n - 1
    } else {
      res = curTrack - 1
    }
    setCurTrack(res)
    playTrack(res)
  }

  function playNext() {
    if (curTrack == null) return
    const n = list.length
    let res = 0
    if (curTrack === n - 1) {
      res = 0
    } else {
      res = curTrack + 1
    }
    setCurTrack(res)
    playTrack(res)
  }

  function toggleCollapsed() {
    setCollapsed(!collapsed)
  }

  function removeExt(str) {
    const idx = str.indexOf('.mp3')
    if (idx !== -1) {
      return str.slice(0, idx)
    }
    return str
  }

  const renderCollapsed = () => (
    <Abs>
      <Row>
        <Left>
          <Op onClick={toggleCollapsed}>Hide list</Op>
        </Left>

        <Right>
          <Op onClick={playPrev} disabled={curTrack == null}>prev</Op>
          <Op onClick={togglePlay}>{playing ? 'pause' : 'play'}</Op>
          <Op onClick={playNext} disabled={curTrack == null}>next</Op>
        </Right>

      </Row>
      <List>
        {
          list.map((e, i) => {
            return <Track key={i} active={i === curTrack} onClick={() => onTrackClick(i)}>{removeExt(e)}</Track>
          })
        }
      </List>
    </Abs>
  )

  const renderNonCollapsed = () => {
    return (
      <>
        <span>{curTrack ? `${playing ? 'Playing' : 'Paused'}: ${removeExt(list[curTrack])}` : ''}</span>
        {curTrack != null ? <Op onClick={togglePlay}>{playing ? 'pause' : 'play'}</Op> : null}
      </>
    )
  }

  return (
    <Container>
      <Wrap>
        <Switch onClick={toggleCollapsed}><Op>Music list</Op></Switch>
        {collapsed ? renderCollapsed() : renderNonCollapsed()}
      </Wrap>
    </Container>
  )
}
