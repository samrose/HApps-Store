import * as React from 'react';
import * as redux from 'redux';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import MainNav from "./components/MainNav";
import SplashScreen from "./pages/SplashScreen";
import AllAppsPage from "./pages/AllAppsPage";
import DetailPage from "./pages/DetailPage";
import Profile from "./pages/Profile";
import NoMatch from "./pages/NoMatch";

const exact: boolean = true;
const App = () =>
  <Router>
    <div>
      <MainNav/>
      <Switch>
        <Route exact={exact} path="/" component={SplashScreen} />
        <Route exact={exact} path="/apps" component={AllAppsPage} />
        <Route exact={exact} path="/app/:appHash" component={DetailPage} />
        <Route exact={exact} path="/profile/:userHash" component={Profile} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>;

export default App;
