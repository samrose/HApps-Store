import * as React from 'react';
import {connect} from 'react-redux'

import { fetchPOST, fetchFormPOST } from '../utils';
import { Hash } from '../../../holochain'
import { AppDetailState } from "../../../types";
import JdenticonPlaceHolder from '../components/JdenticonFiller';

import * as utils from '../utils';  // the file upload resource code is located in this file...
import Dropzone from 'react-dropzone';
import * as express from 'express'
import * as multer from 'multer'
import * as fs from 'fs'
import * as path from 'path'

// import './DownloadApp.css';

export type CodeParams = {
  dna: string,
  test: string
}

export type AppDNACode = {
  fileload: Map<Hash, CodeParams>,
}

type UploadNewAppProps = {
  currentApp: AppDetailState,
  currentAgent: {agent: {Hash: Hash, Name: string}},
  currentAppDetails: {Entry: AppDetailState, Hash: Hash} | null,
  appCode: AppDNACode | null,
  fetchAgent: () => void,
  viewDownloadedFile: () => void,
  fetchAppUISkin: (currentAppHash) => void,
  fetchAppDNA: (currentAppHash) => void,
}

type UploadNewAppState = {
  errorMessage: string | undefined,
}

class UploadNewApp extends React.Component<any, UploadNewAppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      errorMessage: undefined,
    };
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

    // if (!this.props.currentAgent) {
    //   return <div/>
    // }

    // used to be: create-app-form
    else {
      return (
        <div className="download-app-btn">
             <hr className="reg-hr"/>
             { errorDisplay }
             <hr className="reg-hr"/>
             <button className="download-button" type="download" value="download" onClick={this.handleDownloadApp}>Download</button>
         </div>
       )}
     }

     // public addNameToDataURI=(dataURL, name)=>{
     //   const uploadedFileNames: any = [] ;
     //   const fileURL = dataURL.replace(";base64", `;name=${name};base64`);
     //   uploadedFileNames.push(fileURL);
     //   console.log("uploadedFileNames", uploadedFileNames);
     // }
     //
     // public renderURLfromBlob = (input) => {
     //    const reader = new FileReader();
     //
     //    console.log("input.files", input.files);
     //    reader.readAsDataURL(input[0]);
     //     console.log("Filename: " + input[0].name);
     //     console.log("Type: " + input[0].type);
     //     console.log("Size: " + input[0].size + " bytes");
     //
     //    reader.onloadend = () => {
     //        this.addNameToDataURI(reader.result, input[0].name);
     //    }
     // }

    //  public handleUploadFile = (input) => {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(input[0]);
    //
    //     reader.onloadend = () => {
    //         this.addNameToDataURI(reader.result, input[0].name);
    //     }
    //     const data = new FormData();
    //     data.append('file', input[0]);
    //     data.append('name', input[0].name);
    //     console.log("DNA file data input since upload", data);
    //     return data;
    // }

    public handleDownloadFile = () => {
      const dnaCode = this.props.appCode.fileLoad.dna;
      const data = window.atob(dnaCode);
      console.log("DNA file data input since upload", data);
      return data;
   }


     public handleDownloadApp = () => {
        console.log("this.props", this.props);

         const { description, title, appCode, uiCodeLink } = this.props;
         if (!description || !title || !appCode || !uiCodeLink) {
           this.setState({errorMessage: "Please be sure you've completed all the necessary infos before submiting."})
         }
         else {
           console.log("success");
           const {dna} = appCode.fileload
           console.log("fileload dna = ", dna);
      // create Iframe or call Donwload function WITH promise that ONCE RESOLVES, calls the HCAdmin GUI.
           // const downloadObj = {};
           // fetchPOST('/fn/ratings/createApp', downloadObj)
           //   .then(response => {
           //     if (response.errorMessage) {
           //       // TODO: IMPROVE ERROR MESSAGE
           //       this.setState({errorMessage: "Sorry, there was an error with the server. Review both details and resubmit."})
           //     }
           //     else {
           //       this.setState({ errorMessage: undefined });
           //       this.props.dispatch({ type: 'CREATE_NEW_APP_DETAILS', response });
           //     }
           //   })
           //   .then(response => {
           //      console.log("THIS is the response after the 1ST '.then' instance...", response);
           //      this.props.attachDNA(fileload, response);
           //      this.props.attachUI(uiCodeLink, title, response);
           //   })
           //   .then(response => {
           //     // window.URL.revokeObjectURL(file.preview);
           //     console.log("THIS is the response after the 2ND '.then' instance...", response);
           //     location.assign(`/appstore/${response}`);
           //   })
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
  fetchAppUISkin: ({ appHash }) => {
    fetchPOST('/fn/hchc/fetchAppUISkin', { appHash })
        .then(appDetails => {
          dispatch({ type: 'FETCH_APP_DETAILS', appDetails})
      })
  },
  fetchAppDNA: ({ appHash }) => {
    fetchPOST('/fn/hchc/getAppDNA', { appHash })
        .then(appDNAFile => {
          dispatch({ type: 'FETCH_APP_DNA', appDNAFile})
      })
  },
  viewDownloadedFile: (downloadObj) => dispatch({type: 'VIEW_DOWNLOAED_FILE'}, downloadObj)
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadNewApp);
