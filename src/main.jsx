import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from "react-dom/client"
import { BrowserRouter } from 'react-router-dom'
import './index.scss'
import App from './App.jsx'
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PrimeReactProvider>
        <App />
      </PrimeReactProvider>
    </BrowserRouter>
  </StrictMode>,
)
