I'll convert the Google Maps app to use plain HTML/CSS with React (no Chakra UI). Here's the complete solution:

## 1. Update `App.jsx`

```jsx
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { useRef, useState } from 'react'
import './App.css'

const center = { lat: 48.8584, lng: 2.2945 }

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  })

  const [map, setMap] = useState(null)
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')

  const originRef = useRef()
  const destinationRef = useRef()

  if (!isLoaded) {
    return <div className="loading">Loading Google Maps...</div>
  }

  async function calculateRoute() {
    if (originRef.current.value === '' || destinationRef.current.value === '') {
      alert('Please enter both origin and destination')
      return
    }
    
    try {
      const directionsService = new google.maps.DirectionsService()
      const results = await directionsService.route({
        origin: originRef.current.value,
        destination: destinationRef.current.value,
        travelMode: google.maps.TravelMode.DRIVING,
      })
      setDirectionsResponse(results)
      setDistance(results.routes[0].legs[0].distance.text)
      setDuration(results.routes[0].legs[0].duration.text)
    } catch (error) {
      console.error('Error calculating route:', error)
      alert('Error calculating route. Please check your inputs.')
    }
  }

  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destinationRef.current.value = ''
  }

  function centerMap() {
    if (map) {
      map.panTo(center)
      map.setZoom(15)
    }
  }

  return (
    <div className="app-container">
      {/* Map Container */}
      <div className="map-container">
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={setMap}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </div>

      {/* Control Panel */}
      <div className="control-panel">
        <div className="input-group">
          <div className="input-wrapper">
            <label>Origin</label>
            <Autocomplete>
              <input
                type="text"
                placeholder="Enter origin"
                ref={originRef}
                className="input-field"
              />
            </Autocomplete>
          </div>
          <div className="input-wrapper">
            <label>Destination</label>
            <Autocomplete>
              <input
                type="text"
                placeholder="Enter destination"
                ref={destinationRef}
                className="input-field"
              />
            </Autocomplete>
          </div>
        </div>

        <div className="button-group">
          <button
            className="btn btn-primary"
            onClick={calculateRoute}
          >
            Calculate Route
          </button>
          <button
            className="btn btn-danger"
            onClick={clearRoute}
          >
            ✕ Clear
          </button>
          <button
            className="btn btn-info"
            onClick={centerMap}
          >
            🎯 Center
          </button>
        </div>

        <div className="info-group">
          <div className="info-item">
            <span className="info-label">Distance:</span>
            <span className="info-value">{distance || '—'}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Duration:</span>
            <span className="info-value">{duration || '—'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
```

## 2. Create `App.css`

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
}

.app-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

/* Map Container */
.map-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* Loading State */
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.2rem;
  color: #666;
}

/* Control Panel */
.control-panel {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  min-width: 600px;
  max-width: 90%;
  z-index: 10;
}

/* Input Group */
.input-group {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
}

.input-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.input-wrapper label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #333;
  letter-spacing: 0.3px;
}

.input-field {
  width: 100%;
  padding: 10px 14px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  background: #fafafa;
}

.input-field:focus {
  outline: none;
  border-color: #e91e63;
  background: white;
  box-shadow: 0 0 0 3px rgba(233, 30, 99, 0.1);
}

.input-field::placeholder {
  color: #999;
}

/* Button Group */
.button-group {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.btn-primary {
  background: #e91e63;
  color: white;
  flex: 1;
  justify-content: center;
}

.btn-primary:hover {
  background: #c2185b;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(233, 30, 99, 0.3);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-danger {
  background: #dc3545;
  color: white;
}

.btn-danger:hover {
  background: #c82333;
  transform: translateY(-1px);
}

.btn-info {
  background: #17a2b8;
  color: white;
}

.btn-info:hover {
  background: #138496;
  transform: translateY(-1px);
}

/* Info Group */
.info-group {
  display: flex;
  gap: 24px;
  padding-top: 12px;
  border-top: 2px solid #f0f0f0;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
}

.info-label {
  font-weight: 600;
  color: #555;
}

.info-value {
  color: #e91e63;
  font-weight: 700;
  font-size: 1.05rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .control-panel {
    min-width: auto;
    width: 95%;
    top: 10px;
    padding: 16px;
  }

  .input-group {
    flex-direction: column;
    gap: 8px;
  }

  .button-group {
    flex-direction: column;
  }

  .btn-primary {
    flex: none;
  }

  .info-group {
    flex-direction: column;
    gap: 6px;
  }

  .info-item {
    justify-content: space-between;
  }
}

@media (max-width: 480px) {
  .control-panel {
    padding: 12px;
    top: 8px;
  }

  .input-field {
    padding: 8px 12px;
    font-size: 0.85rem;
  }

  .btn {
    padding: 8px 16px;
    font-size: 0.85rem;
  }
}
```

## 3. Update `main.jsx`

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

## 4. Create `index.css`

```css
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
```

## 5. Create `.env` file

```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

## 6. Update `package.json` (remove Chakra UI dependencies)

```json
{
  "name": "google-maps-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@react-google-maps/api": "^2.19.3",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.0.8"
  }
}
```

## 7. Update `vite.config.js`

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  define: {
    'global': 'window',
  },
})
```

## 8. Optional: Update `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Google Maps Route Planner</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

## Installation Steps:

1. **Remove old dependencies:**
```bash
npm uninstall @chakra-ui/react @emotion/react @emotion/styled framer-motion react-icons
```

2. **Install fresh:**
```bash
npm install
```

3. **Run the app:**
```bash
npm run dev
```

## Features:

✅ **No external UI libraries** - Pure CSS with custom styling
✅ **Fully responsive** - Works on desktop, tablet, and mobile
✅ **Clean Material Design** - Inspired interface with smooth animations
✅ **All original functionality** - Route calculation, clearing, centering
✅ **Error handling** - Better error messages and validation
✅ **Vite optimized** - Fast development and build process

The app now uses only vanilla CSS with a clean, modern design that's fully responsive and maintains all the original Google Maps functionality!
