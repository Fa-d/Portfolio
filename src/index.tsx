
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.tsx'
import { ThemeContextProvider } from './utils/ThemeContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </React.StrictMode>,
)
