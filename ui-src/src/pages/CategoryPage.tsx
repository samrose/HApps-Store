import * as React from 'react';
import * as redux from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import MainNav from "../components/MainNav";
import './CategoryPage.css';

import JdenticonPlaceHolder from '../components/JdenticonFiller';

import store from '../store'
import { fetchPOST } from '../utils'
import { ReduxAction } from '../../../types';

import { Hash } from '../../../holochain';

type CategoryPageProps = {
  AllApps: Array<{Entry:{
     author: {Hash:Hash, Name:string},
     thumbnail: string,
     description: HTMLInputElement | string,
     title: string,
     uuid: string,}
  ,Hash: Hash}>,
  currentAgent: {agent: {Hash: Hash, Name: string}},
  currentCategory: string,
  currentAppHash: string,
  appsByCategory: Array<{Hash,string}>,
  fetchAgent: () => void,
  fetchAllApps: () => void,
  fetchAppDetails: () => void,
  registerCurrentAppHash: (appHash) => void,
  getappsByCategory: (cateogry) => void,
}

class CategoryPage extends React.Component <CategoryPageProps, {}> {
  public componentDidMount() {
    this.props.fetchAgent();
    setInterval(this.props.fetchAllApps(), 500);
  }

  public handleSelectApp = () => {
    // this.props.fetchAppDetails();
  }

  public render() {
    const greeting: string = "Category Page";
    if (!this.props.currentAgent || !this.props.AllApps) {
      return <div>
        <h4 className="loading-text">Loading...</h4>
      </div>
    }

    console.log("this.props.currentCategory", this.props.currentCategory);
    const { agent } = this.props.currentAgent;
    const { currentCategory, AllApps} = this.props;

    const renderApps = AllApps.map(app => {
      console.log("this.props.AllApps app .Entry.title", app.Entry.title);
      return (
        <Link to={`/appstore/${`Admin Tools`}/${app.Hash}`} key={app.Hash}>
        <div className="appstore-app-icons" onClick={this.handleSelectApp}>
          <JdenticonPlaceHolder className="jdenticon" size={150} hash={ app.Hash } />
          <h4>{app.Entry.title}</h4>
        </div>
        </Link>
      )
    })

    return (
      <div>
        <MainNav/>
        <div style={{ textAlign: 'center' }}>
          <h1 className="category-header">{ greeting }</h1>
          <hr className="category-header-line"/>
          {renderApps}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
