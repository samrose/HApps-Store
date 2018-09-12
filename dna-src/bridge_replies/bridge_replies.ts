'use strict';
export = 0;
let module = {};
// -----------------------------------------------------------------
//  Public Functions
// Author : Zo-El
// -----------------------------------------------------------------
// Description :
// -----------------------------------------------------------------

function addAppDetails({ appParam }) {
  const hash = JSON.parse(call("happs", "createApp", { appParam }));
  // Used for testing the reviews over the bridge
  // call("ratings", "createRatings", { rate: 4, review: "This is the reviews", reviewedHash: hash });
  // call("ratings", "createRatings", { rate: 5, review: "This is the reviews", reviewedHash: hash });
  return hash;
}

function getAppDetails({ app_hash }) {
  // get details
  const details = JSON.parse(call("happs", "getApp", { app_hash }));
  // get Reviews
  const reviews = JSON.parse(call("ratings", "getRatings", { "reviewedHash": app_hash }));
  // Get Other stats
  const ratings=calculateStars(reviews);
  // TODO: Decide on other States that need to be displayed (number of installed .etc)
  // TODO: get tags
  return { details, reviews , ratings }
}

function calculateStars(reviews) {
  let rating = 0;
  for (let entry of reviews) {
    rating += entry.rate;
  }
  return rating/reviews.length;
}
// -----------------------------------------------------------------
//  The Genesis Function https://developer.holochain.org/genesis
// -----------------------------------------------------------------

function genesis() {
  return true;
}

function bridgeGenesis(side, dna, appData) {
  debug("HApps: " + side + " " + dna + " " + appData);
  return true;
}

// -----------------------------------------------------------------
//  Validation functions for every change to the local chain or DHT
// -----------------------------------------------------------------

function validateCommit(entryName, entry, header, pkg, sources) {
  // debug("entryName: " + entryName + " entry: " + entry + " header: " + header + " pkg: " + pkg + " sources: " + sources)
  switch (entryName) {
    default:
      return false;
  }
}

function validatePut(entryName, entry, header, pkg, sources) {
  // debug("entryName: " + entryName + " entry: " + entry + " header: " + header + " pkg: " + pkg + " sources: " + sources)
  switch (entryName) {
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
