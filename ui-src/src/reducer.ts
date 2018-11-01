import { Hash } from '../../holochain';
// import { List, Map } from "immutable"
import { Map } from "immutable"
import {HCHCAppState, AppDetailState, AppDNACode, ReviewLog, ReduxAction} from "../../types";


const defaultState: HCHCAppState = {
  currentAgent: null,
  AllApps: null,
  currentCategory: null,
  currentAppHash: "null",
  appsByCategory: null,
  currentAppDetails: null,
  appCode: null,
  reviewEntries: [{}],
  msgAuthorObj: null
};

export default (oldState: HCHCAppState = defaultState, action: ReduxAction): HCHCAppState => {
  const state = {
    ...oldState
  };

  switch (action.type) {
    case 'RETURN_STATE': {
      console.log({ ...state });
      return state;
    }

    case 'REGISTER_CATEGORY': {
      const {category} = action;
      console.log("INSIDE REDUCER, currentCategory :", category);

      return Object.assign({}, state, {
        currentCategory: category
      })

      // return {...state, currentCategory};
    }

    case 'REGISTER_APP_HASH': {
      const currentAppHash = action.appHash;
      console.log("INSIDE REDUCER, appHash", currentAppHash);
      return {...state, currentAppHash}
    }

    case 'CREATE_NEW_APP_DETAILS': {
      return state;
    }

    case 'CREATE_NEW_APP_CODE': {
      return state;
    }

    case 'CREATE_REVIEW': {
      console.log("action.params", action.params);
      let newReview;
      const { reviewEntries } = state;
      const check = Object.keys(reviewEntries).length;
      // console.log(">>> reviewEntires.keys.length", check);
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
        // console.log( "newReview (List Version of newReview) >>> " );
        console.log({ newReview });
        return {
          ...state,
          reviewEntries: newReview
        };
      }
    }

    case 'GET_APPS_BY_CATEGORY': {
      console.log("INSIDE REDUCER >> action.AppsByCategory : ", action.appsByCurrentCategory);
      const appsByCategory : Array<{Entry: AppDetailState, Hash: Hash}> = action.appsByCurrentCategory;
      return {...state, appsByCategory};
    }

    case 'FETCH_REVIEWS': {
      const reviews: [ReviewLog] = action.reviewEntries;
      console.log(action);
      console.log("reviews", reviews);
      const reviewEntries: [ReviewLog] = reviews;

      return { ...state, reviewEntries};
    }

    case 'FETCH_APP_CODE' : {
      if (!state.currentAppDetails) {break};
      if (state.appCode) {
        console.log("state.appCode", state.appCode);
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
      return {...state}
    }

    case 'VIEW_APP': {
      if (state.currentAppDetails) {
        console.log("the App Details (VIEW_APP) ACTION payload", action);
        console.log("state.currentAppDetails", state.currentAppDetails);
        state.currentAppDetails = null;
      }
      console.log("the App Details (VIEW_APP) ACTION payload", action);
      const { author, thumbnail, description, title, uuid } = action.appDetails;
      const Entry:AppDetailState = {
        author,
        thumbnail,
        description,
        title,
        uuid,
      }
      const appHash = state.currentAppHash;
      const currentAppDetails = {Entry, Hash:appHash};
      return {...state, currentAppDetails}
    }

    case 'FETCH_ALL_APPS': {
      console.log(">>ln 164 in reducer, ALL APPs Action !!!!: ", action.allApps);
      const AllApps = action.allApps;
      return { ...state, AllApps };
    }

    case 'FETCH_AGENT': {
      console.log("Fetch AGENT Action: ", action);
      const { agent } = action;
      return {
        ...state,
        currentAgent: { agent }
      };
    }

    case 'FETCH_MSG_AUTHOR': {
      console.log("Fetch FETCH_MSG_AUTHOR Action: ", action);
      const { user } = action;
      return {
        ...state,
        msgAuthorObj: { user }
      };
    }

    default:
    return state
  }
  return state
}
