import * as React from 'react';
import * as redux from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import './AllAppsPage.css';

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
    this.props.fetchAllApps();
  }

  public handleSelectApp = () => {
    // this.props.fetchAppDetails();
    // navigate to details page
  }

  public render() {
    const greeting: string = "All listed hApps";
    if (!this.props.currentAgent) {
      return <div/>
    }
    else {
      const { agent } = this.props.currentAgent;
      return (
        <div>
          <div style={{ textAlign: 'center' }}>
              <h1 className="all-apps-header">{ greeting }</h1>
              <hr/>
          </div>
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
