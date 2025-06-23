import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.tsx'
import { ThemeContextProvider } from './utils/ThemeContext.tsx'
import './app/App.css'
import { LoadingProvider } from './utils/LoadingContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <LoadingProvider>
        <App />
      </LoadingProvider>
    </ThemeContextProvider>
  </React.StrictMode>,
)

const [animationData, setAnimationData] = useState<any>(null);

useEffect(() => {
  fetch('/assets/connecting.json')
    .then(res => res.json())
    .then(setAnimationData);
}, []);

<Lottie
loop
play
animationData={animationData}
style={{ width: 180, height: 180 }}
/>
