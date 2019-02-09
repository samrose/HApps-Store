
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

  scenario.runTape('Create an app, add dna+ui bundles and retrieve', (t, {alice}) => {
    const create_result = alice.call("happs", "create_app", App1);
    console.log(create_result)
    const app_address = create_result.Ok
    t.equal(app_address.length, 46)

    alice.call("happs", "create_app", App2);

    const get_app_result = alice.call('happs', "get_app", {app_hash:app_address})
    console.log(get_app_result)
    const app_details = get_app_result.Ok
    t.equal(app_details.uuid, App1.uuid)

    alice.call('happs', "get_all_apps", {})
    const get_all_apps_result = alice.call('happs', "get_all_apps", {})
    console.log(get_all_apps_result)
    const all_app_details = get_all_apps_result.Ok
    t.equal(all_app_details.length , 2)
  })
}
