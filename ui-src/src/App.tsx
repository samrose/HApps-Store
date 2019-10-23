import * as React from 'react';
import * as redux from 'redux';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import MainNav from "./components/MainNav"
import SplashScreen from "./pages/SplashScreen"
import AllAppsPage from "./pages/AllAppsPage"
import NoMatch from "./pages/NoMatch"
import NewApp from "./pages/NewApp"

const exact: boolean = true;
const App = () =>
  <Router>
    <div>
      <MainNav/>
      <Switch>
        <Route exact={exact} path="/" component={AllAppsPage} />
        <Route exact={exact} path="/apps" component={AllAppsPage} />
        <Route exact={exact} path="/newapp" component={NewApp} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>;

export default App;
