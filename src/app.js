import React, { useState } from 'react'
import { Controlled as CodeMirror } from 'react-codemirror2'
import styled from 'styled-components'
import MD from 'react-markdown'
require('codemirror/mode/javascript/javascript')
import { UF } from './components/union-find'
import { BTUD } from './components/binary-tree-upside-down'
import { MRII } from './components/meeting-rooms-ii'
const options = {
  mode: 'javascript',
  theme: 'mdn-like',
  height: 'auto',
  lineNumbers: true,
  readOnly: true,
  viewportMargin: Infinity,
}
const AppWrap = styled.div`
  width: 90%;
  max-width: 41em;
  margin: 0 auto;
  padding: 1em 0 5em 0;
`
const OpsRow = styled.div`
  padding: 1em 0;
`
const ImgSec = styled.div`
  font-size: 0;
  img {
    max-width: 100%;
  }
`
const problemsMap = {
  'union-find': UF,
  'binary-tree-upside-down': BTUD,
  'meeting-rooms-ii': MRII,
}
export function App() {
  const [value, setValue] = useState(BTUD)
  function selectChange(e) {
    setValue(problemsMap[e.target.value])
  }
  function renderProblem() {
    return value.problem ? (
      <>
        <h3>Problem:</h3>
        <MD source={value.problem} />
      </>
    ) : null
  }
  return (
    <AppWrap>
      <OpsRow>
        <label htmlFor="algorithm-select">
          <b>Choose a problem: </b>
        </label>
        <select name="algorithms" id="algorithm-select" onChange={selectChange}>
          <option value="binary-tree-upside-down">
            Binary tree upside down
          </option>
          <option value="meeting-rooms-ii">Meeting rooms II</option>
        </select>
      </OpsRow>
      {value.title ? <div>{value.title}</div> : null}
      {renderProblem()}
      <h3>Solution:</h3>
      {value.images &&
        value.images.length &&
        value.images.map((e, idx) => {
          return (
            <ImgSec key={idx}>
              <img src={e} />
            </ImgSec>
          )
        })}
      {value.codeArr &&
        value.codeArr.length &&
        value.codeArr.map((e, idx) => {
          return (
            <div key={idx}>
              <p>{e.description}</p>
              <CodeMirror
                value={e.code}
                options={options}
                onBeforeChange={(editor, data, value) => {
                  setValue(value)
                }}
                onChange={(editor, data, value) => {}}
              />
            </div>
          )
        })}
    </AppWrap>
  )
}
