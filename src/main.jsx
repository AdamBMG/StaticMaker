import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ClientShell from './ClientShell.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClientShell />
  </StrictMode>,
)
