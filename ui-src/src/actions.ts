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
