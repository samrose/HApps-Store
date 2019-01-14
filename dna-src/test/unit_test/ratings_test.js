const test = require('tape');

const App1 = {
  uuid: "762934-19234-123495-12354",
  title: "Errand",
  description: "A better Trello",
  thumbnail: "/IMG.jpg"
}

module.exports = (app) => {

  test('Commit the ratings for a hash', (t) => {

    // commit an app to review
    const app_address = app.call("happs", "main", "create_app", App1).Ok;

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

    const result_0 = app.call("ratings", "main", "create_ratings", ratings_1)
    console.log(result_0)
    t.equal(result_0.Ok.address.length, 46)
    console.log("Commited Rating : ",result_0);

    const result_00 = app.call("ratings", "main", "create_ratings", ratings_2)
    t.equal(result_00.Ok.address.length, 46)
    console.log("Commited Rating : ",result_00);

    const hash = {
      reviewedHash: whoami.hash
    }
    const result_1 = app.call("ratings", "main", "get_ratings", hash)
    console.log("Returned ratings : ",result_1);
    t.equal(result_1.Ok.length,2)

    t.end()
  })

}
