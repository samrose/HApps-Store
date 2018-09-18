import * as React from 'react';
import * as redux from 'redux';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Nav from "./components/Nav";

import ScaffoldRef from "./pages/ReferencePage";

import SplashScreen from "./pages/SplashScreen";
// import AllApps from "./pages/AllAppsPage";
import AllCategories from "./pages/AllCategoriesPage";
import Category from "./pages/CategoryPage";
import Detail from "./pages/DetailPage";
import UploadNewApp from "./pages/UploadNewApp";
import Profile from "./pages/Profile";
import NoMatch from "./pages/NoMatch";

const exact: boolean = true;
const App = () =>
  <Router>
    <div>
      <Nav/>
      <Switch>
        <Route exact={exact} path="/" component={SplashScreen} />
        <Route exact={exact} path="/appstore" component={SplashScreen} />
        <Route exact={exact} path="/appstore/Categories" component={AllCategories} />
        <Route exact={exact} path="/appstore/:category" component={Category} />
        <Route exact={exact} path="/appstore/:category/:id" component={Detail} />
        <Route exact={exact} path="/profile/:userHash" component={Profile} />
        <Route exact={exact} path="/produceapp" component={UploadNewApp} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>;

export default App;
