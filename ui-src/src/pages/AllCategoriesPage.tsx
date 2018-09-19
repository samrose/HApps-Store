import * as React from 'react';
import * as redux from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import store from '../store'
import { fetchPOST } from '../utils'
import { ReduxAction } from '../../../types';
import { Hash } from '../../../holochain';
import { Map } from 'immutable';

import './AllAppsPage.css';
import JdenticonPlaceHolder from '../components/JdenticonFiller';
import MainNav from "../components/MainNav";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'reactstrap';


type AllCategoriesPageState = {
  categories: Array<any>,
}

type AllCategoriesPageProps = {
  allApps: Map<Hash,{ title: string, icon: string }>,
  currentAgent: {agent: {Hash: Hash, Name: string}},
  AppsByCategory: Array<{category: string, appTitle: string, icon: string }>
  fetchAgent: () => void,
  fetchAllApps: () => void,
  fetchAppDetails: (appHash) => void,
  getAppsByCategory: (cateogry) => void,
}

class AllCategoriesPage extends React.Component<AllCategoriesPageProps, AllCategoriesPageState> {
  constructor(props) {
    super(props);
    this.state = {
      categories: ["Games", "Admin Tools", "Dev Tools", "Top Downloads", "Categories",
       "Movies", "Educational", "Finance", "Leisure", "Music"],
    };
  }

  public componentDidMount() {
    this.props.fetchAgent();
    this.props.fetchAllApps();
  }

  public renderApps = (apps, category) => {
    apps.forEach = (app) => {
      return (
        <Link to={`/appstore/${category}/${app.Hash}`} key={app.Hash}>
          <div className={app.Hash} onClick={this.handleSelectApp}>
            {/* appstore-app-icons */}
            <JdenticonPlaceHolder className="jdenticon" size={150} hash={ app.Hash } />
            <h4 style={{ textAlign: 'center' }}>{app.Title}</h4>
          </div>
        </Link>
      )
    }
  }
  public handleSelectApp = e => {
    const currentApp = e.target.className
    this.props.fetchAppDetails(currentApp);
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
        let apps: Array<any> = [];
        const renderCategoryApps = () => {
          fetchPOST('/fn/happs/getAppsByCategory', category)
            .then(response => {
              if (!response.errorMessage) {
                apps = this.props.AppsByCategory;
                this.renderApps(apps, category);
            }});
        }
        return (
          <Row key={i+category} className="category-container">
            <Col>
              <h2>{category}</h2>
              <hr/>
              {/* {renderCategoryApps()} */}
            </Col>
          </Row>
      )
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

const mapStateToProps = ({ allApps, currentAgent, AppsByCategory }) => ({ allApps, currentAgent, AppsByCategory });
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
      .then(response => {
        dispatch({ type: 'FETCH_ALL_APPS', response })
    })
},
  fetchAppDetails: (appHash) => {
    fetchPOST('/fn/happs/getApp', appHash)
      .then( appDetails => {
        dispatch({ type: 'VIEW_APP', appDetails })
      })
  },
  getAppsByCategory: (category) => {
    fetchPOST('/fn/happs/getAppsByCategory', category)
      .then( AppsByCategory => {
        dispatch({ type: 'GET_APP_BY_CATEGORY', AppsByCategory })
      })
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AllCategoriesPage);
