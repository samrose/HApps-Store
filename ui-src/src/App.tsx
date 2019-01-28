import * as React from 'react';
import * as redux from 'redux';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import SplashNav from "./components/SplashNav";
import SplashScreen from "./pages/SplashScreen";
import AllCategories from "./pages/AllCategoriesPage";
import Category from "./pages/CategoryPage";
import Detail from "./pages/DetailPage";
import Profile from "./pages/Profile";
import CreateReviewForm from "./components/CreateReviewForm";
import NoMatch from "./pages/NoMatch";

const exact: boolean = true;
const App = () =>
  <Router>
    <div>
      {/* <SplashNav/> */}
      <Switch>
        <Route exact={exact} path="/" component={SplashScreen} />
        <Route exact={exact} path="/appstore" component={SplashScreen} />
        <Route exact={exact} path="/appstore/categories" component={AllCategories} />
        <Route exact={exact} path="/appstore/cat/:category" component={Category} />
        <Route exact={exact} path="/appstore/cat/:category/id/:id" component={Detail} />
        <Route exact={exact} path="/appstore/cat/:category/id/:id/makereview" component={CreateReviewForm} />
        <Route exact={exact} path="/profile/:userHash" component={Profile} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>;

export default App;
