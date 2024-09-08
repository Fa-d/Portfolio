import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../components/main/Main.tsx';
import Header from '../components/header/Header.tsx';
import "./App.css"
import withSplashScreen from "../components/splash/withSplashScreen.tsx";
import Footer from '../components/footer/Footer.tsx';
import Projects from '../components/projects/Projects.tsx';
import { allProjects } from '../data/ProjectData.tsx';
import ArticleNote from '../components/articles/ArticleNote.tsx';
import { articleData } from '../data/ArticleNote.tsx';
import Skills from '../components/skills/Skills.tsx';
import { skillsList } from '../data/SkillsData.tsx';


function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/skills" element={<Skills items={skillsList} />} />
          <Route path="/" element={<Main />} />
          <Route path="/articles" element={<ArticleNote items={articleData} isArticle={true} />} />
          <Route path="/projects" element={<Projects items={allProjects} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>

  );
}

export default withSplashScreen(App);
