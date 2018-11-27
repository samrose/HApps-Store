'use strict';
export = 0;
let module = {};
// -----------------------------------------------------------------
//  Public Functions
// Author : Zo-El
// -----------------------------------------------------------------
// Description :
// -----------------------------------------------------------------

function getAppDNA({ app_hash }) {
  const hash = bridge(getBackupAppsHash()[0].CalleeApp, 'bridge_replies', 'getAppDNA', { app_hash });
  // debug("Return from HApps(For app that was created):" + JSON.parse(hash));
  return JSON.parse(hash);
}

// Should return all the details including the stats for the app
function getAppUISkin({ app_hash }) {
  const app_details = bridge(getBackupAppsHash()[0].CalleeApp, 'bridge_replies', 'getAppUISkin', { app_hash });
  // debug("Got App UI Skins: "+app_details);
  return app_details
}


function getBackupAppsHash() {
  return getBridges().filter(function(elem) {
    return elem.CalleeName === 'HCHC'
  });
}

// -----------------------------------------------------------------
//  The Genesis Function https://developer.holochain.org/genesis
// -----------------------------------------------------------------

function genesis() {
  return true;
}

function bridgeGenesis(side, dna, appData) {
  debug("HApps Request Bridge: " + side + " " + dna + " " + appData);
  return true;
}
