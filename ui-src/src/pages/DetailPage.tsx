import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Component } from "react";
import { connect } from 'react-redux';
import { Hash } from "../../../holochain";
import { AppDetailState } from "../../../types";
import { fetchPOST } from '../utils'
import { Row, Col, CardPanel } from 'react-materialize';

import CreateReviewForm from '../components/CreateReviewForm';
import ReviewList from "../components/ReviewList";
import DownloadApp from "../components/DownloadApp"
// import AppList from "../containers/AppList";
// import AppDetails from "../containers/AppDetails";
import "./DetailPage.css";


type DetailPageProps = {
  currentAgent: {agent: {Hash: Hash, Name: string}},
  currentAppDetails: {Entry: AppDetailState, Hash: Hash},
  currentApp: AppDetailState,
  currentCategory: string,
  currentAppHash: string,
  fetchAgent: () => void,
  fetchAppDetails: (currentAppHash) => void,
  fetchAppReviews: (currentAppHash) => void,
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
    console.log("this.props in DetailPage: ", this.props);

    const fetchDetailsBundle = { app_hash: this.props.currentAppHash }
    JSON.stringify(fetchDetailsBundle);
    console.log("fetchDetailsBundle for Fetch App Details Call", fetchDetailsBundle);
    this.props.fetchAppDetails(fetchDetailsBundle)

    const fetchAppReviewsBundle = { reviewedHash: this.props.currentAppHash }
    JSON.stringify(fetchAppReviewsBundle);
    console.log("fetchAppReviewsBundle for App REVIEWS CALL", fetchAppReviewsBundle);
    this.props.fetchAppReviews(fetchAppReviewsBundle);
  }

  public toggleReviewForm = () => {
    console.log("calling this.toggleReviewForm");
    console.log("this.state.showReviewForm", this.state.showReviewForm);
    this.setState({showReviewForm: !this.state.showReviewForm});
  }

  public render() {
    // const makeReview = (
    //   <CreateReviewForm onModalToggle={this.toggleReviewForm}/>
    // )

    if (!this.props.currentAgent || !this.props.currentAppDetails) {
      return <div>
        <h4>Loading...</h4>
      </div>
    }
    else {
      const { agent } = this.props.currentAgent;
      const { currentAppDetails } = this.props;
      console.log("currentAppDetails.Hash : ", currentAppDetails.Hash);
      const appEntry = currentAppDetails.Entry;
      return (
        <div>
          <div className={ this.state.showReviewForm ? "detail-view hide" : "detail-view"} >
            <h1 className="detail-page-header">{appEntry.title}</h1>
            <br/>
            <Row>
                <Col s={12}>
                  <CardPanel className="lighten-4 black-text card-panel">
                      <h4 className="title">App Details</h4>
                      <h5 className="detail-page-header">Author: {appEntry.author.Name}</h5>
                      <h5>Description: {appEntry.description}</h5>
                      <DownloadApp/>
                  </CardPanel>
                  <CardPanel className="lighten-4 black-text card-panel">
                      <h4 className="title">App Reviews</h4>
                      <Link to={`/appstore/${this.props.currentCategory}/${currentAppDetails.Hash}/makereview`} key={currentAppDetails.Hash}>
                          <button>Add Review</button>
                      </Link>
                      <br/>
                      <br/>
                      <h5> Add a message {agent.Name}:</h5>
                      <br/>
                      <ReviewList/>
                      <br/>
                  </CardPanel>
                  <CardPanel className="lighten-4 black-text card-panel">
                      <h4 className="title">Other Apps in Category</h4>
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

const mapStateToProps = ({ reviewEntries, currentAgent, currentAppDetails, currentAppHash, currentCategory }) => ({ reviewEntries, currentAgent, currentAppDetails, currentAppHash, currentCategory });
const mapDispatchToProps = dispatch => ({
  fetchAgent: () => {
    fetchPOST('/fn/whoami/getAgent')
      .then(agent => {
        dispatch({ type: 'FETCH_AGENT', agent })
      })
  },
  fetchAppDetails: (currentAppHash) => {
    fetchPOST('/fn/happs/getApp', currentAppHash)
      .then( appDetails => {
        console.log("after action in DHT >> appDetials >> : ", appDetails);
        dispatch({ type: 'VIEW_APP', appDetails })
      })
  },
  fetchAppReviews: (appHash) => {
    fetchPOST('/fn/ratings/getRatings', appHash)
      .then( reviewEntries => {
        console.log("getRatings response to send to reducer", reviewEntries);
        dispatch({ type: 'FETCH_REVIEWS', reviewEntries })
      })
  },
  returnState: () => dispatch({ type: 'RETURN_STATE' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);
