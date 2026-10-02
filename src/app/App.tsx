import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Main from "../components/main/Main.tsx";
import Header from "../components/main/Header.tsx";
import Footer from "../components/main/Footer.tsx";
import ArticleNote from "../components/main/ArticleNote.tsx";
import Skills from "../components/main/Skills.tsx";
import Projects from "../components/main/projects/Projects.tsx";
import Products from "../components/main/products/Products.tsx";
import Career from "../components/main/Career.tsx";
import OpenSourceContributions from "../components/main/OpenSourceContributions.tsx";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

export default function AppContent() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Box component="main" sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/skills" element={<Skills />} />
          <Route
            path="/articles"
            element={<ArticleNote isArticle={true} />}
          />
          <Route path="/projects" element={<Projects />} />
          <Route path="/products" element={<Products />} />
          <Route path="/opensource" element={<OpenSourceContributions />} />
          <Route path="/experience" element={<Career />} />
          <Route path="*" element={<Main />} />
        </Routes>
      </Box>
      <Footer />
    </BrowserRouter>
  );
}
