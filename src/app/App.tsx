import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../components/main/Main.tsx';
import Header from '../components/header/Header.tsx';
import "./App.css"
import withSplashScreen from "../components/splash/withSplashScreen.tsx";
import Footer from '../components/footer/Footer.tsx';

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Main />}
          />
          <Route
            path="/project"
            element={<Main />}
          />
        </Routes>

      </BrowserRouter>
      <Footer />
    </>

  );
}

export default withSplashScreen(App);
