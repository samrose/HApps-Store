const test = require('tape');

module.exports = (app) => {
  test('get user address', (t) => {
    t.plan(1)
    const result = app.call("whoami", "main", "get_user", {})
    t.equal(result.hash, "QmeQPvoUwXXskAJtyBUNPX7ks8MoazmcSvKnvtYTVrBGNM")
  })
}
