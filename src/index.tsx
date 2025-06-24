import React from 'react'
import ReactDOM from 'react-dom/client'
import AppContent from './app/App.tsx'
import { ThemeContextProvider } from './utils/ThemeContext.tsx'
import './app/App.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <AppContent />
    </ThemeContextProvider>
  </React.StrictMode>,
)

