import * as React from 'react';
import * as redux from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import './AllAppsPage.css';

import JdenticonPlaceHolder from '../components/JdenticonFiller';

import store from '../store'
import { fetchPOST } from '../utils'
import { ReduxAction } from '../../../types';

import { Hash } from '../../../holochain';

type AllAppsPageProps = {
  allApps: Map<Hash,{ title: string, icon: string }>,
  currentAgent: {agent: {Hash: Hash, Name: string}},
  fetchAgent: () => void,
  fetchAllApps: () => void,
  fetchAppDetails: () => void
}

class AllAppsPage extends React.Component<AllAppsPageProps, {}> {
  public componentDidMount() {
    this.props.fetchAgent();
    setInterval(this.props.fetchAllApps, 500);
  }

  public handleSelectApp = () => {
    // this.props.fetchAppDetails();
  }

  public render() {
    const greeting: string = "Welcome to your HCHC App Store";
    if (!this.props.currentAgent) {
      return <div/>
    }
    else {
      const { agent } = this.props.currentAgent;
      return (
          <div style={{ textAlign: 'center' }}>
            <h1 className="all-apps-header">{ greeting }</h1>
            <hr/>
            <Link to={`/appstore/${agent.Hash}`}>
            <div className="appstore-app-icons" onClick={this.handleSelectApp}>
              {/* // BELOW> : The App Icon should instead pass the App Hash into the hash prop,... (not the whoami Hash). */}
              <JdenticonPlaceHolder className="jdenticon" size={150} hash={ agent.Hash } />
            </div>
            </Link>
            {/* // BELOW> : This should instead be the App Hash (... not the whoami Hash). */}
            <Link to={`/appstore/${agent.Hash}`}>
            <div className="appstore-app-icons" onClick={this.handleSelectApp}>
              {/* // BELOW> : The App Icon should instead pass the App Hash into the hash prop,... (not the whoami Hash). */}
              <JdenticonPlaceHolder className="jdenticon" size={150} hash={ agent.Hash } />
            </div>
          </Link>

        </div>
      );
    }
  }
}


const mapStateToProps = ({ allApps, currentAgent }) => ({ allApps, currentAgent });
const mapDispatchToProps = dispatch => ({
  fetchAgent: () => {
    fetchPOST('/fn/whoami/getAgent')
      .then(agent => {
        dispatch({ type: 'FETCH_AGENT', agent })
      })
  },
  fetchAppDetails: () => {
    fetchPOST('/fn/applications/getAppHash')
      .then( appHash => {
        dispatch({ type: 'VIEW_APP', appHash })
      })
  },
  fetchAllApps: () => dispatch({ type: 'FETCH_ALL_APPS' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllAppsPage);

// constructor(props) {
//   super(props);
//   this.state = {
//     allAppCategories: [],
//     selectedApp: null,
//   };
// }

  // public appSearch = (appSearchTerm) => {
  //   JSONFETCH ({url: URL_BASE_HERE, term: appSearchTerm}, (data) => {
  //       console.log(data);
  //       this.setState({
  //           allAppCategories: data,
  //           selectedApp: data[0]
  //       });
  //     });
  // }

// const searchTerm = _.debounce(term => {this.appSearch(term)}, 300);

{/* <a className="flex-sm-fill text-sm-center nav-link" href="#"> */}
  {/* <SearchBar onSearchTermUpdate={ searchTerm } /> */}
// </a>
