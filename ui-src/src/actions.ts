// ======================================
//      Type and Action Imports
// ======================================
import { Hash } from '../../holochain'
import store from './store'

import { createHolochainAsyncAction } from '@holochain/hc-redux-middleware'

interface App {
    uuid: string,
    title: string,
    author: string,
    description: string,
    thumbnail: string
}

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
  {uuid: string, title: string, description: string, thumbnail: string},
  string
>(`happ-store`, 'happs', 'main', 'create_app')


export const GetAllApps = createHolochainAsyncAction<
  {},
  Array<GetLinksLoadElement<App>>
>(`happ-store`, 'happs', 'main', 'get_all_apps')


export const GetApp = createHolochainAsyncAction<
  {address: string},
  App
>(`happ-store`, 'happs', 'main', 'get_all_apps')


export const Whoami = createHolochainAsyncAction<
{}, 
{hash: string, name: string}
>
(`happ-store`, 'whoami', 'main', 'get_user')

export const AddDna = createHolochainAsyncAction<
{app_hash: string, dna_bundle: string}, 
string
>
(`happ-store`, 'happs', 'main', 'add_dna')

export const GetDna = createHolochainAsyncAction<
{app_hash: string}, 
DnaBundle
>
(`happ-store`, 'happs', 'main', 'get_dna')

export const AddUi = createHolochainAsyncAction<
{app_hash: string, dna_bundle: string}, 
string
>
(`happ-store`, 'happs', 'main', 'add_ui')

export const GetUi = createHolochainAsyncAction<
{app_hash: string}, 
UiBundle
>
(`happ-store`, 'happs', 'main', 'get_ui')

export const AddAppToCategory = createHolochainAsyncAction<
{app_address: string, category: string}, 
{}
>
(`happ-store`, 'happs', 'main', 'add_app_to_category')

export const AddAppToTag = createHolochainAsyncAction<
{app_address: string, category: string}, 
{}
>
(`happ-store`, 'happs', 'main', 'add_app_to_tag')

export const GetAppsByCategory = createHolochainAsyncAction<
{app_address: string, category: string}, 
{}
>
(`happ-store`, 'happs', 'main', 'get_apps_by_category')

export const GetAppsByTag = createHolochainAsyncAction<
{app_address: string, category: string}, 
{}
>
(`happ-store`, 'happs', 'main', 'get_apps_by_tag')

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