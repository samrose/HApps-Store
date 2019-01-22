// This test file uses the tape testing framework.
// To learn more, go here: https://github.com/substack/tape
const test = require('tape');

const { Config, Container } = require('@holochain/holochain-nodejs')

const dnaPath = "dist/bundle.json"

// IIFE to keep config-only stuff out of test scope
const container = (() => {
  const agentAlice = Config.agent("alice")

  const dna = Config.dna(dnaPath)

  const instanceAlice = Config.instance(agentAlice, dna)

  const containerConfig = Config.container([instanceAlice])
  return new Container(containerConfig)
})()

// Initialize the Container
container.start()

const app = container.makeCaller('alice', dnaPath)

// require('./unit_test/happs_test')(app);
require('./unit_test/categories_test')(app);
// require('./unit_test/ratings_test')(app);
// require('./unit_test/whoami_test')(app);
