// ======================================
//      Type and Action Imports
// ======================================
import { Hash } from '../../holochain'
import store from './store'
import axios from 'axios'

import * as express from 'express'
import * as multer from 'multer'
import * as fs from 'fs'
import * as path from 'path'

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

export const fetchFormPOST = (url: string, data?: any, extraPayload?: any): Promise<any> => {
  extraPayload = extraPayload || {}
  return fetch(url, {
    ...extraPayload,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'post',
  }).then(r => r.json())
}

/////////////////////////////////////////////////////////////////////
// AXIOS METHOD :
/////////////////////////////////////////////////////////////////////

// export const fetchPostJSON = (url: string, data?: any, extraPayload?: any) => {
//   extraPayload = extraPayload || {}
//   const Axios = axios.create({
//     baseURL: url,
//     headers: {'Content-Type': 'application/json'},
//   })
//   return Axios({
//     ...extraPayload,
//     data: data,
//     responseType: 'json',
//     method: 'POST',
//   })
//   .then(res => {
//     console.log("this is the result from the axios post: ", res);
//     return res;
//   })
// }
