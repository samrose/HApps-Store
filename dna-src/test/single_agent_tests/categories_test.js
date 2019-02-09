const test = require('tape');

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

  scenario.runTape('add Category ', (t, {alice}) => {

    const app_address = alice.call("happs", "create_app", App1).Ok;
    t.equal(app_address.length, 46)
    console.log("APP ADDRESS:: ",app_address);

    const app_address2 = alice.call("happs", "create_app", App2).Ok;
    t.equal(app_address2.length, 46)
    console.log("APP ADDRESS:: ",app_address2);

    const result1 = alice.call("happs", "add_app_to_category", {app_address: app_address, category: "good apps",})
    console.log(result1)
    t.equal(result1.Ok, null)

    const result2 = alice.call("happs", "add_app_to_category", {app_address: app_address2, category: "good apps",})
    console.log(result2)
    t.equal(result2.Ok, null)

    alice.call("happs", "get_apps_by_category", {category:"good apps"})
    const result3 = alice.call("happs", "get_apps_by_category", {category:"good apps"})
    t.equal(result3.Ok.length, 2)
  })
}
