import { Hash } from './holochain'
import { Map } from "immutable"
// import { List, Map } from "immutable"

// ================================
//       App State Types
// ================================

export type WelcomeMsg = string;

export type HCHCAppState = {
  currentAgent: {agent: string} | null,
  allApps: Map<Hash,string>, // pairing of the app hash and the an obj with its title and thumbanil url path
  AppsByCategory: Map<string, Array<{Hash,string}>>, // A map parigin of the category string AND the array of app hashes and names(titles), belonging to that app Category...
  currentApp: AppDetailState | null,
  appCode: AppDNACode | null,
  reviewEntries: [{}],
  // reviewEntries: List<ReviewLog>,
};

export type AppDetailState = {
  appId: Hash,
  author: Map<Hash, string>,
  thumbnail: string, // url for the image //(thumbnail)
  description: HTMLInputElement | string,
  // created: number, // date
  // updated: number, // date
  // uploads: number,
}

export type AppDNACode = {
  fileload: Map<Hash, CodeParams>, // TODO: determine how we will provide the code /base files. (We have decided not to ref a github link..)
}

export type CodeParams = {
  dna: string,
  test: string
}

export type ReviewLog = {
  authorHash: Hash,
  authorName: string,
  rating: number,
  review: string,
  timestamp?: number
}


// ================================
//      Redux Action Typing
// ================================

export type ReduxAction
  = {type: 'RETURN_STATE'}
  | { type: 'FETCH_AGENT', agent: string }

  | { type: 'FETCH_ALL_APPS', allApps: Map< Hash,string> }  // {Hash:Hash, icon: string}
  | { type: 'GET_APP_BY_CATEGORY', category :string, AppsByCategory: Map< Hash,string> }
  | { type: 'VIEW_APP', appDetails: AppDetailState }
  | { type: 'FETCH_APP_CODE', code: AppDNACode }

  | { type: 'CREATE_REVIEW', params: ReviewParams }
  | { type: 'FETCH_REVIEWS', reviewEntries: [{}]}

  | { type: 'CREATE_NEW_APP_DETAILS', params: AppParams }
  | { type: 'CREATE_NEW_APP_CODE', params: CodeParams }
  | { type: 'SET_CURRENT_APP', agent: string }


export interface AppParams {
 author: string,
 description: string,
 fileload: string
}

export interface ReviewParams {
 appHash: Hash,
 // author: Map<Hash, string>,
 authorHash: Hash,
 authorName: string,
 rating: number,
 review: string,
timestamp?: number
}
