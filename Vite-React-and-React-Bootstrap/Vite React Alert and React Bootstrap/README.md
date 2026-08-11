## 1 - Install Bootstrap
```
npm install react-bootstrap bootstrap
```

# 2 - Folder Setup
```
project_name -> src -> components
```

File Setup
```
project_name -> src -> components -> AlertComponent.jsx

project_name -> src -> components -> Home.jsx
```

## 3 - `AlertComponent.jsx`
```jsx
import React from 'react';
import { Alert } from 'react-bootstrap';

const AlertComponent = ({ variant, message }) => {
  return (
    <Alert variant={variant}>
      {message}
    </Alert>
  );
};

export default AlertComponent;
```

## 4 - `Home.jsx`
```jsx
import React from 'react';
import AlertComponent from './AlertComponent';

function Home() {
  return (
    <div className='container'>
        <AlertComponent variant="success" message="This is a success alert!" />
        <AlertComponent variant="danger" message="This is a danger alert!" />
        <AlertComponent variant="warning" message="This is a warning alert!" />
        <AlertComponent variant="info" message="This is an info alert!" />
        <AlertComponent variant="primary" message="This is a primary alert!" />
        <AlertComponent variant="secondary" message="This is a secondary alert!" />
        <AlertComponent variant="light" message="This is a light alert!" />
        <AlertComponent variant="dark" message="This is a dark alert!" />
    </div>
  )
}

export default Home;
```

## 5 - `App.jsx`
```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Home />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
```
![Image](1.PNG)
