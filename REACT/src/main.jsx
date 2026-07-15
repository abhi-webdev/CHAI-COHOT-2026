import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Abhi from './Abhi.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Abhi />
  </StrictMode>,
)
