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
import withSplashScreen from '../components/main/withSplashScreen.tsx';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Box sx={{ minHeight: '80vh', bgcolor: 'background.default' }}>
        <Container maxWidth="lg" sx={{ pt: 4, pb: 4 }}>
          <Routes>
            <Route path="/skills" element={<Skills />} />
            <Route path="/" element={<Main />} />
            <Route path="/articles" element={<ArticleNote isArticle={true} />} />
            <Route path="/projects" element={<Projects />} />

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
        </Container>
      </Box>
      <Footer />
    </BrowserRouter>
  );
}

export default withSplashScreen(App);
