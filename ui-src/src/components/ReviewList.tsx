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

  /* ///////////////////////////////////////////////
      Table Data Generation Helper Function : Date
   ////////////////////////////////////////////////*/
  public formatDate(dateparam) {
    const unixDate = new Date(dateparam);

    const dd = unixDate.getDate();
    const mm = unixDate.getMonth()+1; // Jan is 0
    const yyyy = unixDate.getFullYear();

    const datestamp = mm + '-' + dd + '-' + yyyy;
    const hr = unixDate.getHours();
    const m = "0" + unixDate.getMinutes();
    const s = "0" + unixDate.getSeconds();
    const timestamp  = hr+ ':' + m.substr(-2) + ':' + s.substr(-2);

    const dateTimeStamps = {
      datestamp,
      timestamp
    }

    // console.log("dateTimeStamps", dateTimeStamps);
    return dateTimeStamps;
  }
  //////////////////////////////////////////////// */

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
      // console.log("typeof reviewEntries : ", typeof reviewEntries);

      return reviewEntries.sort().map((entry) => {
        const authorName : Promise<any> = this.props.findUser(entry.author);
        const timestamp = this.formatDate(entry.timestamp);
        // console.log("entry timestamp >>", timestamp);
        // console.log("msg author >>", authorName);
        return (
          <div
            key={entry.authorHash+entry.rating+entry.review}
            className="list-group-item list-entry-item"
          >
            <JdenticonPlaceHolder id="review-jdenticon" className="jdenticon" size={100} hash={ entry.author } />
             <span>{`${timestamp.datestamp }: ${timestamp.timestamp}`}</span>
             <h4>{authorName}</h4>
            <h5>{entry.rate}</h5>
            <h5>{entry.review}</h5>
          </div>
        );
      });
    }
  }

  public render() {
    return(
        <div className="list-group container">
          {this.renderCurrentReviewList()}
        </div>
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
  findUser: (hash) => {
    fetchPOST('/fn/whoami/findUser', hash)
      .then(user => {
        dispatch({ type: 'FETCH_MSG_AUTHOR', user })
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
