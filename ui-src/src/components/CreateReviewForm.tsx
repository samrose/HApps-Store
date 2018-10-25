import * as React from 'react';
import {connect} from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom';
import { fetchPOST } from '../utils';
import { Hash } from "../../../holochain";
import { AppDetailState } from "../../../types";
import { Link } from 'react-router-dom';
import './CreateReviewForm.css';
import JdenticonPlaceHolder from '../components/JdenticonFiller';
// import StarFillRating from "../components/StarFillRating";

type CreateReviewFormProps = {
  currentAgent: {agent: {Hash: Hash, Name: string}},
  currentAppDetails: {Entry: AppDetailState, Hash: Hash},
  currentApp: AppDetailState,
  currentAppHash: string,
  currentCategory: string,
  fetchAgent: () => void,
  onModalToggle: () => void,
  createReview: (reviewObject) => void,
  fetchAppReviews: (currentAppHash) => void,
}

type CreateReviewFormState = {
  errorMessage: string | null,
  rating: number | undefined,
  review: string,
  toggleReviewForm: boolean,
}

class CreateReviewForm extends React.Component<CreateReviewFormProps, CreateReviewFormState> {
  constructor(props: any) {
    super(props)
    this.state = {
      errorMessage: null,
      rating: undefined,
      review: "",
      toggleReviewForm: false,
    }
  }

  public componentDidMount() {
    this.props.fetchAgent();
  }

  public render() {
    // if (!this.props.currentAppDetails) {
    //   return <div/>
    // }

    const submitReview = (
      <Redirect to='/appstore/${this.props.currentCategory}/${currentAppDetails.Hash'/>
    )

    const required: boolean = true;
    const { agent } = this.props.currentAgent;
    const { currentAppDetails } = this.props;
    console.log("THIS.PROPS ", this.props);
    let errorDisplay: JSX.Element | null = null;
    if (this.state.errorMessage) {
      errorDisplay = <div className="error-message">{ this.state.errorMessage }</div>
    }
    return (
      <div className="create-review-form" onKeyUp={ this.handleEnter }>
        <h1 className="registration-header">Write your App Review Below</h1>
        <JdenticonPlaceHolder className="jdenticon" size={100} hash={ agent.Hash } />
        <h4 className="review-author">Author: {agent.Name}</h4>
        <hr className="reg-hr"/>
        <br/>
        <span><div>Number Rating : </div></span>
        <input id="ratingEntry"
          value={this.state.rating}
          className="register-input"
          placeholder="Number Rating"
          type="number"
          min="1"
          max="5"
          required={required}
          onChange={this.handleChange}/>
        <br/>
        <div>App Review : </div>
        <textarea id="reviewEntry"
          value={this.state.review}
          className="register-input"
          placeholder="Enter review here..."
          wrap="soft"
          required={required}
          onChange={this.handleChange}/>
        <br/>
        <hr className="reg-hr"/>
        { errorDisplay }
        <hr className="reg-hr"/>
        <button className="modal-button" onClick={this.handleCreate}>Submit</button>
        <Link to={`/appstore/${this.props.currentCategory}/${currentAppDetails.Hash}`} key="closeModal">
            <button>Close</button>
        </Link>
        {this.state.toggleReviewForm ? submitReview : null}
      </div>
    )}

    public handleCreate = () => {
      const { currentAppDetails } = this.props;
      const { agent } = this.props.currentAgent;
      const { review, rating } = this.state;

      if (!review || !rating) {
        this.setState({errorMessage: "Please be sure you've completed your review before submiting."})
      }
      else if (review && rating) {
        console.log("review", review);
        console.log("rating", rating);
        console.log("typeof rating", typeof rating);


        const agentHash = agent.Hash;
        const authorName = agent.Name;
        const rate = Number(rating);
        console.log("rate", rate);
        console.log("typeof rate", typeof rate);
        const reviewedHash = currentAppDetails.Hash;

        const createReviewFetchBundle = {rate, review, reviewedHash};
        JSON.stringify(createReviewFetchBundle);
        console.log("createReviewFetchBundle for App REVIEWS CALL", createReviewFetchBundle);

        fetchPOST('/fn/ratings/createRatings', createReviewFetchBundle)
          .then(response => {
            if (response.errorMessage) {
              // TODO: IMPROVE ERROR MESSAGE
              this.setState({errorMessage: "Sorry, there was an error with the server. Please review both details and resubmit."})
            }
            else {
              this.setState({errorMessage: null});
              const reviewMsg = review;
              const hash = agentHash;
              const name = authorName;
              const reviewObject = {appHash: reviewedHash, authorHash: hash, authorName: name, rating: rate, review: reviewMsg, reviewHash: response }
              console.log("reviewObject -->>> ", reviewObject);
              this.props.createReview(reviewObject);

              // const currentAppHash = { reviewedHash: this.props.currentAppHash }
              // JSON.stringify(currentAppHash);
              // console.log("currentApphash for App REVIEWS CALL", currentAppHash);
              // this.props.fetchAppReviews(currentAppHash);

              // this.props.onModalToggle();
              // this.props.history.push(`/appstore/${this.props.currentCategory}/${currentAppDetails.Hash}`);
              this.setState({toggleReviewForm: true});
            };
          })
        }
    }

  private handleChange = (event: any) => {
    switch(event.target.id) {
      case "ratingEntry":
        this.setState({rating: event.target.value});
        break;
      case "reviewEntry":
        this.setState({review: event.target.value});
        break;
    }
  }

  private handleEnter = (event: React.KeyboardEvent) => {
    const { review, rating } = this.state;
    if (event.keyCode === 13 && review! && rating! ) {
      this.handleCreate();
    }
    else if (event.keyCode === 13) {
      this.setState({errorMessage: "Please be sure you've completed your review before pressing enter."})
    }
  }
}


const mapStateToProps = ({currentAgent, currentApp, currentAppDetails, currentAppHash}) => ({currentAgent, currentApp, currentAppDetails, currentAppHash});
const mapDispatchToProps = dispatch => ({
  createReview: (params) => {
    dispatch({ type: 'CREATE_REVIEW', params });
  },
  fetchAgent: () => {
    fetchPOST('/fn/whoami/getAgent')
        .then(agent => {
          dispatch({type: 'FETCH_AGENT', agent})// why does this only return agent, when the other whoami (minersweeper) returns agent(hash) and identity(name) for that agent
      })
  },
  fetchAppReviews: (appHash) => {
    fetchPOST('/fn/ratings/getRatings', appHash)
      .then( reviewEntries => {
        console.log("getRatings response to send to reducer", reviewEntries);
        dispatch({ type: 'FETCH_REVIEWS', reviewEntries })
      })
  },
  returnState: () => dispatch({type: 'RETURN_STATE'})
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateReviewForm);
