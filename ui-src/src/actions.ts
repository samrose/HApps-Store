// ======================================
//      Type and Action Imports
// ======================================
import { Hash } from '../../holochain'
import store from './store'

import { createAction } from 'typesafe-actions'
import { createHolochainAsyncAction } from '@holochain/hc-redux-middleware'
import { AppCreationSpecSnake, App } from './types/app'


interface DnaBundle {
    dna_bundle: string,
}

interface UiBundle {
    ui_bundle: string,
}

interface GetLinksLoadElement<T> {
  address: string,
  entry: T
}


export const CreateApp = createHolochainAsyncAction<
  AppCreationSpecSnake,
  string
>(`happ-store`, 'happs', 'create_app')


export const GetAllApps = createHolochainAsyncAction<
  {},
  Array<GetLinksLoadElement<App>>
>(`happ-store`, 'happs', 'get_all_apps')


export const GetApp = createHolochainAsyncAction<
  {address: string},
  App
>(`happ-store`, 'happs', 'get_all_apps')


export const Whoami = createHolochainAsyncAction<
{}, 
{hash: string, name: string}
>
(`happ-store`, 'whoami', 'get_user')

export const AddAppToCategory = createHolochainAsyncAction<
{app_address: string, category: string}, 
{}
>
(`happ-store`, 'happs', 'add_app_to_category')

export const AddAppToTag = createHolochainAsyncAction<
{app_address: string, category: string}, 
{}
>
(`happ-store`, 'happs', 'add_app_to_tag')

export const GetAppsByCategory = createHolochainAsyncAction<
{app_address: string, category: string}, 
{}
>
(`happ-store`, 'happs', 'get_apps_by_category')

export const GetAppsByTag = createHolochainAsyncAction<
{app_address: string, category: string}, 
{}
>
(`happ-store`, 'happs', 'get_apps_by_tag')

// create_ratings: {
//     inputs:| rate:String, review:String, reviewed_hash: Address |,
//     outputs: | result: ZomeApiResult<Address> |,
//     handler: ratings::handlers::handle_creating_ratings
// }
// get_ratings: {
//     inputs:| reviewed_hash: Address |,
//     outputs: |result: ZomeApiResult<Vec<GetLinksLoadElement<Ratings>>>|,
//     handler: ratings::handlers::handle_get_reviews_by_hash
// }
export const SetCurrentApp = createAction('SET_CURRENT_APP', resolve => {
  return (currentApp: App) => resolve(currentApp)
})

export const SetConnectionTimeout = createAction('SET_CONNECTION_TIMEOUT', resolve => {
  return () => resolve()
})
