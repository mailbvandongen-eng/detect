import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { version } from '../package.json'

// ArcGIS SDK initialisatie
import '@arcgis/core/assets/esri/themes/light/main.css'
import { initArcGIS } from './config/arcgisConfig'

// Initialiseer ArcGIS SDK met API key
initArcGIS()

// Version comes from package.json - only run `npm version patch/minor/major`
console.log(`%c🚀 DetectorApp v${version}`, 'background: #4CAF50; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
)
