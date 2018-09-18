import * as React from 'react';
import * as redux from 'redux';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom'

import './SplashScreen.css';
import JdenticonPlaceHolder from '../components/JdenticonFiller';

// import Icon from '@material-ui/core/Icon';
// import { VideogameAsset, StarRate, Code, Timeline, List } from '@material-ui/icons';
// import { Array,Map } from "immutable"

import store from '../store'
import { fetchPOST } from '../utils'
import { WelcomeMsg, ReduxAction } from '../../../types';

import { Hash } from '../../../holochain';

type SplashScreenProps = {
  allApps: Map<Hash,{ title: string, icon: string }>,
  currentAgent: {agent: {Hash: Hash, Name: string}},
  fetchAgent: () => void,
  fetchAllApps: () => void,
  fetchAppDetails: () => void
}


type SplashScreenState = {
  panels1: Array<any>,
  panels2: Array<any>,
  toggle1: boolean,
  toggle2: boolean,
  toggle3: boolean,
  toggle4: boolean,
  toggle5: boolean,
  toggle6: boolean,
  toggle7: boolean,
  toggle8: boolean,
  toggle9: boolean,
  toggle10: boolean,
}

class SplashScreen extends React.Component<SplashScreenProps, SplashScreenState> {
  constructor(props) {
    super(props);
    this.state = {
      panels1: [
        {name: 'Games', icon: "videogame_asset", btn: "Play"},
        {name: 'Admin Tools', icon: "timeline", btn: "Browse"},
        {name: 'Dev Tools', icon: "code", btn: "Dive In"},
        {name: 'Top Downloads', icon: "stars", btn: "Visit"},
        {name: 'Categories', icon: "format_list_bulleted", btn: "See"},
      ],
      panels2: [
        {name: 'Movies', icon: "movie_filter", btn: "Watch"},
        {name: 'Educational', icon: "book", btn: "Learn"},
        {name: 'Finance', icon: "attach_money", btn: "Save"},
        {name: 'Leisure', icon: "language", btn: "Travel"},
        {name: 'Music', icon: "music_note", btn: "Listen"},
      ],
      toggle1: false,
      toggle2: false,
      toggle3: false,
      toggle4: false,
      toggle5: false,
      toggle6: false,
      toggle7: false,
      toggle8: false,
      toggle9: false,
      toggle10: false,
    };
  }

  public handleOnClick = e => {
    const panelType = e.target.className;
    this.handleToggle(panelType);
  }

  public handleToggle = (panelType: string) => {
    switch(panelType) {
      case "Games":
        this.setState({
          toggle1 : !this.state.toggle1,
        })
        break;
      case "Admin Tools":
        this.setState({
          toggle2 : !this.state.toggle2,
        })
        break;
      case "Dev Tools":
        this.setState({
          toggle3 : !this.state.toggle3,
        })
       break;
      case "Top Downloads":
        this.setState({
          toggle4 : !this.state.toggle4,
        })
        break;
      case "Categories":
        this.setState({
          toggle5 : !this.state.toggle5,
        })
        break;
        case "Movies":
          this.setState({
            toggle6 : !this.state.toggle6,
          })
          break;
        case "Educational":
          this.setState({
            toggle7 : !this.state.toggle7,
          })
          break;
        case "Finance":
          this.setState({
            toggle8 : !this.state.toggle8,
          })
         break;
        case "Leisure":
          this.setState({
            toggle9 : !this.state.toggle9,
          })
          break;
        case "Music":
          this.setState({
            toggle10 : !this.state.toggle10,
          })
          break;
    }
  }

  public chooseToggleState1 = (i, cb) => {
    let toggle;
    switch(i) {
      case 1:
        toggle = this.state.toggle1;
        break;
      case 2:
        toggle = this.state.toggle2;
        break;
      case 3:
        toggle = this.state.toggle3;
        break;
      case 4:
        toggle = this.state.toggle4;
        break;
      case 5:
        toggle = this.state.toggle5;
        break;
    }
    cb(toggle);
  }

  public chooseToggleState2 = (i, cb) => {
    let toggle;
    switch(i) {
      case 1:
        toggle = this.state.toggle6;
        break;
      case 2:
        toggle = this.state.toggle7;
        break;
      case 3:
        toggle = this.state.toggle8;
        break;
      case 4:
        toggle = this.state.toggle9;
        break;
      case 5:
        toggle = this.state.toggle10;
        break;
    }
    cb(toggle);
  }

  public render(){
    const panels1 = this.state.panels1.map((panel, i) => {
      i=i+1;
      let toggleState;
      const cb = (toggle) => {
        toggleState = toggle
      }
      this.chooseToggleState1(i, cb);
      return (
        <div key={panel.name} className={toggleState ? `panel panel${i} open open-active` :` panel panel${i}` } onClick={this.handleOnClick}>
          <p>{panel.name}</p>
          <p className={panel.name}><i className="material-icons">{panel.icon}</i></p>
          <p><a href={`/appstore/${panel.name}`}>
            <button className="icon-btn">{panel.btn}</button>
          </a></p>
        </div>
    )
  });

    const panels2 = this.state.panels2.map((panel, i) => {
      i=i+1;
      let toggleState
      const cb = (toggle) => {
        toggleState = toggle
      }
      this.chooseToggleState2(i, cb);
      return (
        <div key={panel.name} className={toggleState ? `panel panel${i} open open-active` :` panel panel${i}` } onClick={this.handleOnClick}>
          <p>{panel.name}</p>
          <p className={panel.name}><i className="material-icons">{panel.icon}</i></p>
          <p><a href={`/appstore/${panel.name}`}>
            <button className="icon-btn">{panel.btn}</button>
          </a></p>
        </div>
    )
  });

    return (
      <div className="splash-screen-container" style={{ textAlign: 'center' }}>
          <div className="panels panel-row-1">
            {panels1}
          </div>
          <div className="panels panel-row-2">
            {panels2}
          </div>
      </div>
    );
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
bridgetoAppDetails: (appHash) => {
fetchPOST('/fn/bridge_request/getApp', appHash)
  .then( appDetials => {
    dispatch({ type: 'VIEW_APP', appDetials })
  })
},
fetchAllApps: () => {
fetchPOST('/fn/hchc/getAllApps')
  .then(() => {
    dispatch({ type: 'FETCH_ALL_APPS' })
  })
}
});


export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
