import * as React from 'react';

import JdenticonPlaceHolder from '../components/JdenticonFiller';

// import StarFillRating from "../components/StarFillRating";

import './CreateReviewForm.css';
import {connect} from 'react-redux'

import { fetchPOST } from '../utils';


type CreateReviewFormState = {
  errorMessage: string | null,
  rating: number | undefined,
  review: string,
}

class CreateReviewForm extends React.Component<any, CreateReviewFormState> {
  constructor(props: any) {
    super(props)
    this.state = {
      errorMessage: null,
      rating: undefined,
      review: "",
    }
  }

  public componentDidMount() {
    this.props.fetchAgent();
  }

  public render() {
    const required: boolean = true;
    const { agent } = this.props.currentAgent;
    let errorDisplay: JSX.Element | null = null;
    if (this.state.errorMessage) {
      errorDisplay = <div className="error-message">{ this.state.errorMessage }</div>
    }
    return (
      <div className="create-game-form" onKeyUp={ this.handleEnter }>
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
        <button className="modal-button" onClick={this.props.onModalToggle}>Close</button>
        <button className="modal-button" onClick={this.handleCreate}>Submit</button>
      </div>
    )}

    public handleCreate = () => {
      const { agent } = this.props.currentAgent;
      const { review, rating } = this.state;
      console.log("review", review);
      console.log("rating", rating);
      if (!review || !rating) {
        this.setState({errorMessage: "Please be sure you've completed your review before submiting."})
      }
      else if (review && rating) {
        const agentHash = agent.Hash
        {/* // BELOW> : The reviewedHash should instead be the App Hash (... not the whoami Hash). */}
        fetchPOST('/fn/ratings/createRatings', {rating, review, agentHash})
          .then(response => {
            if (response.errorMessage) {
              // TODO: IMPROVE ERROR MESSAGE
              this.setState({errorMessage: "Sorry, there was an error with the server. Please review both details and resubmit."})
            }
            else {
              this.setState({errorMessage: null})
              {/* // BELOW> : The reviewedHash should instead be the App Hash (... not the whoami Hash). */}
              // this.props.dispatch({ type: 'FETCH_REVIEWS', agentHash })

              this.props.dispatch({ type: 'RETURN_STATE' })
              this.props.toggleReviewForm()
            }
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
    // console.log("state: ", this.state);
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



const mapStateToProps = ({currentAgent, currentApp}) => ({currentAgent, currentApp});
const mapDispatchToProps = dispatch => ({
  fetchAgent: () => {
    fetchPOST('/fn/whoami/getAgent')
        .then(agent => {
        dispatch({type: 'FETCH_AGENT', agent})// why does this only return agent, when the other whoami (minersweeper) returns agent(hash) and identity(name) for that agent
      })
  },
  fetchAppReviews: () => {
    fetchPOST('/fn/applications/getAppHash')
      .then( appHash => {
        dispatch({ type: 'FETCH_REVIEWS', appHash })
      })
  },
  returnState: () => dispatch({type: 'RETURN_STATE'})
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateReviewForm);
