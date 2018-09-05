import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Component } from "react";
import { connect } from 'react-redux';

import { Hash } from "../../../holochain";
import { AppDetailState } from "../../../types";
import { fetchPOST } from '../utils'

type ReviewListProps = {
  currentAgent: {agent: {Hash: Hash, Name: string}},
  fetchAgent: () => void,
}

class ReviewList extends React.Component<ReviewListProps, any>  {
  constructor(props) {
    super(props);
  }

  public componentDidMount() {
    // TODO: USE this instead: this.props.fetchAppReviews();
    // this.props.fetchAppReviewsTemporary();
  }

  // public renderCurrentReviewList() {
  //   return this.props.reviewEntries.map((entry) => {
  //     return (
  //       <li
  //         key={entry.author+entry.rating}
  //         className="list-group-item list-entry-item">
  //         <h4>{entry.author}: <span>{entry.timestamp}</span></h4>
  //         <h4>{entry.rating}</h4>
  //         <p>{entry.review}</p>
  //       </li>
  //     );
  //   });
  // }

  public render() {
    return(
        <ul className="list-group">
          {/* {this.renderCurrentReviewList()} */}
        </ul>
    );
  }
}

const mapStateToProps = ({ reviewEntries, currentAgent }) => ({ reviewEntries, currentAgent });
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
  fetchAppReviews: () => {
    fetchPOST('/fn/applications/getAppHash')
      .then( appHash => {
        dispatch({ type: 'FETCH_REVIEWS', appHash })
      })
  },
  returnState: () => dispatch({ type: 'RETURN_STATE' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewList);
