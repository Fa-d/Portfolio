import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../components/main/Main.tsx';
import Header from '../components/header/Header.tsx';
import "./App.css";
import withSplashScreen from "../components/splash/withSplashScreen.tsx";
import Footer from '../components/footer/Footer.tsx';
import Projects from '../components/projects/Projects.tsx';
// import { allProjects } from '../data/ProjectData.tsx'; // Removed
import ArticleNote from '../components/articles/ArticleNote.tsx';
// import { articleData } from '../data/ArticleNote.tsx'; // Removed
import Skills from '../components/skills/Skills.tsx';
// import { skillsList } from '../data/SkillsData.tsx'; // Removed

import AdminLogin from '../components/admin/AdminLogin.tsx';
import AdminDashboard from '../components/admin/AdminDashboard.tsx';
import ProtectedRoute from '../components/admin/ProtectedRoute.tsx';
import ManageArticles from '../components/admin/ManageArticles.tsx';
import ManageNotes from '../components/admin/ManageNotes.tsx';
import ManageCareer from '../components/admin/ManageCareer.tsx';
import ManageEducation from '../components/admin/ManageEducation.tsx';
import ManageProjects from '../components/admin/ManageProjects.tsx';
import ManageSkills from '../components/admin/ManageSkills.tsx';
import ManageStrings from '../components/admin/ManageStrings.tsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header /> {/* Consider conditional rendering for admin section if needed */}
        <Routes>
          {/* Public Routes - Data sources will be updated in Step 6 */}
          <Route path="/skills" element={<Skills />} />
          {/* Removed items prop, component now fetches its own data */}
          <Route path="/" element={<Main />} />
          <Route path="/articles" element={<ArticleNote isArticle={true} />} />
          {/* Removed items prop, component now fetches its own data */}
          <Route path="/projects" element={<Projects />} />
          {/* Removed items prop, component now fetches its own data */}

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route element={<ProtectedRoute />}> {/* Protects all nested routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />}> {/* AdminDashboard has an <Outlet> */}
              <Route index element={<div>Please select a section to manage from the sidebar.</div>} />
              <Route path="articles" element={<ManageArticles />} />
              <Route path="notes" element={<ManageNotes />} />
              <Route path="career" element={<ManageCareer />} />
              <Route path="education" element={<ManageEducation />} />
              <Route path="projects" element={<ManageProjects />} />
              <Route path="skills" element={<ManageSkills />} />
              <Route path="strings" element={<ManageStrings />} />
            </Route>
          </Route>
        </Routes>
        <Footer /> {/* Consider conditional rendering for admin section if needed */}
      </BrowserRouter>
    </>
  );
}

export default withSplashScreen(App);
