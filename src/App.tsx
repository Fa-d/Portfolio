import { Helmet } from 'react-helmet'


import './App.css'
import About from './components/about/About'

function App() {

  return (
    <>
      <Helmet>
        <title>Fahad's - Porfolio</title>
      </Helmet>
      <About/>
    </>
  )
}

export default App
