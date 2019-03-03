const { Config, Container, Scenario } = require('@holochain/holochain-nodejs')
Scenario.setTape(require('tape'))
const dnaPath = "dist/bundle.json"
const dna = Config.dna(dnaPath, 'happs')
const agentAlice = Config.agent("alice")
const instanceAlice = Config.instance(agentAlice, dna)
const scenario = new Scenario([instanceAlice])

require('./single_agent_tests/happs_test')(scenario);
require('./single_agent_tests/categories_test')(scenario);
require('./single_agent_tests/whoami_test')(scenario);
