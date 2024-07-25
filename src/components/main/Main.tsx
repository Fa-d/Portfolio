import { Helmet } from 'react-helmet'


import About from '../about/About'
import Education from '../education/Education'



export default function Main() {

  return (
    <>
      <Helmet>
        <title>Fahad's - Porfolio</title>
      </Helmet>
      <About />
      <Education />
    </>
  )
}

