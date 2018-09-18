import { Hash } from './holochain'
import { Map } from "immutable"
// import { List, Map } from "immutable"

// ================================
//       App State Types
// ================================

export type WelcomeMsg = string;

export type HCHCAppState = {
  numClicks: number,
  currentAgent: {agent: string} | null,
  allApps: Map<Hash,string>, // pairing of the app hash and the an obj with its title and icon url
  currentApp: AppDetailState | null,
  appCode: AppDNACode | null,
  // reviewEntries: List<ReviewLog>,
  reviewEntries: [{}],
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
  = {type: 'INCREMENT'}
  | {type: 'DECREMENT'}
  | {type: 'RETURN_STATE'}

  | { type: 'VIEW_APP', details: AppDetailState }
  | { type: 'FETCH_APP_CODE', code: AppDNACode }
  | { type: 'CREATE_NEW_APP_DETAILS', params: AppParams }
  | { type: 'CREATE_NEW_APP_CODE', params: CodeParams }
  | { type: 'FETCH_ALL_APPS', allApps: Map< Hash,string> }  // {Hash:Hash, icon: string}

  | { type: 'CREATE_REVIEW', params: ReviewParams }
  | { type: 'FETCH_REVIEWS', reviewEntries: [{}]}

  | { type: 'SET_CURRENT_APP', agent: string }
  | { type: 'FETCH_AGENT', agent: string }


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
