import { Hash } from './holochain'
import { Map } from "immutable"
// import { List, Map } from "immutable"

// ================================
//       App State Types
// ================================

export type WelcomeMsg = string;

export type HCHCAppState = {
  AllApps: [{}, string] | null, // pairing of the app hash and the an obj with its title and thumbanil url path
  currentAgent: {agent: {Hash: Hash, Name: string}}| null,
  currentCategory: string | null,
  appsByCategory: Array<{Hash,string}> | null, // A map parigin of the category string AND the array of app hashes and names(titles), belonging to that app Category...
  currentAppDetails: Map<{Entry: AppDetailState}, Hash> | null,
  appCode: AppDNACode | null,
  reviewEntries: [{}],
  // reviewEntries: List<ReviewLog>,
};

export type AppDetailState = {
  author: Map<Hash, string>,
  thumbnail: string, // url for the image
  description: HTMLInputElement | string,
  title: string,
  uuid: string,
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
  | { type: 'FETCH_AGENT', agent: {Hash: Hash, Name: string}}

  | { type: 'FETCH_ALL_APPS', allApps: [{}, string] }  // {Hash:Hash, icon: string}
  | { type: 'GET_APPS_BY_CATEGORY', category :string, appsByCurrentCategory: Array<{Hash,string}> }
  | { type: 'VIEW_APP', currentAppDetails: Map<{Entry: AppDetailState}, Hash> }
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
