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


function addCategory({ category, tags, hash }) {
  // debug("Catagory : "+category+" | "+"tag"+tags)
  const category_base = anchor(category, "");
  const tag_base = anchor(category, tags);
  // debug("Catagory_base: "+category_base+" | "+"tag_base: "+tag_base)
  const commit_hash = commit("tag_link", {
    Links: [{ Base: category_base, Link: hash, Tag: "category" },
    { Base: tag_base, Link: hash, Tag: "tag_category" },
    { Base: hash, Link: tag_base, Tag: "app_category" }]
  });
  return commit_hash;
}


function getAppsByCategories({ category }) {
  if (anchorExists(category, "") == "true") {
    const base = anchor(category, "");
    const apps = getLinks(base, "category", { Load: true }).map(e => e.Entry);
    debug(apps);
    return apps;
  } else {
    return { error: "ERROR: This category doesn't exist..." }
  }
}

function getAppCategories({ hash }) {
  let categories: string[] = [];
  let tags: string[] = [];
  getLinks(hash, "app_category", { Load: true }).forEach(e => {
    if ((categories.filter(x => x == e.Entry.anchorType).length == 0)) {
      categories.push(e.Entry.anchorType);
    }
    if ((tags.filter(x => x == e.Entry.anchorText).length) == 0) {
      tags.push(e.Entry.anchorText);
    }
  });
  return { categories, tags };
}

// Old way to add tags to the hashs
/*
function addTag({ tag, hash }: AddTagParams): Hash {
  const base = makeHash("tag_anchor", BASE_TAG_STRING);
  const commit_hash = commit("tag_link", { Links: [{ Base: base, Link: hash, Tag: tag }] });
  return commit_hash;
}

function getTaged({ tag }) {
  const base = makeHash("tag_anchor", BASE_TAG_STRING);
  const apps = getLinks(base, tag, { Load: true }).map(e => e.Entry);
  debug(apps);
  return apps;
}
*/
// -----------------------------------------------------------------
//  The Helper Functions
// -----------------------------------------------------------------

function anchor(anchorType, anchorText) {
  return call('anchors', 'anchor', {
    anchorType: anchorType,
    anchorText: anchorText
  }).replace(/"/g, '');
}


function getAnchors({ type }) {
  const a = call('anchors', 'anchors', { type })
  return a;
}

function anchorExists(anchorType, anchorText) {
  return call('anchors', 'exists', {
    anchorType: anchorType,
    anchorText: anchorText
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
    case "tag_anchor":
      return true;
    case "tag_link":
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
    case "tag_link":
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
    case "tag_link":
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
