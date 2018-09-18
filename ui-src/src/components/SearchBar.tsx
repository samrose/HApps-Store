import * as React from "react";

class SearchBar extends React.Component<any, any> {
  constructor(props){
    super(props);
    this.state = {
      term: ""
    };
  }

  public render() {
    return (
      <div className="col-sm-8 search-bar">
        <input onChange={this.handleOnChange} />
      </div>
    );
  }

  public handleOnChange = (e) => {
    this.onInputChange(e.target.value);
  }

  public onInputChange(term) {
    this.setState({ term });
    this.props.onSearchTermUpdate(term);
    console.log("This is our input", this.state.term);
  }
}

export default SearchBar;
