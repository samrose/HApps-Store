import * as React from 'react';
import * as redux from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import store from '../store'
import { fetchPOST } from '../utils'
import { ReduxAction, AppDetailState } from '../../../types';
import { Hash } from '../../../holochain';
import { Map } from 'immutable';

import './AllCategoriesPage.css';
import JdenticonPlaceHolder from '../components/JdenticonFiller';
import MainNav from "../components/MainNav";
import { Container, Row, Col } from 'reactstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';


type AllCategoriesPageState = {
  categories: Array<any>,
  errorMessage: string | null,
}

type AllCategoriesPageProps = {
  AllApps: Array<{Entry:{}, Hash: Hash}>,
  currentAgent: {agent: {Hash: Hash, Name: string}},
  currentCategory: string,
  currentAppHash: string,
  fetchAgent: () => void,
  fetchAllApps: () => void,
  fetchAppDetails: (appHash) => void,
  getappsByCategory: (cateogry) => void,
  registerCurrentAppHash: (appHash) => void,
  appsByCategory: Array<{Entry: AppDetailState, Hash: Hash}>,
}

class AllCategoriesPage extends React.Component<AllCategoriesPageProps, AllCategoriesPageState> {
  constructor(props) {
    super(props);
    this.state = {
      categories: ["Games", "Admin Tools", "Dev Tools", "Top Downloads", "Categories",
       "Movies", "Educational", "Finance", "Leisure", "Music"],
       errorMessage: null,
    };
  }


public componentDidMount() {
    this.props.fetchAgent();
  }


  public handleSelectApp = e => {
    const currentApp = e.target.key
    JSON.stringify(currentApp);
    console.log("currentApp", currentApp);
    this.props.registerCurrentAppHash(currentApp);
    console.log("this.props.currentAppHash",this.props.currentAppHash);
    this.props.fetchAppDetails(currentApp);
  }


  public renderApps = (apps, category) => {
    return apps.map(app => {
        // TODO: Render Apps
    })
  }

  public renderCategoryApps = (parsedCategory) => {
    fetchPOST('/fn/categories/getAppsByCategories', parsedCategory)
    .then(response => {
      console.log("getAppsByCategories response : ", response);
      if (!response.error) {
        const apps = response;
        console.log("CHECKING THIS OUT: ",this.renderApps(apps, parsedCategory))
        this.renderApps(apps, parsedCategory);
      }  else {
        // return error = "Sorry there are no apps yet for this category.";
        this.setState({errorMessage: "Sorry there are no apps yet for this category."});
      }
    });
  }

  public render() {
    if (!this.props.currentAgent) {
      return <div>
        <h4 style={{ textAlign: 'center', marginTop: '20%' }} className="loading-text">Fetching all app categories...</h4>
      </div>
    }
    console.log("agent: ", this.props.currentAgent);

    const greeting: string = "All Categories";
    // let error: string;

    const categoriesDisplay = this.state.categories.map((category, i) => {
      const parsedCategory = {category};
      // JSON.stringify(parsedCategory);
      // let apps: Array<any> = [];
      i=i+1;
      console.log("parsedCategory"+i+" : ",parsedCategory );
      const categoryApps = this.renderCategoryApps(parsedCategory);
      console.log("returned from renderCategoryApps : ",categoryApps);
      return (
        <Row key={i+category} className="category-container">
          <Col className="category-header-name">
            <h3>{category}</h3>
            <hr/>
            {categoryApps}
            <h4 className="no-app-message">{this.state.errorMessage}</h4>
          </Col>
        </Row>
      )
    });

    console.log("CATEGORIES DISPLAY: ",categoriesDisplay);
    return (
      <div>
        <MainNav/>
        <Container style={{ textAlign: 'center' }}>
            <h1 className="all-categories-header">{ greeting }</h1>
            <hr/>
            <h2 className="subtitle">Browse the list of apps below</h2>
            {categoriesDisplay}
        </Container>
      </div>
    );
  }
}
const mapStateToProps = ({ AllApps, currentAgent, appsByCategory, currentCategory, currentAppHash }) => ({ AllApps, currentAgent, appsByCategory, currentCategory, currentAppHash });
const mapDispatchToProps = dispatch => ({
  fetchAgent: () => {
    fetchPOST('/fn/whoami/getAgent')
      .then(agent => {
        dispatch({ type: 'FETCH_AGENT', agent })
      })
  },
  // >>> The response returned from the fetchPOST is the  following obejct:
  //  {"Entry": e.Entry,"Hash": e.Hash}
  fetchAllApps: () => {
    fetchPOST('/fn/happs/getAllApps')
      .then(allApps => {
        dispatch({ type: 'FETCH_ALL_APPS', allApps })
    })
},
  fetchAppDetails: (appHash) => {
    fetchPOST('/fn/happs/getApp', appHash)
      .then( appDetails => {
        dispatch({ type: 'VIEW_APP', appDetails })
      })
  },
  getappsByCategory: (category) => {
    fetchPOST('/fn/categories/getAppsByCategories', category)
      .then( appsByCurrentCategory => {
        dispatch({ type: 'FETCH_APPS_BY_CATEGORY', category, appsByCurrentCategory })
        console.log("---> ", appsByCurrentCategory);
      })
  },
  registerCategoryType: (category) => {
    dispatch({ type: 'REGISTER_CATEGORY', category })
  },
  registerCurrentAppHash: (appHash) => {
    dispatch({ type: 'REGISTER_APP_HASH', appHash })
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(AllCategoriesPage);
