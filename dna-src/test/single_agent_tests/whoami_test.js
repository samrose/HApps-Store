
module.exports = (scenario) => {
  scenario.runTape('get user address', async (t, {alice}) => {
    const result = await alice.callSync("whoami", "get_user", {})
    console.log(result)
    t.equal(result.Ok.hash.length, 63) // agent addresses are 63 chars long
  })
}
