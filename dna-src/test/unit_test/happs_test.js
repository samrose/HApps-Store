const test = require('tape');

const App1 = {
  uuid: "762934-19234-123495-12354",
  title: "Errand",
  description: "A better Trello",
  thumbnail: "/IMG.jpg"
}
const App2 = {
  uuid: "762932-14534-16495-19852",
  title: "Clutter",
  description: "A better Twiter",
  thumbnail: "/IMG.jpg"
}

module.exports = (app) => {

  test('Create an app, add dna+ui bundles and retrieve', (t) => {
    const create_result = app.call("happs", "main", "create_app", App1);
    console.log(create_result)
    const app_address = create_result.Ok
    t.equal(app_address.length, 46)

    app.call("happs", "main", "create_app", App2);

    const add_dna_result = app.call("happs", "main", "add_dna", {
      app_hash: app_address,
      dna_bundle: "link/to/dna/bundle"
    })
    console.log(add_dna_result)
    const dna_bundle_hash = add_dna_result.Ok
    t.equal(dna_bundle_hash.length, 46)


    app.call("happs", "main", "get_dna", {
      app_hash: app_address
    })
    app.call("happs", "main", "get_dna", {
      app_hash: app_address
    })
    const get_dna_result = app.call("happs", "main", "get_dna", {
      app_hash: app_address
    })
    console.log(get_dna_result)
    const dna_bundle = get_dna_result.Ok
    t.equal(dna_bundle.dna_bundle, "link/to/dna/bundle")

    const get_app_result = app.call('happs', "main", "get_app", {app_hash:app_address})
    console.log(get_app_result)
    const app_details = get_app_result.Ok
    t.equal(app_details.uuid, App1.uuid)

    const add_ui_result = app.call("happs", "main", "add_ui", {
      app_hash: app_address,
      ui_bundle: "link/to/ui/bundle"
    })
    const ui_bundle_hash = add_ui_result.Ok
    t.equal(ui_bundle_hash.length, 46)


    app.call("happs", "main", "get_ui", {
      app_hash: app_address
    })
    app.call("happs", "main", "get_ui", {
      app_hash: app_address
    })
    app.call("happs", "main", "get_ui", {
      app_hash: app_address
    })
    app.call("happs", "main", "get_ui", {
      app_hash: app_address
    })
    const get_ui_result = app.call("happs", "main", "get_ui", {
      app_hash: app_address
    })
    console.log(get_ui_result)
    const ui_bundle = get_ui_result.Ok
    t.equal(ui_bundle.ui_bundle, "link/to/ui/bundle")


    app.call('happs', "main", "get_all_apps", {})
    app.call('happs', "main", "get_all_apps", {})
    const get_all_apps_result = app.call('happs', "main", "get_all_apps", {})
    console.log(get_all_apps_result)
    const all_app_details = get_all_apps_result.Ok
    t.equal(all_app_details.length , 2)

    t.end()
  })
}
