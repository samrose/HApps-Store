// ======================================
//      Type and Action Imports
// ======================================
import { Hash } from '../../holochain'
import store from './store'

// ========================
//      UI Constants
// ========================
export const ICON_SIZE = "100px";


// ========================
//        API CALLS
// ========================

export const fetchPOST = (url: string, data?: any, extraPayload?: any): Promise<any> => {
  extraPayload = extraPayload || {}
  return fetch(url, {
    ...extraPayload,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
  }).then(r => r.json())
}

// export const createReview =
// (rate: number, review: string, reviewedHash: Hash): Promise<void> =>
//   fetchPOST('/fn/ratings/createRatings')
//     .then(review => {
//       store.dispatch({
//         review,
//         type: 'CREATE_REVIEW'
//       })
//       return review // return null
//     })
//
// export const fetchCurrentAgent =
// (): Promise<[Hash, string]> =>
//   fetchPOST('/fn/whoami/getAgent')
//     .then(agent => {
//       store.dispatch({
//         agent,
//         type: 'FETCH_CURRENT_AGENT'
//       })
//       return agent
//     })

// export const fetchAllApps =
// (): Promise<Array<[Hash, GameBoard]>> =>
//  fetchPOST('/fn/minersweeper/getAllApps')
//    .then(games => {
//      store.dispatch({
//        apps,
//        type: 'FETCH_ALL_APPS'
//      })
//      return apps
//    })
