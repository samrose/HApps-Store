import { Hash } from './holochain'
import { Map } from "immutable"
// import { List, Map } from "immutable"

// ================================
//       App State Types
// ================================

export type WelcomeMsg = string;

export type AppDetailState = {
  author: {Hash: Hash, Name: string},
  thumbnail: string,
  description: HTMLInputElement | string,
  title: string,
  uuid: string,
}

export type AppDNACode = {
  fileload: Map<Hash, CodeParams>,
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
} | null


// ================================
//      Redux Action Typing
// ================================

export type ReduxAction
  = {type: 'RETURN_STATE'}
  | { type: 'FETCH_AGENT', agent: {Hash: Hash, Name: string}}
  | { type: 'SET_CURRENT_APP', AppDetailState: string }

  | { type: 'FETCH_ALL_APPS', allApps: [{Entry:{AppDetailState}, Hash}] }
  | { type: 'VIEW_APP', appDetails: AppDetailState }
  | { type: 'FETCH_APP_CODE', code: AppDNACode }

  | { type: 'CREATE_REVIEW', params: ReviewParams }
  | { type: 'FETCH_REVIEWS', reviewEntries: [ReviewLog]}

  | { type: 'CREATE_NEW_APP_DETAILS', params: AppParams }
  | { type: 'CREATE_NEW_APP_CODE', params: CodeParams }


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
