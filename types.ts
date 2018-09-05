import { Hash } from './holochain'
import { List, Map } from "immutable"

// ================================
//       App State Types
// ================================

export type WelcomeMsg = string;

export type HCHCAppState = {
  numClicks: number,
  allApps: Map<Hash,{ title: string, icon: string }>, // pairing of the app hash and the an obj with its title and icon url
  currentApp: AppDetailState | null,
  currentAgent: {agent: string} | null,
  reviewEntries: List<ReviewLog> | null,
};

export type AppDetailState = {
  appId: Hash,
  author: Map<Hash, string>,
  icon: string, // url for the image
  description: string,
  created: number, // date
  updated: number, // date
  uploads: number,
  fileload: Map<Hash, string>, // TODO: determine how we will provide the code /base files. (We have decided not to ref a github link..)
  appReviews: List<ReviewLog>, // pairing of review hash and its obj containing the author name and text content
}

export type ReviewLog = {
  appId: Hash,
  author: Map<Hash, string>,
  rating: number,
  review: string,
  timestamp: number
}


// ================================
//      Redux Action Typing
// ================================

export type ReduxAction
  = {type: 'INCREMENT'}
  | {type: 'DECREMENT'}
  | {type: 'RETURN_STATE'}

  | { type: 'VIEW_APP', hash: Hash }
  | { type: 'CREATE_NEW_APP', params: AppParams }
  | { type: 'FETCH_ALL_APPS', allApps: [Hash, {title: string, icon: string}] }
  | { type: 'FETCH_REVIEWS', reviewEntries: ReviewLog}


  | { type: 'CREATE_REVIEW', params: ReviewParams }
  | { type: 'FETCH_AGENT', agent: string }


export interface AppParams {
 author: string,
 description: string,
 fileload: string
}

export interface ReviewParams {
 appId: Hash,
 author: Map<Hash, string>,
 rating: number,
 review: string
}
