import careerStepsData from '../../data/CareerData'
import About from '../about/About'
import CareerSteps from '../experience/Experience'

export default function Main() {

  return (
    <>
      <About />
      <CareerSteps steps={careerStepsData} />
    </>
  )
}

