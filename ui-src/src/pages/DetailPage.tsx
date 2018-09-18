import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Component } from "react";
import { connect } from 'react-redux';

import { Row, Col, CardPanel } from 'react-materialize';

import JdenticonPlaceHolder from '../components/JdenticonFiller';

import CreateReviewForm from '../components/CreateReviewForm';
import ReviewList from "../components/ReviewList";
// import AppList from "../containers/AppList";
// import AppDetails from "../containers/AppDetails";

import "./DetailPage.css";

import { Hash } from "../../../holochain";
import { AppDetailState } from "../../../types";
import { fetchPOST } from '../utils'

type DetailPageProps = {
  currentAgent: {agent: {Hash: Hash, Name: string}},
  currentApp: AppDetailState,
  fetchAppDetails: () => void,
  fetchAgent: () => void,
}

type DetailPageState = {
  showReviewForm: boolean,
}

class DetailPage extends Component <DetailPageProps, DetailPageState> {
  constructor(props) {
    super(props);
    this.state = {
      showReviewForm: false,
    }
  }

  public componentWillMount() {
    this.props.fetchAgent();
    // setInterval(this.props.returnState(), 1200)
  }

  public toggleReviewForm = () => {
    // console.log("calling this.toggleReviewForm");
    // console.log("this.state.showReviewForm", this.state.showReviewForm);
    this.setState({showReviewForm: !this.state.showReviewForm});
  }

  public render() {
    const makeReview = (
      <div className="interstitial-modal-overlay">
        <div className="interstitial-modal">
          <div className="modal-container register-modal">
            <div className="modal-background">
              <div className="modal">
                <CreateReviewForm onModalToggle={this.toggleReviewForm}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )

    if (!this.props.currentAgent) {
      return <div>
        <h4>Loading...</h4>
      </div>
    }
    else {
      const { agent } = this.props.currentAgent;
      return (
        <div>
          { this.state.showReviewForm ? makeReview : null }

          <div className={ this.state.showReviewForm ? "app app-background detail-view hide" : "app app-background detail-view"} >
            <h1 className="detail-page-header">App Name Goes Here</h1>
            <JdenticonPlaceHolder className="jdenticon" size={150} hash={ agent.Hash } />
            <br/>
            <Row>
                <Col s={12}>
                  <CardPanel className="lighten-4 black-text card-panel">
                      <h4 className="title">App Details</h4>
                      <h5>whoami: {agent.Name}</h5>
                      <br/>
                      <br/>
                      <br/>
                      <button onClick={this.toggleReviewForm}>Add Review</button>
                  </CardPanel>
                  <CardPanel className="lighten-4 black-text card-panel">
                      <h4 className="title">App Reviews</h4>
                      <ReviewList/>
                  </CardPanel>
                  <CardPanel className="lighten-4 black-text card-panel">
                      <h4 className="title">Similar / Recommended Apps</h4>
                      {/* <AppList/> */}
                  </CardPanel>
                </Col>
            </Row>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = ({ currentAgent, currentApp }) => ({ currentAgent, currentApp });
const mapDispatchToProps = dispatch => ({
  fetchAppReviewsTemporary: () => {
    fetchPOST('/fn/whoami/getAgent')
      .then(agentHash => {
        dispatch({ type: 'FETCH_REVIEWS', agentHash })
      })
    },
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
  returnState: () => dispatch({ type: 'RETURN_STATE' }),
  fetchAllApps: () => dispatch({ type: 'FETCH_ALL_APPS' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);
