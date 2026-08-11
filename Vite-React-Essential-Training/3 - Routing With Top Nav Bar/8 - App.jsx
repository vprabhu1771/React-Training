import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// import './App.css'
import TopNavBar from './components/TopNavBar'
import Home from './components/Home'
import Product from './components/Product'
import About from './components/About'


function App() {
  return (
    <>
      <div>

        <BrowserRouter>
          <TopNavBar />
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/products" element={<Product/>} />
              <Route path="/about" element={<About/>} />
          </Routes>

        </BrowserRouter>

      </div>
    </>
  )
}

export default App