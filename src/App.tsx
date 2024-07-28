import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './components/main/Main.tsx';
import Header from './components/header/Header.tsx';
import "./App.css"


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
    </>

  );
}

export default App;
