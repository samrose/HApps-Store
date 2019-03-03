import { Hash } from '../../holochain';
import { Map } from "immutable"
import { App } from "./types/app";

import { ActionType, getType } from 'typesafe-actions'
import * as appActions from './actions'

export type AppAction = ActionType<typeof appActions>


interface State {
  readonly apps: Array<App>
  readonly currentAgent?: {name: string, hash: string},
  readonly currentApp?: App,
  readonly connected: boolean,
  awaitingResponse: boolean,
};

const defaultState: State = {
  apps: [],
  currentAgent: undefined,
  currentApp: undefined,
  connected: false,
  awaitingResponse: false,
}

export default (state: State = defaultState, action: AppAction): State => {
  switch (action.type) {
    case getType(appActions.GetAllApps.success):
      const apps = action.payload.map(response => ({...response.entry, address: response.address}))
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
    case getType(appActions.CreateApp.request):
      return { ...state, awaitingResponse: true}
    case getType(appActions.CreateApp.success):
      return { ...state, awaitingResponse: false}
    case getType(appActions.UpvoteApp.success):
      // do a local state refresh of the upvote status for those reactive UI feels
      const updatedApps: Array<App> = state.apps.map((app) => {
        if (app.address === action.payload) {
          return {...app, upvotes: app.upvotes+1, upvotedByMe: true}
        } else {
          return app
        }
      })
      return { ...state, apps: updatedApps}
    default:
      return state
  }
}
