const { Config, Container, Scenario } = require('@holochain/holochain-nodejs')
Scenario.setTape(require('tape'))
const dnaPath = "dist/bundle.json"
const dna = Config.dna(dnaPath, 'happs')

const agentAlice = Config.agent("alice")
const instanceAlice = Config.instance(agentAlice, dna)

const agentBob = Config.agent("bob")
const instanceBob = Config.instance(agentBob, dna)

const singleUserScenario = new Scenario([instanceAlice])
require('./single_agent_tests/happs_test')(singleUserScenario);
require('./single_agent_tests/categories_test')(singleUserScenario);
require('./single_agent_tests/whoami_test')(singleUserScenario);

const multiUserScenario = new Scenario([instanceAlice, instanceBob])
require('./multi_agent_tests/upvote_test')(multiUserScenario);

