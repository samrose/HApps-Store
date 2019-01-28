import { Hash } from './holochain'
import { Map } from "immutable"
// import { List, Map } from "immutable"

// ================================
//       App State Types
// ================================

export type WelcomeMsg = string;

export type App = {
  author: string,
  thumbnail: string,
  description: string,
  title: string,
  uuid: string,
}

export interface AppParams {
 author: string,
 description: string,
 fileload: string
}

