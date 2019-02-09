import { Hash } from '../../holochain';
import { Map } from "immutable"
import { App } from "../../types";

import { ActionType, getType } from 'typesafe-actions'
import * as appActions from './actions'

export type AppAction = ActionType<typeof appActions>

interface State {
  readonly apps: Array<App>
  readonly currentAgent?: {name: string, hash: string},
  readonly currentApp?: App,
};

const defaultState: State = {
  apps: [{author: "None", description: "This app is awesome etc", title: "Awesome App", uuid: "why is this here?", thumbnail: "/path/to/img"}],
  currentAgent: {name: "None", hash: "HASH"},
  currentApp: undefined,
}

export default (state: State = defaultState, action: AppAction): State => {
  switch (action.type) {
    case getType(appActions.GetAllApps.success):
      return {...state, apps: action.payload}
    case getType(appActions.Whoami.success):
      return {...state, currentAgent: action.payload}
    case getType(appActions.GetApp.success):
      return {...state, currentApp: action.payload}
    default:
      return state
  }
}
