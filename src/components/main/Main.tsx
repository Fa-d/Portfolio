import About from "./About";
import Career from "./Career";
import Education from "./Education";
import Projects from "./projects/Projects";
import Products from "./products/Products";
import ArticleNote from "./ArticleNote";
import Skills from "./Skills";
import OpenSourceContributions from "./OpenSourceContributions";
import Contact from "./Contact";

export default function Main() {
  return (
    <>
      <About />
      <Skills />
      <Products />
      <Projects />
      <OpenSourceContributions />
      <Career />
      <Education />
      <ArticleNote isArticle={true} />
      <Contact />
    </>
  );
}
