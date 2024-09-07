import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../components/main/Main.tsx';
import Header from '../components/header/Header.tsx';
import "./App.css"
import withSplashScreen from "../components/splash/withSplashScreen.tsx";
import Footer from '../components/footer/Footer.tsx';
import Projects from '../components/projects/Projects.tsx';
import { allProjects } from '../data/ProjectData.tsx';


function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/skills" element={<Main />} />
          <Route path="/" element={<Main />} />
          <Route path="/projects" element={ <Projects items={allProjects} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>

  );
}

export default withSplashScreen(App);
