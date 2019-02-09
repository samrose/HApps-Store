import * as React from 'react';
import * as redux from 'redux';
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import './AllAppsPage.css'

import store from '../store'
import { GetAllApps, Whoami } from '../actions'

import { Hash } from '../../../holochain';

import AppCard from '../components/AppCard';

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
      return <div> Not currently connected to running Holochain instance! </div>
    }
    else {
      const { agent } = this.props.currentAgent;
      return (
        <div>
          <div style={{ textAlign: 'center' }}>
              <h1 className="all-apps-header">{ greeting }</h1>
              <hr/>
          </div>
          <Grid container={true} justify="center" spacing={16}>
            {[1,2,3,4,5].map(() =>
              (<Grid item={true}>
                <AppCard/>
              </Grid>)
            )}
          </Grid>
        </div>
      );
    }
  }
}


const mapStateToProps = ({ allApps, currentAgent }) => ({ allApps, currentAgent });
const mapDispatchToProps = dispatch => ({
  fetchAgent: () => dispatch(Whoami.create({})),
  fetchAllApps: () => dispatch(GetAllApps.create({})),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllAppsPage);
