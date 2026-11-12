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
import routeMeta from "./routeMeta.json";

type RouteInfo = { title: string; description: string };
const ROUTES: Record<string, RouteInfo> = routeMeta.routes;

function setMeta(selector: string, attr: "content" | "href", value: string) {
  document.head.querySelector(selector)?.setAttribute(attr, value);
}

// Keeps <title>, description, canonical and Open Graph tags in step with the
// route during client-side navigation. The same values are baked into
// dist/<route>.html at build time by scripts/prerender-routes.mjs.
function RouteMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
    const known = path in ROUTES;
    const meta = ROUTES[known ? path : "/"];
    const url = `${routeMeta.siteUrl}${known && path !== "/" ? path : "/"}`;
    document.title = meta.title;
    setMeta('meta[name="description"]', "content", meta.description);
    setMeta('meta[property="og:title"]', "content", meta.title);
    setMeta('meta[property="og:description"]', "content", meta.description);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('link[rel="canonical"]', "href", url);
  }, [pathname]);

  return null;
}

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
      <RouteMeta />
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
