import React, { useState } from "react"
import { Controlled as CodeMirror } from "react-codemirror2"
import styled from "styled-components"
import MD from "react-markdown"
require("codemirror/mode/javascript/javascript")
import { UF } from "./components/union-find"
import { BTUD } from "./components/binary-tree-upside-down"
import { MRII } from "./components/meeting-rooms-ii"
import { MPIJS } from "./components/maximum-profit-in-job-scheduling"
const options = {
  mode: "javascript",
  theme: "mdn-like",
  height: "auto",
  lineNumbers: true,
  readOnly: true,
  // lineWrapping: true,
  viewportMargin: Infinity,
}
const AppWrap = styled.div`
  width: 90%;
  max-width: 41em;
  margin: 0 auto;
  padding: 1.2em 0 5em 0;
`
const OpsRow = styled.div`
  padding: 1.2em 0;
`
const DescriptionSection = styled.div`
  pre {
    white-space: break-spaces;
  }
`
const ImgSec = styled.div`
  font-size: 0;
  img {
    min-height: 80px;
    max-width: 100%;
  }
`
const problemsMap = {
  "union-find": UF,
  "binary-tree-upside-down": BTUD,
  "meeting-rooms-ii": MRII,
  "maximum-profit-in-job-scheduling": MPIJS,
}
export function App() {
  const [value, setValue] = useState(MPIJS)
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
  const styles = {
    display: 'none'
  }
  return (
    <AppWrap>
      <h1>Even though we never said it to each other, we knew.</h1>
      <div style={styles} >
      <OpsRow>
        <label htmlFor='algorithm-select'>
          <b>Choose a problem: </b>
        </label>
        <select name='algorithms' id='algorithm-select' onChange={selectChange}>
          <option value='maximum-profit-in-job-scheduling'>
            Maximum Profit in Job Scheduling
          </option>
          <option value='binary-tree-upside-down'>
            Binary tree upside down
          </option>
          <option value='meeting-rooms-ii'>Meeting rooms II</option>
        </select>
      </OpsRow>
      {value.title ? <div>{value.title}</div> : null}
      <DescriptionSection>{renderProblem()}</DescriptionSection>
      <h3>Solution:</h3>
      {value.images && value.images.length
        ? value.images.map((e, idx) => {
            return (
              <ImgSec key={idx}>
                <img src={e} />
              </ImgSec>
            )
          })
        : null}
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
      </div>
    </AppWrap>
  )
}
