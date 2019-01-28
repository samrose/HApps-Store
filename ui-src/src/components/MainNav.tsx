import * as React from "react";
import { connect } from 'react-redux';
import { fetchPOST } from '../utils';

import { Whoami } from '../actions';

import "./MainNav.css";

class MainNav extends React.Component<any, {}> {
  constructor(props) {
    super(props);
    this.props.fetchAgent();
  }

  public render() {
    if (!this.props.currentAgent) {
      return <div/>
    }

    const agent = this.props.currentAgent || {name: 'none', hash: 'none'};
    let agentName = agent.name;
    if (agentName.length > 15 ) {
      agentName = agentName.substring(0,15) + "...";
    }
    return (
      <nav className="nav nav-pills flex-column flex-sm-row">
          <div className="fade-in-logo"><img className="app-logo brand-logo" src="/holo-logo.png" /></div>
          <a className="flex-sm-fill text-sm-center nav-link" href={`/profile/${agent.Hash}`}>{`${agentName}'s Profile`}</a>
          <a className="flex-sm-fill text-sm-center nav-link" href="/apps">App Store</a>
      </nav>
    )
  }
}

const mapStateToProps = ({ currentAgent }) => ({ currentAgent });
const mapDispatchToProps = dispatch => ({
fetchAgent: () => dispatch(Whoami.create({})),
searchCategories: (category) => {
  fetchPOST('/fn/bridgeToCategories/getAppByCategory', category)
    .then(apps => {
      dispatch({ type: 'SEARCH_BY_CATEGORY', apps })
    })
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainNav);
