import * as React from 'react';
import JdenticonPlaceHolder from '../components/JdenticonFiller';
// import './UploadNewApp.css';
import {connect} from 'react-redux'
import { fetchPOST } from '../utils';


type UploadNewAppState = {
  errorMessage: string | null,
  description: string | undefined,
  fileload: string | undefined,
}

class UploadNewApp extends React.Component<any, UploadNewAppState> {
  constructor(props: any) {
    super(props)
    this.state = {
      errorMessage: null,
      description: undefined,
      fileload: undefined
    }
  }

  public componentDidMount() {
    this.props.fetchAgent();
  }

  public render() {
    const required: boolean = true;
    let errorDisplay: JSX.Element | null = null;
    if (this.state.errorMessage) {
      errorDisplay = <div className="error-message">{ this.state.errorMessage }</div>
    }

    if (!this.props.currentAgent) {
      return <div>
        <h4>Loading...</h4>
      </div>
    }
    else {
      const { agent } = this.props.currentAgent;
      return (
        <div className="create-game-form" onKeyUp={ this.handleEnter }>
          <h1 className="registration-header">Upload Your App Below</h1>
          <JdenticonPlaceHolder className="jdenticon" size={100} hash={ agent.Hash } />
          <h4 className="review-author">Author: {agent.Name}</h4>
          <hr className="reg-hr"/>
          <br/>
          <span><div>Upload File : </div></span>
      {/* !!!!! TODO: create the UPLOAD file functionality here... !!!!!!*/}
          <br/>
          <div>Upload App : </div>
          <textarea id="appDescription"
            value={this.state.description}
            className="register-input"
            placeholder="Enter application description here..."
            wrap="soft"
            required={required}
            onChange={this.handleChange}/>
          <br/>
          <hr className="reg-hr"/>
          { errorDisplay }
          <hr className="reg-hr"/>
          <button><a href="/"> className="modal-button">Close</a></button>
          <button className="modal-button" onClick={this.handleCreate}>Submit</button>
        </div>
      )}
    }

    public handleCreate = () => {
      const { agent } = this.props.currentAgent;
      const { description } = this.state;
      console.log("description", description);
      if (!description) {
        this.setState({errorMessage: "Please be sure you've completed all the necessary infos before submiting."})
      }
      else if (description) {
        const agentHash = agent.Hash
        {/* // BELOW> : The reviewedHash should instead be the App Hash (... not the whoami Hash). */}
        // fetchPOST('/fn/ratings/createRatings', {rating, review, agentHash})
        //   .then(response => {
        //     if (response.errorMessage) {
        //       // TODO: IMPROVE ERROR MESSAGE
        //       this.setState({errorMessage: "Sorry, there was an error with the server. Please review both details and resubmit."})
        //     }
        //     else {
        //       this.setState({errorMessage: null})
        //       {/* // BELOW> : The reviewedHash should instead be the App Hash (... not the whoami Hash). */}
        //       // this.props.dispatch({ type: 'FETCH_REVIEWS', agentHash })
        //
        //       this.props.dispatch({ type: 'RETURN_STATE' })
        //       this.props.toggleReviewForm()
        //     }
        //   })
        }
    }

  private handleChange = (event: any) => {
    switch(event.target.id) {
      case "ratingEntry":
        this.setState({description: event.target.value});
        break;
      case "reviewEntry":
        // this.setState({review: event.target.value});
        break;
    }
    // console.log("state: ", this.state);
  }

  private handleEnter = (event: React.KeyboardEvent) => {
    const { description } = this.state;
    if (event.keyCode === 13 && description! ) {
      this.handleCreate();
    }
    else if (event.keyCode === 13) {
      this.setState({errorMessage: "Please be sure you've completed your review before pressing enter."})
    }
  }
}



const mapStateToProps = ({currentAgent}) => ({currentAgent});
const mapDispatchToProps = dispatch => ({
  fetchAgent: () => {
    fetchPOST('/fn/whoami/getAgent')
        .then(agent => {
        dispatch({type: 'FETCH_AGENT', agent})// why does this only return agent, when the other whoami (minersweeper) returns agent(hash) and identity(name) for that agent
      })
  },
  returnState: () => dispatch({type: 'RETURN_STATE'})
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadNewApp);

//  ======================================================
//     FOR THE APPLICATION CREATION POST:
//  ======================================================
// handleCreateNewApp = () => {
//   fetchPOST('/fn/applications/newApp', { author, description, fileload })
//     .then(response => {
//       if(response.errorMessage) {
//         this.setstate({errorMessage: "We were unable to load your app. Please try again."})
//       }
//       else {
//           this.setstate(errorMessage: null);
//           this.props.dispatch({ type: 'CREATE_NEW_APP', response}) // WHy is this one this.props.dispatch instead of just dispatch ???
//           //make a function to return to main page after creation... showing the new app...
//       }
//     })
// }
