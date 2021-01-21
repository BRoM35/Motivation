import logo from './logo.svg';
import './App.css';
import faceIcon from './image/faceIcon.svg';
import './components/Motivation/Profile.css'
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from './components/NavBar';
import Profile from './components/Motivation/Profile';
import Releases from './components/Releases/Releases';
import Incidents from './components/Incidents/Incidents';
import Sprints from './components/Sprints/Sprints';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Switch>
        <Route path="/" exact component={Profile} />
        <Route path="/release" exact component={Releases} />
        <Route path="/incidents" exact component={Incidents} />
        <Route path="/sprints" exact component={Sprints} />
      </Switch>
    </div>
  );
}

export default App;
