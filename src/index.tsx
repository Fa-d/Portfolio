import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.tsx'
import { ThemeContextProvider } from './utils/ThemeContext.tsx'
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <ThemeProvider theme={createTheme()}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ThemeContextProvider>
  </React.StrictMode>,
)
