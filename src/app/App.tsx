import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../components/main/Main.tsx';
import Header from '../components/main/Header.tsx';
import Footer from '../components/main/Footer.tsx';
import ArticleNote from '../components/main/ArticleNote.tsx';
import Skills from '../components/main/Skills.tsx';

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

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Projects from '../components/main/projects/Projects.tsx';
import { useState, useEffect } from 'react';

export default function AppContent() {
  const [setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch('/assets/connecting.json')
      .then(res => res.json())
      .then(setAnimationData);
  }, []);

  // if (!animationData) {
  //   return (
  //     <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
  //       <Lottie
  //         loop
  //         play
  //         animationData={animationData}
  //         style={{ width: 180, height: 180 }}
  //       />
  //     </Box>
  //   );
  // }

  return (
    <BrowserRouter>
      <Header />
      <Box sx={{ minHeight: '80vh', bgcolor: 'background.default' }}>
        <Container maxWidth={false} disableGutters>
          <Routes>
            <Route path="/skills" element={<Skills />} />
            <Route path="/" element={<Main />} />
            <Route path="/articles" element={<ArticleNote isArticle={true} />} />
            <Route path="/projects" element={<Projects />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />}>
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
        </Container>
      </Box>
      <Footer />
    </BrowserRouter>
  );
}


