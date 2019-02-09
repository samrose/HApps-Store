const test = require('tape');

const App1 = {
  title: "HoloChat",
  description: "A better Chat",
  thumbnail_url: "/IMG.jpg",
  homepage_url: "home/page",
  dna_url: "/dna/url",
  ui_url: "ui/url",
}


module.exports = (scenario) => {

  scenario.runTape('Commit the ratings for a hash', (t, {alice}) => {

    // commit an app to review
    const app_address = alice.call("happs", "create_app", App1).Ok;
    console.log(app_address)

    const ratings_1 = {
        rate: "5",
        review: "The best review ever",
        reviewed_hash: app_address
    }
    const ratings_2 = {
        rate: "4",
        review: "The Second best review ever",
        reviewed_hash: app_address
    }

    const result_0 = alice.call("happs", "create_ratings", ratings_1)
    console.log(result_0)
    t.equal(result_0.Ok.length, 46)
    console.log("Commited Rating : ",result_0);

    const result_00 = alice.call("happs", "create_ratings", ratings_2)
    t.equal(result_00.Ok.length, 46)
    console.log("Commited Rating : ",result_00);

    const hash = {
      reviewed_hash: app_address
    }

    alice.call("happs", "get_ratings", hash)
    const result_1 = alice.call("happs", "get_ratings", hash)
    console.log("Returned ratings : ",result_1);
    t.equal(result_1.Ok.length,2)
  })

}
