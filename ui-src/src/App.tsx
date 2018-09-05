import * as React from 'react';
import * as redux from 'redux';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Nav from "./components/Nav";

import ScaffoldRef from "./pages/ReferencePage";

import AllApps from "./pages/AllAppsPage";
import Detail from "./pages/DetailPage";
import UploadNewApp from "./pages/UploadNewApp";
import NoMatch from "./pages/NoMatch";

const exact: boolean = true;
const App = () =>
  <Router>
    <div>
      <Nav/>
      <Switch>
        <Route exact={exact} path="/" component={AllApps} />
        <Route exact={exact} path="/appstore" component={AllApps} />
        <Route exact={exact} path="/appstore/:id" component={Detail} />
        <Route exact={exact} path="/produceapp" component={UploadNewApp} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>;

export default App;
