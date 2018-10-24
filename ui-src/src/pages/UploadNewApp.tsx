import * as React from 'react';
import {connect} from 'react-redux'

import { fetchPOST, fetchFormPOST } from '../utils';
import JdenticonPlaceHolder from '../components/JdenticonFiller';

import * as utils from '../utils';  // the file upload resource code is located in this file...
import Dropzone from 'react-dropzone';
import * as express from 'express'
import * as multer from 'multer'
import * as fs from 'fs'
import * as path from 'path'

import './UploadNewApp.css';


type UploadNewAppState = {
  errorMessage: string | undefined,
  title: string | number | string[] | undefined,
  description: string | number | string[] | undefined,
  fileload: string | number | string[] | undefined,
  uiCodeLink: string | number | string[] | undefined,
  thumbnail: string | undefined,
  thumbnailPreview: string | undefined,
  accepted: [{name: string, size: string | number}] | undefined,
  rejected:  [{name: string, size: string | number}] | undefined,
}

const handleDropRejected = (...args) => console.log('reject', args);

class UploadNewApp extends React.Component<any, UploadNewAppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      errorMessage: undefined,
      title: undefined,
      description: undefined,
      thumbnail: undefined,
      thumbnailPreview: undefined,
      fileload: undefined,
      uiCodeLink: undefined,
      accepted: undefined,
      rejected: undefined,
    };
  }

  public componentDidMount() {
    this.props.fetchAgent();
  }

  public onDrop = (files) => {
    const { accepted, rejected } = files
    console.log("onDrop File: ", files);
    // const parsedFiles = this.readURL(files);
    this.setState({
      thumbnailPreview: files,
      accepted,
      rejected
    });
    console.log("the hitherto accepted files: ", this.state.accepted);
  }

  public addNameToDataURI=(dataURL, name)=>{
    const uploadedFileNames: any = [] ;
    const fileURL = dataURL.replace(";base64", `;name=${name};base64`);
    uploadedFileNames.push(fileURL);
    console.log("uploadedFileNames", uploadedFileNames);
    this.setState({accepted: uploadedFileNames});
  }

  public render() {
    const required: boolean = true;
    let errorDisplay: JSX.Element | null = null;
    if (this.state.errorMessage) {
      errorDisplay = <div className="error-message">{ this.state.errorMessage }</div>
    }

    const preview = () => {
      const { thumbnailPreview, accepted, rejected } = this.state
      console.log("inside Prview, polling  thumbnailPreview, accepted, rejected states : ",  thumbnailPreview);
      console.log("accepted", accepted);
      console.log("rejected", rejected);

      if(thumbnailPreview || rejected) {
        return (
          <aside>
            <h2 className="underline">Accepted files</h2>
            { thumbnailPreview! &&
              <img src={ thumbnailPreview! } width="100px" height="100" alt="image preview" />
            }
            <ul>
              { accepted ? accepted!.map(file => <li key={file.name}>{file.name}: {file.size} bytes</li>) : <div/> }
            </ul>
            <h2 className="underline">Rejected files</h2>
            <ul>
              { rejected ? rejected!.map(file => <li key={file.name}>{file.name}: {file.size} bytes</li>) : <div/> }
            </ul>
          </aside>
        )
      }
    }

    if (!this.props.currentAgent) {
      return <div/>
    }
    else {
      const { agent } = this.props.currentAgent;
      const { fileload } = this.state
      // console.log("fileload", fileload);
      return (
        <div className="create-app-form" onKeyUp={ this.handleEnter }>
          <h1 className="registration-header">Upload Your App Below</h1>
          <h4 className="app-author">Author: {agent.Name}</h4>
          <h4 className="app-author">Avatar:
              <JdenticonPlaceHolder className="jdenticon" size={100} hash={ agent.Hash } />
          </h4>
          <hr className="reg-hr"/>
          <br/>

          <form className="form-group" onSubmit={this.handleCreateAapp}>
            <label htmlFor="app-title">
              App Title
              <input id="app-title"
                value={this.state.title}
                className="register-input"
                placeholder="Application Title"
                type="text"
                required={required}
                onChange={this.handleChange}/>
            </label>
            <br/>
            <label htmlFor="app-description">
              App Description
              <textarea id="app-description"
                value={this.state.description}
                className="register-input"
                placeholder="Enter application description here..."
                wrap="soft"
                required={required}
                onChange={this.handleChange}/>
            </label>
            <br/>
            <label htmlFor="app-code">
              Upload App Code File
              <input id="app-code"
                value={this.state.fileload}
                className="register-input form-control"
                name="appCode"
                type="file"
                accept=".js, .ts, .json"
                required={required}
                onChange={this.handleChange}/>
            </label>
            <br/>
            <label htmlFor="ui-code">
              Upload UI Code File
              <input id="ui-code"
                value={this.state.uiCodeLink}
                className="register-input form-control"
                name="appCode"
                type="file"
                accept=".js, .ts, .tsx, .html, .css, .json"
                required={required}
                onChange={this.handleChange}/>
            </label>
            <br/>
            <br/>
            <br/>

            { preview() }

            <section>
              <label htmlFor="app-thumbnail">
                Upload App Thumbnail Picture
              <div className="dropzone">
                <Dropzone
                  id="app-thumbnail-dropzone"
                  className="app-thumbnail-dropzone"
                  aria-label="Upload App Thumbnail Picture."
                  accept="image/*"
                  multiple={ true }
                  onDrop={this.onDrop}
                  // onDrop={(accepted, rejected) => { console.log( "accepted:", accepted, "rejected:", rejected ); }}
                  onDropRejected={ handleDropRejected }
                >
                  <p>Drag an Thumbanil image file here or click to upload..</p>
                  <p>Only *.jpeg and *.png images will be Accepted.</p>
                </Dropzone>
              </div>
            </label>
            </section>

             <br/>
             <hr className="reg-hr"/>
             { errorDisplay }
             <hr className="reg-hr"/>
             <button><a href="/" className="modal-button">Close</a></button>
             <button className="modal-button" type="submit" value="Submit">Submit</button>
          </form>
         </div>
       )}
     }

     public handleChange = (event: any) => {
       switch(event.target.id) {
         case "title":
           this.setState({ title: event.target.value });
           break;
         case "description":
           this.setState({ description: event.target.value });
           break;
         case "app-code":
           console.log("app-code - on inputChange app-code target value", event.target.value);
           console.log("app-code - on inputChange app-code target file at index position 0", event.target.files[0]);
           this.handleUploadFile(event.target.files);
           // this.setState({ fileload: event.target.files[0] });
          break;
         case "ui-code":
           console.log("ui-code - on inputChange", event.target.value);
           console.log("ui-code - on inputChange", event.target.files[0]);
           const uiLink = this.renderURLfromBlob(event.target.files);
           console.log("uiLink ???? : ", uiLink);
           // this.setState({ uiCodeLink: uiLink! });
           break;
       }
       // console.log("state: ", this.state);
     }


     public renderURLfromBlob = (input) => {
        const reader = new FileReader();

        console.log("input.files", input.files);
        reader.readAsDataURL(input[0]);
         console.log("Filename: " + input[0].name);
         console.log("Type: " + input[0].type);
         console.log("Size: " + input[0].size + " bytes");

        reader.onloadend = () => {
            this.addNameToDataURI(reader.result, input[0].name);
        }
     }

     public handleUploadFile = (input) => {
        const reader = new FileReader();
        reader.readAsDataURL(input[0]);

        reader.onloadend = () => {
            this.addNameToDataURI(reader.result, input[0].name);
        }

        const data = new FormData();
        data.append('file', input[0]);
        data.append('name', input[0].name);
        console.log("DNA file data input since upload", data);
        return data;
    }
    // // For the followign: <input type="file" onChange={this.handleFileUpload} />
    //   public handleFileUpload = ({ files, name, extraPayload, url }) => {
    //     const file = files[0];
    //     this.props.actions.uploadFileRequest({
    //        file,
    //        name,
    //        extraPayload,
    //        url
    //     })
    //   }


     public handleCreateAapp = () => {
        const acceptedFiles = this.renderURLfromBlob(this.state.accepted);
        console.log(acceptedFiles);

        console.log("this.state", this.state);

         const { description, title, thumbnail, fileload, uiCodeLink } = this.state;
         if (!description || !title || !thumbnail || !fileload || !uiCodeLink) {
           this.setState({errorMessage: "Please be sure you've completed all the necessary infos before submiting."})
         }
         else {
           fetchPOST('/fn/ratings/createApp', { title, description, thumbnail })
             .then(response => {
               if (response.errorMessage) {
                 // TODO: IMPROVE ERROR MESSAGE
                 this.setState({errorMessage: "Sorry, there was an error with the server. Review both details and resubmit."})
               }
               else {
                 this.setState({ errorMessage: undefined });
                 this.props.dispatch({ type: 'CREATE_NEW_APP_DETAILS', response });
               }
             })
             .then(response => {
                console.log("THIS is the response after the 1ST '.then' instance...", response);
                this.props.attachDNA(fileload, response);
                this.props.attachUI(uiCodeLink, title, thumbnail, response);
             })
             .then(response => {
               // window.URL.revokeObjectURL(file.preview);
               console.log("THIS is the response after the 2ND '.then' instance...", response);
               location.assign(`/appstore/${response}`);
             })
        }
     }

     private handleEnter = (event: React.KeyboardEvent) => {
       const { description, title, thumbnail, fileload, uiCodeLink } = this.state;
       if (event.keyCode === 13 && description! && title! && thumbnail! && fileload! && uiCodeLink! ) {
         this.handleCreateAapp();
       }
       else if (event.keyCode === 13) {
         this.setState({errorMessage: "Please be sure you've completed your review before pressing enter."});
       }
     }

}

const mapStateToProps = ({currentAgent, currentAppHash, appCode, UIappLink}) => ({currentAgent, currentAppHash, appCode, UIappLink});
const mapDispatchToProps = dispatch => ({
  fetchAgent: () => {
    fetchPOST('/fn/whoami/getAgent')
        .then(agent => {
        dispatch({type: 'FETCH_AGENT', agent})// why does this only return agent, instead of both agent(hash) and identity(name) for that agent
      })
  },
  addNewApp: (title, description, thumbnail) => {
    fetchPOST('/fn/hchc/createApp', { title, description, thumbnail })
        .then(appHash => {
          dispatch({ type: 'CREATE_NEW_APP_DETAILS', appHash})
      })
  },
  attachDNA: (dnaFile, appHash) => {
    fetchFormPOST('/fn/hchc/addAppCode', { dnaFile, appHash })
        .then(dnafileHash => {
        dispatch({type: 'ADD_DNA_FILE', dnafileHash})
      })
  },
  attachUI: (uiFileLink, title, thumbnail, appHash) => {
    fetchFormPOST('/fn/hchc/addUISkin', { uiFileLink, title, thumbnail, appHash })
        .then(dnafileHash => {
        dispatch({type: 'ADD_DNA_FILE', dnafileHash})
      })
  },
  returnState: () => dispatch({type: 'RETURN_STATE'})
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadNewApp);


//  ======================================================
//     FOR THE APPLICATION CREATION POST:
//  ======================================================
// handleCreateAappNewApp = () => {
//   fetchPOST('/fn/applications/newApp', { author, description, thumbnail })
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
