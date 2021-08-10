import { Howl, Howler } from 'howler';
import React, { useState } from "react"
import styled from "styled-components"
import { list } from '../audio/w3'

const prefix = 'https://static.everthis.com/music/witcher3/'

const Op = styled.span`
  display: inline-block;
  cursor: pointer;
  border: 1px solid #ddd;
  margin: 0 2px;
  padding: 5px;
  text-align: center;
  &:first-child {
    margin-left: 0;
  }
  ${({ disabled }) => disabled && `
    background: #ddd;
  `}
  ${({ width }) => width && `
    width: ${width}px;
  `}
`
const Track = styled.div`
  position: relative;
  cursor: pointer;
  ${({ active }) => active && `
    background: #f7c7c7;
  `}
`

const Progress = styled.div`
  content: '';
  display: block;
  position: absolute;
  top:0;
  left: 0;
  height: 1em;
  background-color: red;
`
const Content = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  z-index: 1;
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
  top: 2.5em;
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
const Dur = styled.div``
const Left = styled.div``
const Right = styled.div`
  width: 145px;
  flex-shrink: 0;
`
const List = styled.div`
  padding: .5em 0 1em;
`
const Title = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 2em;
`

let curMusic

function formatTime(secs) {
  const minutes = Math.floor(secs / 60) || 0;
  const seconds = (secs - minutes * 60) || 0;

  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}
export function Player() {
  const [curTrack, setCurTrack] = useState(null)
  const [playing, setPlaying] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [duration, setDuration] = useState(Array(list.length))
  const [progress, setProgress] = useState('')
  const [percentage, setPercentage] = useState('')

  const onTrackClick = (i) => {
    setCurTrack(i)
    playTrack(i)
  }

  function playTrack(i) {
    const name = list[i]
    const src = `${prefix}${name}`
    if (curMusic) curMusic.stop()
    curMusic = new Howl({
      src: [src],
      html5: true,
      onplay: function() {
        const clone = duration.slice(0)
        clone[i] = formatTime(~~curMusic.duration())
        setDuration(clone)
        requestAnimationFrame(step.bind(null))
      }
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
    if (str == null) return ''
    const idx = str.indexOf('.mp3')
    if (idx !== -1) {
      return str.slice(0, idx)
    }
    return str
  }

  function step() {
    if(curMusic == null) return
    const seek = curMusic.seek() || 0;
    const took = formatTime(Math.round(seek));
    setProgress(took)
    const width = (((seek / curMusic.duration()) * 100) || 0) + '%';
    setPercentage(width)
    if (curMusic.playing()) {
      requestAnimationFrame(step.bind(null));
    }
  }

  const renderOps = () => {
    return (
      <>
        <Op width={42} onClick={playPrev} disabled={curTrack == null}>prev</Op>
        <Op width={50} onClick={togglePlay}>{playing ? 'pause' : 'play'}</Op>
        <Op width={42} onClick={playNext} disabled={curTrack == null}>next</Op>
      </>
    )
  }

  const styles = {
    width: percentage,
  }

  const renderCollapsed = () => (
    <Abs>
      <List>
        {
          list.map((e, i) => {
            return (
              <Track key={i} active={i === curTrack} onClick={() => onTrackClick(i)}>
                <Progress style={i === curTrack ? styles : null}></Progress>
                <Content>
                  {removeExt(e)}
                  <Dur>{i === curTrack ? `${progress}/` : ''}{duration[i]}</Dur>
                </Content>
              </Track>
            )
          })
        }
      </List>
    </Abs>
  )

  const renderNonCollapsed = () => {
    return (
      <>
        <Title>{curTrack != null ? `${playing ? 'Playing' : 'Paused'}: ${removeExt(list[curTrack])}` : ''}</Title>
      </>
    )
  }

  return (
    <Container>
      <Wrap>
        <Row>
          <Left>
            <Op width={91} onClick={toggleCollapsed}>{collapsed ? 'Hide list' : 'Music list'}</Op>
          </Left>
          {collapsed ? null : renderNonCollapsed()}
          <Right>
            {renderOps()}
          </Right>

        </Row>
        {collapsed ? renderCollapsed() : null}
      </Wrap>
    </Container>
  )
}
