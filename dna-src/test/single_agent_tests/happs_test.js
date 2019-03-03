
const App1 = {
  title: "HoloChat",
  description: "A better Chat",
  thumbnail_url: "/IMG.jpg",
  homepage_url: "home/page",
  dna_url: "/dna/url",
  ui_url: "ui/url",
}

const App2 = {
  title: "Clutter",
  description: "A better Twiter",
  thumbnail_url: "/IMG.jpg",
  homepage_url: "home/page",
  dna_url: "/dna/url",
  ui_url: "ui/url",
}

module.exports = (scenario) => {

  scenario.runTape('Create an app, add dna+ui bundles and retrieve', async (t, {alice}) => {
    const create_result = await alice.callSync("happs", "create_app", App1);
    console.log(create_result)
    const app_address = create_result.Ok
    t.equal(app_address.length, 46)

    const get_app_result = await alice.callSync('happs', "get_app", {app_hash:app_address})
    const app_details = get_app_result.Ok
    t.equal(app_details.uuid, App1.uuid)

    const get_all_apps_result = await alice.callSync('happs', "get_all_apps", {})
    console.log(get_all_apps_result)
    const all_app_details = get_all_apps_result.Ok
    t.equal(all_app_details.length , 1)

    const upvote_result = await alice.callSync('happs', 'upvote_app', {address: app_address})
    console.log(upvote_result)
    t.notEqual(upvote_result.Ok, undefined)

    const get_all_apps_result_after_upvote = await alice.callSync('happs', "get_all_apps", {})
    console.log(get_all_apps_result_after_upvote)
    t.equal(get_all_apps_result_after_upvote.Ok[0].entry[1] , 1)

  })
}
