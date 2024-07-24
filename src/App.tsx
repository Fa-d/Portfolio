import { Helmet } from 'react-helmet'


import './App.css'
import About from './components/about/About'
import Education from './components/education/Education'

function App() {

  return (
    <>
      <Helmet>
        <title>Fahad's - Porfolio</title>
      </Helmet>
      <About/>
      <Education/>
    </>
  )
}

export default App
