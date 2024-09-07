import careerStepsData from '../../data/CareerData'
import educationStepsData from '../../data/EducationData'
import About from '../about/About'
import CareerSteps from '../experience/Experience'
import Education from '../education/Education'
import ReactGA from 'react-ga4';
import Projects from '../projects/Projects'
import { allProjects } from '../../data/ProjectData'


export default function Main() {
  ReactGA.initialize('YOUR_TRACKING_ID');

  return (
    <>
      <About />
      <CareerSteps steps={careerStepsData} />
      <Education steps={educationStepsData} />
      <Projects items={allProjects} />
    </>
  )
}

