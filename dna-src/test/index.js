const { Config, Container, Scenario } = require('@holochain/holochain-nodejs')
Scenario.setTape(require('tape'))
const dnaPath = "dist/bundle.json"
const dna = Config.dna(dnaPath, 'happs')
const agentAlice = Config.agent("alice")
const instanceAlice = Config.instance(agentAlice, dna)
const scenario = new Scenario([instanceAlice])

require('./test_runners/happs_test')(scenario);
require('./test_runners/categories_test')(scenario);
require('./test_runners/ratings_test')(scenario);
require('./test_runners/whoami_test')(scenario);
