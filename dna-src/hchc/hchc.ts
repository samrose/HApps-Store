'use strict';

// import {CreateAppParams, CodeParams, UiSkinParams} from "../../hchc"

export = 0;
let module = {};
// -----------------------------------------------------------------
//  Public Functions
// Author : Zo-El
// -----------------------------------------------------------------
// Description :
// This zome can be used to manage the apps that are going to be added to the HC of HC
// It includes :
// - adding creating an aoo
// - adding the code for that apps
// - adding UI-Skins for apps
// -----------------------------------------------------------------

//TODO : Decide if all the apps need to be linked to the App.DNA.Hash
function createApp({ appParam }) {
  // const appParam = {
  //   uuid: uuidGenerator(),
  //   title,
  //   author: App.Key.Hash,
  //   description,
  //   thumbnail
  // };
  const hash: Hash = commit("app", appParam);
  commit("app_link", {
    Links: [
      { Base: App.DNA.Hash, Link: hash, Tag: 'app_tag' }
    ]
  });
  //debug("")
  return hash;
}

// To get all apps in the HC
function getAllApps() {
  //
  // debug("-->"+JSON.stringify(getLinks(App.DNA.Hash, "app_tag", { Load: true }).map((e)=>{return{
  //   "Entry":e.Entry,
  //   "Hash":e.Hash
  // }})));
  return getLinks(App.DNA.Hash, "app_tag", { Load: true }).map((e) => {
    return {
      "Entry": e.Entry,
      "Hash": e.Hash
    }
  });
}

function getApp({ app_hash }): GetResponse {
  return get(app_hash, { GetMask: HC.GetMask.Entry });
}


function addAppCode({ dna_code_hash, app_hash }) {
  const codeParam = {
    dna_code_hash
  };
  const hash: Hash = commit("dna_app_code", codeParam);
  commit("app_link", {
    Links: [
      { Base: app_hash, Link: hash, Tag: 'dna_code_tag' }
    ]
  });
  return hash;
}

//TODO : Get the actual code for the DNA Code from the HCHC App
// To get all apps in the HC
function getAppCode(app_hash) {
  return getLinks(app_hash, "dna_code_tag", { Load: true }).map(e => e.Entry);
}

function addUISkin({ title, link, thumbnail, app_hash }) {
  const uiSkinParams = {
    title,
    link,
    author: App.Key.Hash,
    thumbnail
  };
  const hash: Hash = commit("ui_skin", uiSkinParams);
  commit("app_link", {
    Links: [
      { Base: app_hash, Link: hash, Tag: 'app_ui_code_tag' }
    ]
  });
  return hash;
}

// To get all apps in the HC
function getUISkin(app_hash) {
  return getLinks(app_hash, "app_ui_code_tag", { Load: true }).map(e => e.Entry);
}

//------------------------------
// Helper Functions
//------------------------------

//Generates new UUID ()
function uuidGenerator() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// -----------------------------------------------------------------
//  The Genesis Function https://developer.holochain.org/genesis
// -----------------------------------------------------------------

function genesis() {
  return true;
}

// -----------------------------------------------------------------
//  Validation functions for every change to the local chain or DHT
// -----------------------------------------------------------------

function validateCommit(entryName, entry, header, pkg, sources) {
  // debug("entryName: " + entryName + " entry: " + entry + " header: " + header + " pkg: " + pkg + " sources: " + sources)
  switch (entryName) {
    case "app":
      return true;
    case "dna_app_code":
      return true;
    case "app_link":
      return true;
    case "ui_skin":
      return true;
    default:
      return false;
  }
}

function validatePut(entryName, entry, header, pkg, sources) {
  // debug("entryName: " + entryName + " entry: " + entry + " header: " + header + " pkg: " + pkg + " sources: " + sources)
  switch (entryName) {
    case "app":
      return true;
    case "dna_app_code":
      return true;
    case "app_link":
      return true;
    case "ui_skin":
      return true; default:
      return false;
  }
}

function validateMod(entryName, entry, header, replaces, pkg, sources) {
  switch (entryName) {
    default:
      return false;
  }
}

function validateDel(entryName, hash, pkg, sources) {
  switch (entryName) {
    default:
      return false;
  }
}
function validateLink(entryName, baseHash, links, pkg, sources) {
  // debug("entryName: " + entryName + " baseHash: " + baseHash + " links: " + links + " pkg: " + pkg + " sources: " + sources)
  switch (entryName) {
    case "app_link":
      return true;
    default:
      return false;
  }
}
function validatePutPkg(entryName) {
  return null;
}
function validateModPkg(entryName) {
  return null;
}
function validateDelPkg(entryName) {
  return null;
}
function validateLinkPkg(entryName) {
  return null;
}
