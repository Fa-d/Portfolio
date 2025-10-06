import About from "./About";
import CareerSteps from "./Experience";
import Education from "./Education";
import ReactGA from "react-ga4";
import Projects from "./projects/Projects";
import ArticleNote from "./ArticleNote";
import Skills from "./Skills";
import OpenSourceContributions from "./OpenSourceContributions";

// All direct data imports from '../../data/...' are now removed

export default function Main() {
  ReactGA.initialize("YOUR_TRACKING_ID");

  return (
    <>
      <About />
      <Skills />
      <Projects />
      <OpenSourceContributions />
      <CareerSteps />
      <Education />
      <ArticleNote isArticle={true} />
    </>
  );
}
