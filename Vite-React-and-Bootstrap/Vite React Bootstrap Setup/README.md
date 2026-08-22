I'll help you set up a Vite React project with Bootstrap. Here's a complete guide:

## Step 1: Create a New Vite React Project

```bash
# Using npm
npm create vite@latest my-app -- --template react

# Using yarn
yarn create vite@latest my-app --template react

# Using pnpm
pnpm create vite@latest my-app --template react
```

## Step 2: Navigate to Project Directory

```bash
cd my-app
```

## Step 3: Install Bootstrap

```bash
# Using npm
npm install bootstrap @popperjs/core

# Using yarn
yarn add bootstrap @popperjs/core

# Using pnpm
pnpm add bootstrap @popperjs/core
```

## Step 4: Install Dependencies

```bash
# Using npm
npm install

# Using yarn
yarn

# Using pnpm
pnpm install
```

## Step 5: Configure Vite (Optional)

Create or update `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
})
```

## Step 6: Import Bootstrap in Your App

### Option A: Import Bootstrap CSS in `src/main.jsx`:

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css' // Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js' // Bootstrap JS

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### Option B: Import Bootstrap in `src/App.jsx`:

```jsx
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

function App() {
  return (
    <div className="container mt-5">
      <h1 className="text-primary">Hello, Bootstrap with Vite & React!</h1>
      <button className="btn btn-success">Click Me</button>
    </div>
  )
}

export default App
```

## Step 7: Create a Sample Component with Bootstrap

Create `src/components/Navbar.jsx`:

```jsx
import React from 'react'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="#">My App</a>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link active" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
```

Create `src/components/Card.jsx`:

```jsx
import React from 'react'

function Card({ title, text, buttonText }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{text}</p>
          <a href="#" className="btn btn-primary">{buttonText}</a>
        </div>
      </div>
    </div>
  )
}

export default Card
```

## Step 8: Update App Component

Update `src/App.jsx`:

```jsx
import React from 'react'
import Navbar from './components/Navbar'
import Card from './components/Card'

function App() {
  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          <Card 
            title="Card 1" 
            text="This is a Bootstrap card with React and Vite." 
            buttonText="Learn More"
          />
          <Card 
            title="Card 2" 
            text="Fast development with hot reloading and Bootstrap styling." 
            buttonText="Get Started"
          />
          <Card 
            title="Card 3" 
            text="Easy integration with React components and Bootstrap classes." 
            buttonText="Explore"
          />
        </div>
      </div>
    </div>
  )
}

export default App
```

## Step 9: Add Bootstrap Icons (Optional)

```bash
npm install bootstrap-icons
```

Then import in `src/main.jsx`:

```javascript
import 'bootstrap-icons/font/bootstrap-icons.css'
```

Usage example:

```jsx
<i className="bi bi-github"></i>
```

## Step 10: Run the Development Server

```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev
```

## Step 11: Build for Production

```bash
# Using npm
npm run build

# Using yarn
yarn build

# Using pnpm
pnpm build
```

## Complete Project Structure

```
my-app/
├── node_modules/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── Card.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── public/
│   └── vite.svg
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Alternative: Using React-Bootstrap

If you prefer React-Bootstrap components instead of plain Bootstrap classes:

```bash
npm install react-bootstrap bootstrap
```

Then import components:

```jsx
import { Button, Container, Navbar, Nav } from 'react-bootstrap'
```

## Troubleshooting Tips

1. **Ensure Bootstrap is imported before your custom CSS**
2. **Check that Popper.js is installed** (it's required for dropdowns, tooltips, etc.)
3. **Clear browser cache** if styles aren't updating
4. **Restart dev server** after installing new packages

That's it! You now have a fully functional Vite React project with Bootstrap integrated.
