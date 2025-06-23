import About from '../about/About';
import CareerSteps from '../experience/Experience';
import Education from '../education/Education';
import ReactGA from 'react-ga4';
import Projects from '../projects/Projects';
import ArticleNote from '../articles/ArticleNote';
import Skills from '../skills/Skills';

// All direct data imports from '../../data/...' are now removed


export default function Main() {
  ReactGA.initialize('YOUR_TRACKING_ID');

  return (
    <>
      <About />
 
      <Skills /> {/* No more 'items' prop */}
 
      <Projects /> {/* No more 'items' prop */}
   
      <CareerSteps /> {/* No more 'steps' prop */}

       {/* The /articles route in App.tsx handles the main "Articles" display. */}
       {/* This instance in Main.tsx is for "Notes" or other purposes. */}
       <ArticleNote isArticle={false} /> {/* Fetches notes.json */}

       <Education /> {/* No more 'steps' prop */}

      {/* The above line replaces the old articleData instance and the commented noteData one. */}
    </>
  )
}

