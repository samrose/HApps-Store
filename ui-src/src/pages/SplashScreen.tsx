import * as React from 'react';
import * as redux from 'redux';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import SplashNav from "../components/SplashNav";
import './SplashScreen.css';

import store from '../store'
import { fetchPOST } from '../utils'
import { WelcomeMsg, ReduxAction } from '../../../types';

import { Hash } from '../../../holochain';

type SplashScreenProps = {
  fetchAgent: () => void,
  currentAgent: {agent: {Hash: Hash, Name: string}},
  currentCategory: string,
  registerCategoryType: (category) => Promise<any>,
}


type SplashScreenState = {
  toggleMessage: boolean,
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
      toggleMessage: true,
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

  public componentDidMount() {
    this.props.fetchAgent();
  }

  public handleOnClick = e => {
    const panelClassName = e.target.className;
    const panelType = panelClassName.split(" ").slice(1);
    if (panelType.length >= 4) {
      const panel = panelType.slice(0,2).join(" ");
      this.handleToggle(panel);
    }
    else {
      const panel = panelType.join(" ");
      this.handleToggle(panel);
    }

    const category = panelClassName.split(" ")[0];
    this.registerCategory(category);
  }

  public registerCategory = (category) => {
    this.props.registerCategoryType(category)
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


  public removeMessages = () => {
    // console.log("SET THE STATE TO FALSE");
    this.setState({toggleMessage: false });
  }

  public render(){
    if (!this.props.currentAgent) {
      return <div/>
    }
    const renderWelcomeMsgs = () => {
      const { agent } = this.props.currentAgent!;
      const waitGreeting1: WelcomeMsg = `Hello ${agent.Name}`
      const waitGreeting2: WelcomeMsg = "Welcome to the Holo App Store";
      if (this.state.toggleMessage === true) {
        setInterval(() => {this.removeMessages()}, 6150);
        return (
          <div>
            <h1 className={`${this.state.toggleMessage ? `welcome-message-1` : `welcome-message-1 no-show`}`}>{ waitGreeting1 }</h1>
            <h1 className={`${this.state.toggleMessage ? `welcome-message-2` : `welcome-message-2 no-show`}`}>{ waitGreeting2 }</h1>
          </div>
        )
      }
    }

// Layer 1 of App Cats:
    const panels1 = this.state.panels1.map((panel, i) => {
      i=i+1;
      let toggleState;
      const cb = (toggle) => {
        toggleState = toggle
      }
      this.chooseToggleState1(i, cb);
      const categoryName = panel.name.toLowerCase().replace(/\s{1,}/g,'').trim();
      // console.log("categoryName", categoryName);

      return (
        <div key={categoryName} className={toggleState ? `${categoryName} ${panel.name} panel panel${i} open open-active` :`${categoryName} ${panel.name} panel panel${i}` } onClick={this.handleOnClick}>
          <p>{panel.name}</p>
          <p className={`${categoryName} ${panel.name}`}><i className="material-icons">{panel.icon}</i></p>
          <p><a className={`${categoryName} ${panel.name}`}>
            <Link to={`/appstore/${categoryName}`}>
              <button className={`${categoryName} icon-btn`}><h4 className={`${categoryName} btn-text`}>{panel.btn}</h4></button>
            </Link>
          </a></p>
        </div>
    )
  });

// layer 2 of App Cats:
    const panels2 = this.state.panels2.map((panel, i) => {
      i=i+1;
      let toggleState
      const cb = (toggle) => {
        toggleState = toggle
      }
      this.chooseToggleState2(i, cb);
      const categoryName = panel.name.toLowerCase().replace(/\s{1,}/g,'').trim();
      // console.log("categoryName", categoryName);
      return (
        <div key={categoryName} className={toggleState ? `${categoryName} ${panel.name} panel panel${i} open open-active` : `${categoryName} ${panel.name} panel panel${i}` } onClick={this.handleOnClick}>
          <p>{panel.name}</p>
          <p className={`${categoryName} ${panel.name}`}><i className="material-icons">{panel.icon}</i></p>
          <p><a className={`${categoryName} ${panel.name}`}>
            <Link to={`/appstore/${categoryName}`}>
              <button className={`${categoryName} icon-btn`}><h4 className={`${categoryName} btn-text`}>{panel.btn}</h4></button>
            </Link>
          </a></p>
        </div>
    )
  });

    return (
      <div>
        <SplashNav/>
        {renderWelcomeMsgs()}
        <div className="splash-screen-container" style={{ textAlign: 'center' }}>
          <h1 className="app-store-header">App Store</h1>
          <hr className="app-store-header-underline"/>
          <div className="panels panel-row-1">
            {panels1}
          </div>
          <div className="panels panel-row-2">
            {panels2}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ currentAgent, currentCategory }) => ({ currentAgent, currentCategory });
const mapDispatchToProps = dispatch => ({
  fetchAgent: () => {
    fetchPOST('/fn/whoami/getAgent')
      .then(agent => {
        dispatch({ type: 'FETCH_AGENT', agent })
      })
  },
  registerCategoryType: (category) => {
    console.log("category CALLED : ", category );
    dispatch({ type: 'REGISTER_CATEGORY', category })
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
