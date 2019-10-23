const { one } = require('../config')
const App1 = {
  title: "HoloChat",
  description: "A better Chat",
  thumbnail_url: "/IMG.jpg",
  homepage_url: "home/page",
  dnas: [{
    location: "/dna/url",
    hash: "QmHash",
    handle: "holochat",
  }],
  ui: {
    location: "ui/url",
    hash: "QmHash",
  }
}

module.exports = (scenario) => {

  scenario('Create an app, add dna+ui bundles and retrieve', async (s, t) => {

    const { liza, jack } = await s.players({liza: one('liza'),jack: one('jack')}, true)

  	// liza creates an app
    const create_result = await liza.call( "app", "happs", "create_app", App1);
    console.log(create_result)
    const app_address = create_result.Ok
    t.equal(app_address.length, 46)

    //jack upvotes it
    const upvote_result = await jack.call( "app", 'happs', 'upvote_app', {app_address: app_address})
    console.log(upvote_result)
    t.notEqual(upvote_result.Ok, undefined)

    // jack can see it
    const jack_get_all_apps_result_after_upvote = await jack.call( "app", 'happs', "get_all_apps", {})
    console.log(jack_get_all_apps_result_after_upvote)
    t.equal(jack_get_all_apps_result_after_upvote.Ok[0].upvotes , 1)
    t.equal(jack_get_all_apps_result_after_upvote.Ok[0].upvotedByMe , true)

    // liza can see it
    const liza_get_all_apps_result_after_upvote = await liza.call( "app", 'happs', "get_all_apps", {})
    console.log(liza_get_all_apps_result_after_upvote)
    t.equal(liza_get_all_apps_result_after_upvote.Ok[0].upvotes , 1)
    t.equal(liza_get_all_apps_result_after_upvote.Ok[0].upvotedByMe , false)

    await liza.kill()
    await jack.kill()
  })

}
