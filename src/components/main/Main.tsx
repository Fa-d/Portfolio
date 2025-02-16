import careerStepsData from '../../data/CareerData'
import educationStepsData from '../../data/EducationData'
import About from '../about/About'
import CareerSteps from '../experience/Experience'
import Education from '../education/Education'
import ReactGA from 'react-ga4';
import Projects from '../projects/Projects'
import { allProjects } from '../../data/ProjectData'
import ArticleNote from '../articles/ArticleNote'
import { articleData } from '../../data/ArticleNote'
import Skills from '../skills/Skills'
import { skillsList } from '../../data/SkillsData'


export default function Main() {
  ReactGA.initialize('YOUR_TRACKING_ID');

  return (
    <>
      <About />
 
      <Skills items={skillsList} />
 
      <Projects items={allProjects} />
   
      <CareerSteps steps={careerStepsData} />

      <ArticleNote items={articleData} isArticle={true} />

      <Education steps={educationStepsData} />

      {/* <ArticleNote items={noteData} isArticle={false} /> */}
    </>
  )
}

