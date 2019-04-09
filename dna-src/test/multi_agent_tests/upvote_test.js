const App1 = {
  title: "HoloChat",
  description: "A better Chat",
  thumbnail_url: "/IMG.jpg",
  homepage_url: "home/page",
  dna_url: "/dna/url",
  ui_url: "ui/url",
}

module.exports = (scenario) => {

  scenario.runTape('Create an app, add dna+ui bundles and retrieve', async (t, {alice, bob}) => {
  	// alice creates an app
  	const create_result = await alice.callSync("happs", "create_app", App1);
    console.log(create_result)
    const app_address = create_result.Ok
    t.equal(app_address.length, 46)

    //bob upvotes it
    const upvote_result = await bob.callSync('happs', 'upvote_app', {app_address: app_address})
    console.log(upvote_result)
    t.notEqual(upvote_result.Ok, undefined)

    // bob can see it
    const bob_get_all_apps_result_after_upvote = await bob.callSync('happs', "get_all_apps", {})
    console.log(bob_get_all_apps_result_after_upvote)
    t.equal(bob_get_all_apps_result_after_upvote.Ok[0].upvotes , 1)
    t.equal(bob_get_all_apps_result_after_upvote.Ok[0].upvotedByMe , true)

    // alice can see it
    const alice_get_all_apps_result_after_upvote = await alice.callSync('happs', "get_all_apps", {})
    console.log(alice_get_all_apps_result_after_upvote)
    t.equal(alice_get_all_apps_result_after_upvote.Ok[0].upvotes , 1)
    t.equal(alice_get_all_apps_result_after_upvote.Ok[0].upvotedByMe , false)
  })

}