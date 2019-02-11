import { Hash } from '../../holochain';
import { Map } from "immutable"
import { App } from "./types/app";

import { ActionType, getType } from 'typesafe-actions'
import * as appActions from './actions'

export type AppAction = ActionType<typeof appActions>

const App1 = {
  title: "HoloChat",
  author: "Test Agent",
  description: "A better Chat",
  thumbnailUrl: "/IMG.jpg",
  homepageUrl: "/home/page",
  dnaUrl: "/dna/url",
  uiUrl: "ui/url",
}

interface State {
  readonly apps: Array<App>
  readonly currentAgent?: {name: string, hash: string},
  readonly currentApp?: App,
  readonly connected: boolean,
};

const defaultState: State = {
  apps: [App1],
  currentAgent: undefined,
  currentApp: undefined,
  connected: false,
}

export default (state: State = defaultState, action: AppAction): State => {
  switch (action.type) {
    case getType(appActions.GetAllApps.success):
      const apps = action.payload.map(response => response.entry)
      return {...state, apps}
    case getType(appActions.Whoami.success):
      const newAgent = {
        hash: action.payload.hash, 
        name: JSON.parse(action.payload.name).nick
      }
      return {...state, currentAgent: newAgent}
    case getType(appActions.GetApp.success):
      return {...state, currentApp: action.payload}
    case 'HOLOCHAIN_WEBSOCKET_CONNECTED':
      return { ...state, connected: true}
    default:
      return state
  }
}
