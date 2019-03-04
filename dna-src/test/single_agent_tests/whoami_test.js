
module.exports = (scenario) => {
  scenario.runTape('get user address', async (t, {alice}) => {
    const result = await alice.callSync("whoami", "get_user", {})
    console.log(result)
    t.equal(result.Ok.hash.length, 92) // agent addresses are 92 chars long?
  })
}
