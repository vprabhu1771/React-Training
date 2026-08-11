# 

# https://www.youtube.com/watch?v=yGNGtd-d3ro

`.env`

```
VITE_API_BASE_URL="http://192.168.1.111:8000/api"

VITE_TITLE="Hello World"
```

`App.jsx`

```
import { useState } from 'react'
import './App.css'

function App() {
  return (
    <>
      <p>{JSON.stringify(import.meta.env)}</p>
      <br />
      <p>{import.meta.env.VITE_API_BASE_URL}</p>
      <br />
      <p>{import.meta.env.VITE_TITLE}</p>
    </>
  )
}

export default App
```