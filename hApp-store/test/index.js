const path = require('path')
const tape = require('tape')

const { Diorama, tapeExecutor, backwardCompatibilityMiddleware } = require('@holochain/diorama')

process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  console.error('got unhandledRejection:', error);
});

const dnaPath = path.join(__dirname, "../dist/hApp-store.dna.json")
const dna = Diorama.dna(dnaPath, 'hAS')

const singleAgentConductor = new Diorama({
  instances: {
    liza: dna,
  },
  debugLog: false,
  executor: tapeExecutor(require('tape')),
  middleware: backwardCompatibilityMiddleware,
})

require('./single_agent_tests/categories_test')(singleAgentConductor.registerScenario);
require('./single_agent_tests/happs_test')(singleAgentConductor.registerScenario);
require('./single_agent_tests/whoami_test')(singleAgentConductor.registerScenario);


const multiAgentConductor = new Diorama({
  instances: {
    liza: dna,
    jack: dna,
  },
  debugLog: false,
  executor: tapeExecutor(require('tape')),
  middleware: backwardCompatibilityMiddleware,
})
require('./multi_agent_tests/upvote_test')(multiAgentConductor.registerScenario);

singleAgentConductor.run()
multiAgentConductor.run()
