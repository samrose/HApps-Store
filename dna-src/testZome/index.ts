'use strict';
export = 0;
let module = {};
// -----------------------------------------------------------------
//  Public Functions
// Author : Zo-El
// -----------------------------------------------------------------
// Description :
// -----------------------------------------------------------------

//Catogories Name : Games, Admin Tools, Dev Tools, Top Downloads, Categories, Movies, Educational, Finance, Leisure, Music


function genesis(){

  const errand_hash=JSON.parse(call("happs", "createApp", {appParam:{uuid:"1234-612-161346",title:"Errand",author:{Hash:App.Agent.Hash,Name:"zo-el"},description:"A Holochain Version of Trello",thumbnail:"/imp1.jpg"}}));
  const clutter_hash=JSON.parse(call("happs", "createApp", {appParam:{uuid:"1234-612-161341",title:"Clutter",author:{Hash:App.Agent.Hash,Name:"zippy"},description:"A Holochain Version of Twiter",thumbnail:"/imp2.jpg"}}));
  const holochat_hash=JSON.parse(call("happs", "createApp", {appParam:{uuid:"1234-612-161342",title:"HoloChat",author:{Hash:App.Agent.Hash,Name:"Nico L"},description:"A Holochain Version of Slack",thumbnail:"/imp3.jpg"}}));
  const holovolt_hash=JSON.parse(call("happs", "createApp", {appParam:{uuid:"1234-612-161343",title:"HoloVolt",author:{Hash:App.Agent.Hash,Name:"Phlip"},description:"A Holochain Version of the your volt",thumbnail:"/imp4.jpg"}}));
  const netflix_hash=JSON.parse(call("happs", "createApp", {appParam:{uuid:"1234-612-161347",title:"netflix",author:{Hash:App.Agent.Hash,Name:App.Agent.String},description:"A Holochain Version of the your netflix",thumbnail:"/imp5.jpg"}}));
  const mario_hash=JSON.parse(call("happs", "createApp", {appParam:{uuid:"1234-612-161347",title:"Mario",author:{Hash:App.Agent.Hash,Name:App.Agent.String},description:"A Holochain Version of the your Mario",thumbnail:"/impF.jpg"}}));
  debug("Errant Initialized: "+errand_hash);
  debug("Clutter Initialized: "+clutter_hash);
  debug("HoloChat  Initialized: "+holochat_hash);
  debug("HoloVolt Initialized: "+holovolt_hash);
  debug("Netflix  Initialized: "+netflix_hash);
  debug("Mario  Initialized: "+mario_hash);
  call("categories", "addCategory", { category:"Admin Tools", tags:"", hash:errand_hash });
  call("categories", "addCategory", { category:"Dev Tools", tags:"", hash:errand_hash });
  call("categories", "addCategory", { category:"Top Downloads", tags:"", hash:errand_hash });
  call("categories", "addCategory", { category:"Educational", tags:"", hash:errand_hash });
  call("categories", "addCategory", { category:"Top Downloads", tags:"", hash:clutter_hash });
  call("categories", "addCategory", { category:"Leisure", tags:"", hash:clutter_hash });
  // call("categories", "addCategory", { category:"Top Downloads", tags:"", hash:holochat_hash });
  // call("categories", "addCategory", { category:"Leisure", tags:"", hash:holochat_hash });
  //call("categories", "addCategory", { category:"Admin Tools", tags:"", hash:holovolt_hash });
  // call("categories", "addCategory", { category:"Dev Tools", tags:"", hash:holovolt_hash });
  call("categories", "addCategory", { category:"Dev Tools", tags:"", hash:holovolt_hash });
  // call("categories", "addCategory", { category:"Top Downloads", tags:"", hash:holovolt_hash });
  call("categories", "addCategory", { category:"Finance", tags:"", hash:holovolt_hash });
  call("categories", "addCategory", { category:"Movies", tags:"", hash:netflix_hash });
  call("categories", "addCategory", { category:"Music", tags:"", hash:netflix_hash });
  // call("categories", "addCategory", { category:"Educational", tags:"", hash:netflix_hash });
  // call("categories", "addCategory", { category:"Educational", tags:"", hash:mario_hash });
  call("categories", "addCategory", { category:"Games", tags:"", hash:mario_hash });

  return true;
}
