'use strict';
export = 0;
let module = {};
// -----------------------------------------------------------------
//  Public Functions
// Author : Zo-El
// -----------------------------------------------------------------
// Description :
// This zome can be used to rate a Hash (The hash can refer to anything, like App ID Hash)
// This ratings include the rate, review and the author
// -----------------------------------------------------------------
//
// interface Ratings {
//     author:string;
//     rate:string;
//     review:string;
//     timestamp:string;
// }

function createRatings({ rate, review, reviewedHash }:CreateRatingsParams):Hash {
  const ratings = { rate, review, "author": App.Key.Hash ,"timestamp":new Date()};
  const hash = commit("ratings", ratings);
  commit("ratingsLink", {
    Links: [
      { Base: reviewedHash, Link: hash, Tag: 'ratings_tag' }
    ]
  });
  return hash;
}

function getRatings({reviewedHash}):Ratings[]{
  const ratings:Ratings[] = getLinks(reviewedHash, "ratings_tag", { Load: true }).map(e => e.Entry);
  debug(ratings);
  return ratings;
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
    case "ratings":
      return true;
    case "ratingsLink":
      return true;
    default:
      return false;
  }
}

function validatePut(entryName, entry, header, pkg, sources) {
  // debug("entryName: " + entryName + " entry: " + entry + " header: " + header + " pkg: " + pkg + " sources: " + sources)
  switch (entryName) {
    case "ratings":
      return true;
    case "ratingsLink":
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
    case "ratingsLink":
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
