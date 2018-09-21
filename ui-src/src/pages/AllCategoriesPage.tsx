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

import './AllCategoriesPage.css';
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
  currentCategory: string,
  currentAppHash: string,
  fetchAgent: () => void,
  fetchAllApps: () => void,
  fetchAppDetails: (appHash) => void,
  getappsByCategory: (cateogry) => void,
  registerCurrentAppHash: (appHash) => void,
  appsByCategory: Array<{Hash,string}>,
  // appsByCategory: Array<{category: string, appTitle: string, icon: string }>
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

    // Example:
    const hashVAR = {app_hash: "QmU3yxTLW3st9h3TmTBHimmTu32NofqMsX77og82dVEbSE"};
    JSON.stringify(hashVAR);
    console.log("hashVAR", hashVAR);
    fetchPOST('/fn/happs/getApp', hashVAR)
      .then(appDetails => {
        console.log("App Details", appDetails);
    });
  }

  public renderApps = (apps, category) => {
    console.log("renderApps apps param", apps);
    console.log("this.props.currentCategory", this.props.currentCategory);
    apps.map(app => {
      return (
        <Link to={`/appstore/${category}/${app.Hash}`} key={app.Hash} onClick={this.handleSelectApp}>
          <div className={app.Hash}>
            {/* className for above: appstore-app-icons */}
            <JdenticonPlaceHolder className="jdenticon" size={150} hash={ app.Hash } />
            <h4 style={{ textAlign: 'center' }}>{app.Title}</h4>
          </div>
        </Link>
      )
    })
  }

  public handleSelectApp = e => {
    const currentApp = e.target.key
    JSON.stringify(currentApp);
    console.log("currentApp", currentApp);
    this.props.registerCurrentAppHash(currentApp);
    console.log("this.props.currentAppHash",this.props.currentAppHash);
    this.props.fetchAppDetails(currentApp);
    // fetchPOST('/fn/happs/getApp', currentApp)
    //   .then(appDetails => {
    //     console.log("App Details", appDetails);
    // });
  }


  public render() {
    if (!this.props.currentAgent) {
      return <div>
        <h4 style={{ textAlign: 'center', marginTop: '20%' }} className="loading-text">Fetching all app categories...</h4>
      </div>
    }

    console.log("agent: ", this.props.currentAgent);
    const greeting: string = "All Categories";

    const categoriesDisplay = this.state.categories.map((category, i) => {
        i=i+1;
        let apps: Array<any> = [];
        const parsedCategory = {category};
        JSON.stringify(parsedCategory);
        console.log("parsedCategory",parsedCategory );

        const renderCategoryApps = () => {
          fetchPOST('/fn/categories/getAppsByCategories', parsedCategory)
            .then(response => {
              console.log("getAppsByCategories response : ", response);
              if (!response.error) {
                apps = response;
                this.renderApps(apps, category);
              }  else {
                this.setState({errorMessage: "Sorry there are no apps yet for this category."});
              }
            });
        }
        return (
          <Row key={i+category} className="category-container">
            <Col className="category-header-name">
              <h3>{category}</h3>
              <hr/>
              {renderCategoryApps()}
              <h4 className="no-app-message">{this.state.errorMessage}</h4>
            </Col>
          </Row>
      )
    });

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

// const zippyHash = hc.makeHash("App.Key.Hash", {Name: "Zippy"});
// const apphash = hc.makeHash("appParam", {uuid:"1234-612-161341", title:"Clutter", author:{Hash:zippyHash,Name:"Zippy"}, description:"A Holochain Version of Twiter", thumbnail:"/imp2.jpg"});
// console.log("appHash : ", apphash);