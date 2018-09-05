
import { List, Map } from "immutable"
import * as redux from "redux";

import {HCHCAppState, AppDetailState, ReduxAction} from "../../types";


const defaultState: HCHCAppState = {
  numClicks: 0,
  allApps: Map({}),
  currentApp: null,
  currentAgent: null,
  reviewEntries: null
};

export default (oldState: HCHCAppState = defaultState, action: ReduxAction): HCHCAppState => {
  const state = {
    ...oldState
  };

  switch (action.type) {
    case 'INCREMENT': {
      state.numClicks += 1;
      break;
    }

    case 'DECREMENT': {
      state.numClicks -= 1;
      break;
    }

    case 'FETCH_REVIEWS': {
      const reviewEntries = null;
      const { appReviews } = state.currentApp!;
      return { ...state, reviewEntries: appReviews };
    }

    case 'VIEW_APP': {
      const { hash } = action;
      // TODO: const appDetails = state.getAppDetails.get(hash); //use the app hash to locate the appDetails of app, including: author name, icon url, description, date created, etc..
      // const { author, icon, description, created, updated, uploads, fileload } = appDetails;
      const currentApp: AppDetailState = {
        appId: hash,
        author: Map({}),
        icon: "icon-url-string",
        description: "app-description",
        created: 2014,
        updated: 2018,
        uploads: 5000,
        fileload: Map({}),
        appReviews: List(),
// Remove above iteration and uncomment below, once the fn for the appDetails is created...
        // author,
        // icon,
        // description,
        // created,
        // updated,
        // uploads,
        // fileload,
        // appReviews
      }
      return {...state, currentApp}
      // For REVEIW, maybe use with comments? >>> : state.texts = action.entries.map(entry => entry.text);
    }

    case 'RETURN_STATE': {
      // tslint:disable-next-line:no-console
      console.log({ ...state });
      return state;
    }

    case 'CREATE_NEW_APP': {
      return state;
    }

    case 'FETCH_ALL_APPS': {
      return { ...state, allApps: Map(action.allApps) };
    }

    case 'CREATE_REVIEW': {
      if (state.currentApp === null){
        break;
      }
      let { appReviews } = state.currentApp!;
      if ( !appReviews[0].appId || appReviews[0].appId === action.params.appId) {
        // appReviews = appReviews.clear();
        appReviews = appReviews.push({
          appId: action.params.appId,
          author: action.params.author,
          rating: action.params.rating,
          review: action.params.review,
          timestamp: Date.now()
        });
      }
      break;
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
        currentAgent: {agent}
      };
    }

    default:
    return state
  }
  return state
}
