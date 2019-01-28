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

interface Props {
  currentAgent: {agent: {Hash: Hash, Name: string}},
  currentCategory: string,
  
  fetchAgent: () => void,
  registerCategoryType: (category) => Promise<any>,
}


interface State {
  toggleMessage: boolean,
}

class SplashScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      toggleMessage: true
    }
  }

  public componentDidMount() {
    this.props.fetchAgent();
  }

  public registerCategory = (category) => {
    this.props.registerCategoryType(category)
  }

  public removeMessages = () => {
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

    return (
      <div>
        <SplashNav/>
        {renderWelcomeMsgs()}
        <div className="splash-screen-container" style={{ textAlign: 'center' }}>
          <h1 className="app-store-header">App Store</h1>
          <hr className="app-store-header-underline"/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ currentAgent, currentCategory }) => ({ currentAgent, currentCategory });
const mapDispatchToProps = dispatch => ({
  fetchAgent: () => true,
  registerCategoryType: (category) => {
    console.log("category CALLED : ", category );
    dispatch({ type: 'REGISTER_CATEGORY', category })
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
