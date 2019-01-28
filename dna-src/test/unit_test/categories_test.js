const test = require('tape');

const App1 = {
  uuid: "762934-19234-123495-12354",
  title: "Errand",
  description: "A better Trello",
  thumbnail: "/IMG.jpg"
}

const App2 = {
  uuid: "762934-1234534-123495-12354",
  title: "Lisa",
  description: "A better Lisa",
  thumbnail: "/IMG.jpg"
}

module.exports = (app) => {

  test('add Category ', (t) => {

    const app_address = app.call("happs", "main", "create_app", App1).Ok;
    t.equal(app_address.length, 46)
    console.log("APP ADDRESS:: ",app_address);

    const app_address2 = app.call("happs", "main", "create_app", App2).Ok;
    t.equal(app_address2.length, 46)
    console.log("APP ADDRESS:: ",app_address2);

    const result1 = app.call("happs", "main", "add_app_to_category", {app_address: app_address, category: "good apps",})
    console.log(result1)
    t.equal(result1.Ok, null)

    const result2 = app.call("happs", "main", "add_app_to_category", {app_address: app_address2, category: "good apps",})
    console.log(result2)
    t.equal(result2.Ok, null)

    app.call("happs", "main", "get_apps_by_category", {category:"good apps"})
    app.call("happs", "main", "get_apps_by_category", {category:"good apps"})
    app.call("happs", "main", "get_apps_by_category", {category:"good apps"})
    const result3 = app.call("happs", "main", "get_apps_by_category", {category:"good apps"})
    t.equal(result3.Ok.length, 2)

    t.end()
  })
}
