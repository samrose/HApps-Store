import * as React from "react";
import "./Nav.css";
import SearchBar from "./SearchBar";

class Nav extends React.Component<any, {}> {
  constructor(props) {
    super(props);
    this.state = {
      allAppCategories: [],
      selectedApp: null,
    };
  }

  // public appSearch = (appSearchTerm) => {
  //   JSONFETCH ({url: URL_BASE_HERE, term: appSearchTerm}, (data) => {
  //       console.log(data);
  //       this.setState({
  //           allAppCategories: data,
  //           selectedApp: data[0]
  //       });
  //     });
  // }

  public render() {
    // const searchTerm = _.debounce(term => {this.appSearch(term)}, 300);
    return (
      <nav className="nav nav-pills flex-column flex-sm-row">
        <img className="app-logo brand-logo" src="/holo-logo.png" />
        <a className="flex-sm-fill text-sm-center nav-link" href="/">All Apps</a>
        <a className="flex-sm-fill text-sm-center nav-link" href="/produceapp">Upload an App</a>
        <a className="flex-sm-fill text-sm-center nav-link active" href="#">My Profile</a>
      </nav>
    )
  }
}

export default Nav;
