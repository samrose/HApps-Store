import * as React from 'react';
import * as redux from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import MainNav from "../components/MainNav";
import './AllCategoriesPage.css';

import JdenticonPlaceHolder from '../components/JdenticonFiller';
import { Container, Row, Col } from 'reactstrap';
import store from '../store'
import { fetchPOST } from '../utils'
import { ReduxAction } from '../../../types';

import { Hash } from '../../../holochain';

type AllApps = {
    Entry:{
     author: {Hash:Hash, Name:string},
     thumbnail: string,
     description: HTMLInputElement | string,
     title: string,
     uuid: string,
   },
   Hash: Hash}


interface Props {
  currentAgent: {agent: {Hash: Hash, Name: string}},

  fetchAgent: () => void,
  fetchAllApps: () => void,
  getappsByCategory: (category) => void,
  registerAppHash: (appHash) => void,
}

class AllCategoriesPage extends React.Component <Props, {}> {
   
  public componentDidMount() {
    this.props.fetchAgent();
  }

  public handleSelectApp = (hash) => (e) => {
    this.props.registerAppHash(hash);
  }

  public render() {
    const greeting: string = "All Categories"

    const { agent } = this.props.currentAgent

    return (
      <div>
        <MainNav/>
        <div style={{ textAlign: 'center' }}>
          <h1 className="category-header">{ greeting }</h1>
          <hr className="category-header-line"/>
        </div>
      </div>
    );
  }
}


const mapStateToProps = ({currentAgent }) => ({ currentAgent });
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
  getappsByCategory: (category) => {
    fetchPOST('/fn/categories/getAppsByCategories', {category})
      .then( allApps => {
        dispatch({ type: 'GET_APPS_BY_CATEGORY',category, allApps })
      })
  },
  registerAppHash: (appHash) => {
    dispatch({ type: 'REGISTER_APP_HASH', appHash })
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AllCategoriesPage);
