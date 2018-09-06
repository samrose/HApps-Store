'use strict';
export = 0;
let module = {};
// -----------------------------------------------------------------
//  Public Functions
// Author : Zo-El
// -----------------------------------------------------------------
// Description :
// This zome can be used to tag a Hash (The hash can refer to anything, like App ID Hash)
// This Tag can then be used to catogorize entries so thats Its easies to retirve data back
// -----------------------------------------------------------------

const BASE_TAG_STRING = "HCHC_TAGS"

function addTag({ tag, hash }) {
  const base = makeHash("tag_anchor", BASE_TAG_STRING);
  const commit_hash = commit("tagLink", { Links: [{ Base: base, Link: hash, Tag: tag }] });
  return commit_hash;
}

function getTaged({ tag }) {
  const base = makeHash("tag_anchor", BASE_TAG_STRING);
  const apps = getLinks(base, tag, { Load: true }).map(e => e.Entry);
  debug(apps);
  return apps;
}
// -----------------------------------------------------------------
//  The Genesis Function https://developer.holochain.org/genesis
// -----------------------------------------------------------------

function genesis() {
  commit("tag_anchor", BASE_TAG_STRING)
  return true;
}

// -----------------------------------------------------------------
//  Validation functions for every change to the local chain or DHT
// -----------------------------------------------------------------

function validateCommit(entryName, entry, header, pkg, sources) {
  // debug("entryName: " + entryName + " entry: " + entry + " header: " + header + " pkg: " + pkg + " sources: " + sources)
  switch (entryName) {
  case "tag_anchor":
  return true;
  case "tagLink":
  return true;
    default:
      return false;
  }
}

function validatePut(entryName, entry, header, pkg, sources) {
  // debug("entryName: " + entryName + " entry: " + entry + " header: " + header + " pkg: " + pkg + " sources: " + sources)
  switch (entryName) {
  case "tag_anchor":
  return true;
  case "tagLink":
  return true;
    default:
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
  case "tagLink":
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
