const test = require('tape');

module.exports = (app) => {

  test('Commit the ratings for a hash', (t) => {
    t.plan(1)
    const whoami = app.call("whoami", "main", "get_user", {})
    let ratings_1= {
        rate: "5",
        review: "The best review ever",
        reviewedHash:whoami.hash
    }
    let ratings_2= {
        rate: "4",
        review: "The Second best review ever",
        reviewedHash:whoami.hash
    }

    const result_0 = app.call("ratings", "main", "create_ratings", ratings_1)
    t.equal(result_0.address.length, 46)
    // console.log("Commited Rating : ",result_0);

    t.plan(2)
    const result_00 = app.call("ratings", "main", "create_ratings", ratings_2)
    t.equal(result_00.address.length, 46)
    // console.log("Commited Rating : ",result_00);


    t.plan(3)
    let hash = {
      reviewedHash:whoami.hash
    }
    const result_1 = app.call("ratings", "main", "get_ratings", hash)
    // console.log("Returned Ratigns : ",result_1);
    t.equal(result_1.length,2)

  })

}
