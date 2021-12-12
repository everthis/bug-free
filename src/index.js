import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { App } from './app'
import { PS5 } from './ps5'
import 'normalize.css/normalize.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/mdn-like.css'
import './app.css'

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/ps5' element={<PS5 />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
)
