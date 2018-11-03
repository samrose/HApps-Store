import { Hash } from '../../holochain';
// import { List, Map } from "immutable"
import { Map } from "immutable"
import { HCHCAppState, AppDetailState, AppDNACode, ReviewLog, ReduxAction } from "../../types";


const defaultState: HCHCAppState = {
  currentAgent: null,
  AllApps: null,
  AdminApps: null,
  DevApps: null,
  TopApps: null,
  GameApps:null,
  MusicApps:null,
  LeisureApps:null,
  MoviesApps:null,
  EducationalApps:null,
  FinanceApps:null,
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
      const { category } = action;
      console.log("INSIDE REDUCER, currentCategory :", category);

      return Object.assign({}, state, {
        currentCategory: category
      })
    }
    case 'REGISTER_APP_HASH': {
      const currentAppHash = action.appHash;
      console.log("INSIDE REDUCER, appHash", currentAppHash);
      return { ...state, currentAppHash }
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
      if (check === 0 || reviewEntries === null || reviewEntries === undefined) {
        newReview = {};
        newReview = {
          authorHash: action.params.authorHash,
          authorName: action.params.authorName,
          rate: action.params.rating,
          review: action.params.review,
          timestamp: "Now"
        };
        newReview = [newReview];
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
    case 'FETCH_REVIEWS': {
      const reviews: [ReviewLog] = action.reviewEntries;
      console.log(action);
      console.log("reviews", reviews);
      const reviewEntries: [ReviewLog] = reviews;

      return { ...state, reviewEntries };
    }

    case 'FETCH_APP_CODE': {
      if (!state.currentAppDetails) { break };
      if (state.appCode) {
        state.appCode = null;
      }
      const { fileload } = action.code;
      const appCode: AppDNACode = {
        fileload: Map({}),
      }
      return { ...state }
    }

    case 'VIEW_APP': {
      if (state.currentAppDetails) {
        state.currentAppDetails = null;
      }
      const { author, thumbnail, description, title, uuid } = action.appDetails;
      const Entry: AppDetailState = {
        author,
        thumbnail,
        description,
        title,
        uuid,
      }
      const appHash = state.currentAppHash;
      const currentAppDetails = { Entry, Hash: appHash };
      return { ...state, currentAppDetails }
    }

    case 'FETCH_ALL_APPS': {
      const AllApps = action.allApps;
      return { ...state, AllApps };
    }
    case 'FETCH_APPS_BY_CATEGORY': {
      const AllApps = action.allApps;
      return { ...state, AllApps };
    }
    case 'GET_APPS_BY_CATEGORY': {
    
      if (action.category === "admintools" && !action.allApps.error) {
        const AdminApps = action.allApps;
        return { ...state, AdminApps };
      } else if (action.category === "devtools" && !action.allApps.error) {
        const DevApps = action.allApps;
        return { ...state, DevApps };
      } else if (action.category === "topdownloads" && !action.allApps.error) {
        const TopApps = action.allApps;
        return { ...state, TopApps };
      } else if (action.category === "games" && !action.allApps.error) {
        const GameApps = action.allApps;
        return { ...state, GameApps };
      } else if (action.category === "music" && !action.allApps.error) {
        const MusicApps = action.allApps;
        return { ...state, MusicApps };
      } else if (action.category === "leisure" && !action.allApps.error) {
        const LeisureApps = action.allApps;
        return { ...state, LeisureApps };
      } else if (action.category === "finance" && !action.allApps.error) {
        const FinanceApps = action.allApps;
        return { ...state, FinanceApps };
      } else if (action.category === "educational" && !action.allApps.error) {
        const EducationalApps = action.allApps;
        return { ...state, EducationalApps };
      } else if (action.category === "movies" && !action.allApps.error) {
        const MoviesApps = action.allApps;
        return { ...state, MoviesApps };
      }
      return { ...state };
    }
    case 'FETCH_AGENT': {
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
