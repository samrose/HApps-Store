import * as React from "react";
import { Fragment } from "react";
import { render } from "react-dom";
import ReactDropzone from "react-dropzone";

type NewAppState = {
  files: Array<any>,
}


class NewApp extends React.Component<any, NewAppState> {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
    };
  }

  public onPreviewDrop = (files) => {
    this.setState({
      files: this.state.files.concat(files),
     });
  }

  public render() {
    const previewStyle = {
      display: 'inline',
      width: 100,
      height: 100,
    };

    return (
      <div className="app">
        <ReactDropzone
          accept="image/*"
          onDrop={this.onPreviewDrop}
        >
          Drop an image, get a preview!
        </ReactDropzone>
        {this.state.files.length > 0 &&
          <Fragment>
            <h3>Previews</h3>
            {this.state.files.map((file) => (
              <img
                alt="Preview"
                key={file.preview}
                src={file.preview}
                style={previewStyle}
              />
            ))}
          </Fragment>
        }
      </div>
    );
  }
}

export default NewApp;
