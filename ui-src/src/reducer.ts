import { Hash } from '../../holochain';
import { Map } from "immutable"
import { AppDetailState, AppDNACode, ReviewLog, ReduxAction } from "../../types";

import { ActionType, getType } from 'typesafe-actions'
import * as appActions from './actions'

export type AppAction = ActionType<typeof appActions>

interface State {
  readonly apps: Array<AppDetailState>
  readonly currentAgent: {agent: {Name: string, Hash: string}}
};

const defaultState: State = {
  apps: [],
  currentAgent: {agent: {Name: "None", Hash: "HASH"}}
}

export default (state: State = defaultState, action: AppAction): State => {
  switch (action.type) {
    case getType(appActions.GetAllApps.success):
      return {...state, apps: action.payload}
    default:
      return state
  }
}
