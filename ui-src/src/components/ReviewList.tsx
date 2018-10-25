import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Component } from "react";
import { connect } from 'react-redux';

import { Hash } from "../../../holochain";
import { AppDetailState } from "../../../types";
import { fetchPOST } from '../utils'
import JdenticonPlaceHolder from '../components/JdenticonFiller';

import "./ReviewList.css";

type ReviewListProps = {
  currentAgent: {agent: {Hash: Hash, Name: string}},
  currentAppDetails: {Entry: AppDetailState, Hash: Hash},
  currentAppHash: string,
  fetchAgent: () => void,
  fetchAppDetails: (currentAppHash) => void,
  fetchAppReviews: (currentAppHash) => void,
}

class ReviewList extends React.Component<any, any>  {
  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    console.log("this.props in ReviewList : ", this.props);

    const currentAppHash = { reviewedHash: this.props.currentAppHash }
    JSON.stringify(currentAppHash);
    console.log("currentApphash for App REVIEWS CALL", currentAppHash);
    this.props.fetchAppReviews(currentAppHash);
  }

  public renderCurrentReviewList() {
    const { agent } = this.props.currentAgent;
    const agentHash = agent.Hash;
    
    if (!this.props.reviewEntries) {
      // console.log("!this.props.reviewEntries ?!", this.props.reviewEntries);
      return <div>
        This app has yet to be reviewed.
      </div>
    }
    else {
      const { reviewEntries } = this.props;
      console.log("reviewEntries", reviewEntries);
      console.log("typeof reviewEntries : ", typeof reviewEntries);

      return reviewEntries.sort().map((entry) => {
        return (
          <li
            key={entry.authorHash+entry.rating+entry.review}
            className="list-group-item list-entry-item"
          >
            <JdenticonPlaceHolder className="jdenticon" size={100} hash={ agent.Hash } />
            <span><h4>{entry.authorName} <span>{entry.timestamp}</span></h4></span>
            <h5>{entry.rate}</h5>
            <h5>{entry.review}</h5>
          </li>
        );
      });
    }
  }

  public render() {
    return(
        <ul className="list-group">
          {this.renderCurrentReviewList()}
        </ul>
    );
  }
}

const mapStateToProps = ({ reviewEntries, currentAgent, currentAppDetails, currentAppHash }) => ({ reviewEntries, currentAgent, currentAppDetails, currentAppHash });
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
        console.log("after action in DHT appDtials >> : ", appDetails);
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

export default connect(mapStateToProps, mapDispatchToProps)(ReviewList);
