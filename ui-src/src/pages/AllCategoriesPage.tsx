import * as React from 'react';
import * as redux from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import store from '../store'
import { fetchPOST } from '../utils'
import { ReduxAction } from '../../../types';
import { Hash } from '../../../holochain';
// import * as hc from "../../../holochain";

import { Map } from 'immutable';

import './AllAppsPage.css';
import JdenticonPlaceHolder from '../components/JdenticonFiller';
import MainNav from "../components/MainNav";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'reactstrap';


type AllCategoriesPageState = {
  categories: Array<any>,
  errorMessage: string | null,
}

type AllCategoriesPageProps = {
  AllApps: Array<{Entry:{}, Hash: Hash}>,
  currentAgent: {agent: {Hash: Hash, Name: string}},
  appsByCategory: Array<{Hash,string}>,
  // appsByCategory: Array<{category: string, appTitle: string, icon: string }>
  fetchAgent: () => void,
  fetchAllApps: () => void,
  fetchAppDetails: (appHash) => void,
  getappsByCategory: (cateogry) => void,
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
    this.props.fetchAllApps();
  }

  public handleSelectApp = e => {
    const currentApphash = e.target.className
    JSON.stringify(currentApphash);
    console.log("currentApphash (hashVAR) for App Detail Call", currentApphash);
    this.props.fetchAppDetails(currentApphash);
  }


  public render() {
    if (!this.props.currentAgent) {
      return <div>
        <h4 style={{ textAlign: 'center' }} className="loading-text">Fetching all app categories...</h4>
      </div>
    }
    console.log("agent: ", this.props.currentAgent);
    const greeting: string = "Check Out the Categories Below";


    const categoriesDisplay = this.state.categories.map((category, i) => {
        i=i+1;
        const parsedCategory = { category };
        JSON.stringify(parsedCategory);
        // console.log("parsedCategory",parsedCategory );
        fetchPOST('/fn/categories/getAppsByCategories', parsedCategory)
          .then(response => {
            console.log("getAppsByCategories() response : ", response);
            if (!response.error) {
              const apps: Array<any> = [response];
              apps.forEach = (app) => {
                 let appHash: string = "";
                 const {AllApps} = this.props;
                 AllApps.forEach((appDetail) => {
                    if (appDetail.Entry === app ) {
                      appHash = appDetail.Hash;
                    }
                 })
                 return (
                  <Row key={i+category} className="currentCategory-container">
                    <Col>
                      <h2>{category}</h2>
                      <hr/>
                      <Link to={`/appstore/${category}/${appHash}`} key={appHash}>
                        <div className={appHash} onClick={this.handleSelectApp}>
                          <JdenticonPlaceHolder className="jdenticon" size={150} hash={ appHash } />
                          <h4 style={{ textAlign: 'center' }}>{app}</h4>
                        </div>
                      </Link>
                    </Col>
                  </Row>
              )}
            }
            else {
                this.setState({errorMessage: "No apps exist for this category."});
                return (
                  <Row key={i+category} className="category-container">
                    <Col>
                      <h2>{category}</h2>
                      <hr/>
                      <h4>{this.state.errorMessage}</h4>
                    </Col>
                  </Row>
                )
            }
        });
    });

    return (
      <div>
        <MainNav/>
        <Container style={{ textAlign: 'center' }}>
            <h1 className="all-apps-header">{ greeting }</h1>
            <hr/>
            {categoriesDisplay}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({ AllApps, currentAgent, appsByCategory }) => ({ AllApps, currentAgent, appsByCategory });
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
      })
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AllCategoriesPage);
