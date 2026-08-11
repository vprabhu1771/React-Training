import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HelloWorld from './components/HelloWorld'

import './App.css'


function App() {
  return (
    <>
      <div>

        <BrowserRouter>

          <Routes>
              <Route path="/" element={<HelloWorld/>} />
          </Routes>

        </BrowserRouter>

      </div>
    </>
  )
}

export default App