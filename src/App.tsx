import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Main from './components/main/Main.tsx';
import ScrollToTop from './utils/ScrollToTop.tsx'
function App() {
  return (
    <div className="app">
      <Router>
        <ScrollToTop />
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/blog" exact component={Main} />
          <Route path="/projects" exact component={Main} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
