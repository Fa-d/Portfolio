import About from '../about/About'
import CareerSteps from '../experience/Experience'
interface ExperienceProps {
  date: string;
  role: string;
  company: string;
  description: string;
  skills: string[];
  links?: string[];
}
export default function Main() {
  const kolpolok: ExperienceProps = {
    date: 'May 2021- Present',
    role: 'Software Engineer (III)',
    company: 'Kolpolok Limited',
    description: "Responsibilities include publishing and maintaining application binaries, Collaborating with international clients, gathering requirements and building, refactoring, updating necessary changes, writing documentations for the development of mobile and android TV apps. ",
    skills: [
      'Multi-module',
      'Compose',
      'Datastore',
      'Ktor',
      'Flow',
      'Coroutine'
    ],
  }
  const ajkerDeal: ExperienceProps = {
    date: 'Jul 2021 - Apr 2022',
    role: 'Junior Software Engineer',
    company: 'AjkerDeal.Com',
    description: "Responsible for translating logistics, E-commerce business requirements into android applications.",
    skills: [
      'REST APIs',
      'Java',
      'Kotlin',
      'Andorid'
    ],
  }
  const careerStepsData = [kolpolok, ajkerDeal];
  return (
    <>
      <About />
      <CareerSteps steps={careerStepsData} />
    </>
  )
}

