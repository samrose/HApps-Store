import { combineReducers, createStore, applyMiddleware, compose } from 'redux'

import { holochainMiddleware } from '@holochain/hc-redux-middleware'
import { connect } from '@holochain/hc-web-client'

import reducer from './reducer';

// put middleware in this array to have it applied
const middleware: Array<any> = [holochainMiddleware(connect(`ws://localhost:3400`))]

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

function CreateStore () {
  return createStore(
  	reducer,
  	composeEnhancers(
      applyMiddleware(...middleware)
    )
  )
}

export default CreateStore
