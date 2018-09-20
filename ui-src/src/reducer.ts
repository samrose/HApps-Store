// import { List, Map } from "immutable"

import { Map } from "immutable"
import {HCHCAppState, AppDetailState, AppDNACode, ReduxAction} from "../../types";


const defaultState: HCHCAppState = {
  currentAgent: null,
  allApps: Map({}),
  AppsByCategory: Map({}),
  currentApp: null,
  appCode: null,
  reviewEntries:[{}],
};

export default (oldState: HCHCAppState = defaultState, action: ReduxAction): HCHCAppState => {
  const state = {
    ...oldState
  };

  switch (action.type) {
    case 'RETURN_STATE': {
      // tslint:disable-next-line:no-console
      console.log({ ...state });
      return state;
    }

    case 'CREATE_NEW_APP_DETAILS': {
      return state;
    }

    case 'CREATE_NEW_APP_CODE': {
      return state;
    }

    case 'CREATE_REVIEW': {
      // const { appId } = state.currentApp;
      // tslint:disable-next-line:no-console
      console.log("action.params.appHash", action.params.appHash);
      // if (appId === null || appId !== action.params.appHash ){
      //   break;
      // }
      let newReview;
      const { reviewEntries } = state;
      console.log("action.params", action.params);
      // const check = Object.entries(reviewEntries)[0]
      const check = Object.keys(reviewEntries).length;
      // console.log(">>> reviewEntires.size", reviewEntries.size);
      // console.log(">>> reviewEntires.keys", Object.keys(reviewEntries));
      console.log(">>> reviewEntires.keys.length", check);
      // if ( check === 0 )
      if ( check === 0 || reviewEntries === null || reviewEntries === undefined ) {
        newReview = {};
        newReview = {
          authorHash: action.params.authorHash,
          authorName: action.params.authorName,
          rate: action.params.rating,
          review: action.params.review,
          timestamp: "Now"
        };
        newReview = [ newReview ];
        console.log("line 109 newReview", newReview);
        // tslint:disable-next-line:no-console
        // console.log({ newReview });

        return {
          ...state,
          reviewEntries: newReview,
        };
      }
      else {
        newReview = [{}];
        newReview = state.reviewEntries;
        newReview.push({
          authorHash: action.params.authorHash,
          authorName: action.params.authorName,
          rate: action.params.rating,
          review: action.params.review,
          timestamp: "Now"
        });
        // newReview = List(newReview);

        // tslint:disable-next-line:no-console
        // console.log( "newReview (List Version of newReview) >>> " );
        console.log({ newReview });
        return {
          ...state,
          reviewEntries: newReview
        };
      }
    }

    case 'FETCH_REVIEWS': {
      const reviews = action.reviewEntries;
      // tslint:disable-next-line:no-console
      console.log(action);
      console.log("action.reviewEntries", action.reviewEntries);
      return { ...state, reviewEntries: reviews };
    }

    case 'FETCH_APP_CODE' : {
      if (!state.currentApp) {break};
      if (state.appCode) {
        // tslint:disable-next-line:no-console
        console.log("state.appCode", state.appCode);
        // if there is a appCode, then remove it to replace with following app (that was just clicked on...)
        state.appCode = null;
      }
      console.log("the FETCH_APP_CODE payload", action);
      const { fileload } = action.code;
      console.log("fileload", fileload);

      // const hash = fileload.hash;
      // const code = fileload.CodeParams.dna;
      // const test = fileload.CodeParams.test;

      const appCode: AppDNACode = {
        fileload: Map({}),
        // fileload: Map<("Hash",{"dnaCode","testCode"})>,
      }
    }

    case 'VIEW_APP': {
      if (state.currentApp) {
        // tslint:disable-next-line:no-console
        console.log("state.currentApp", state.currentApp);
        // if there is a currentApp, then remove it to replace with following app (that was just clicked on...)
        state.currentApp = null;
      }
      console.log("the VIEW_APP payload", action);
      // ???? const { details } = action;
      // TODO: const appDetails = state.getAppDetails.get(hash); //use the app hash to locate the appDetails of app, including: author name, icon url, description, date created, etc..
      // const { author, icon, description, created, updated, uploads, fileload } = action;
      const currentApp: AppDetailState = {
        appId: "hash",
        author: Map({}),
        thumbnail: "icon-url-string",
        description: "app-description",
        // created: 2014,
        // updated: 2018,
        // uploads: 5000,

// Remove above iteration and uncomment below, once the fn for the appDetails is created...
        // author,
        // icon,
        // description,
        // created,
        // updated,
        // uploads,
        // fileload,
      }
      return {...state, currentApp}
      // For REVEIW, maybe use with comments? >>> : state.texts = action.entries.map(entry => entry.text);
    }

    case 'FETCH_ALL_APPS': {
      console.log(">>ln 86 in reducer, allApps : ", action.allApps);
      return { ...state, allApps: Map(action.allApps) };
    }

    case 'FETCH_AGENT': {
      const { agent } = action;
      //  // tslint:disable-next-line:no-console
      // console.log({
      //   ...state,
      //   currentAgent: {agent}
      // });
      return {
        ...state,
        currentAgent: { agent }
      };
    }

    default:
    return state
  }
  return state
}
