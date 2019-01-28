import * as React from "react";
import { connect } from 'react-redux';
import { fetchPOST } from '../utils'
// import "./Profile.css";
import {
  Container, Row, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';

class Profile extends React.Component<any, {}> {
  constructor(props) {
    super(props);
  }

  public componentDidMount() {
    this.props.fetchAgent();
  }

  public render() {
    if (!this.props.currentAgent) {
      return <div/>
    }
    const { agent } = this.props.currentAgent!;
    console.log("Just called agent.  Agent: ", this.props.currentAgent);

    return (
      <div>
          <Container className="container-fluid">
              <br/>
              <Row>
                <Col size="md-12">
                  <div className="profile-bio">
                    <div className="jumbotron img-responsive">
                    {this.props.profile ? (
                        <main key={agent.Hash}>
                           <Col size="sm-4">
                              <img className="img-responsive" src={this.props.profile.avatar} alt="Profile Pic"/>
                              <br/>
                              <br/>
                              <p>"{this.props.profile.handler}"</p>
                           </Col>
                           <Col size="sm-8">
                              <h3>
                                <strong className="agentName">{" " + this.props.profile.Name}</strong>
                              </h3>
                           </Col>
                        </main>
                     ) : (
                       <div>
                         <div className="profile-conatiner">
                            <h3 className="text-center">No Profile Yet to Display</h3>
                        </div>
                        {/* <button><a href="#">Create a Profile (Disabled) </a></button> */}
                      </div>
                     )}
                   </div>
                 </div>
              </Col>
           </Row>
      </Container>
    </div>
    )
  }
}

const mapStateToProps = ({ currentAgent, profile }) => ({ currentAgent, profile });
const mapDispatchToProps = dispatch => ({
  fetchAgent: () => {
    fetchPOST('/fn/whoami/getAgent')
      .then(agent => {
        dispatch({ type: 'FETCH_AGENT', agent })
      })
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
