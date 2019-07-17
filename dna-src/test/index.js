const path = require('path')
const tape = require('tape')

const { Orchestrator, tapeExecutor, backwardCompatibilityMiddleware } = require('@holochain/try-o-rama')
const spawnConductor = require('./spawn_conductors')

process.on('unhandledRejection', error => {
  console.error('got unhandledRejection:', error);
});

const dnaPath = path.join(__dirname, "../dist/dna-src.dna.json")
const dna = Orchestrator.dna(dnaPath, 'hAS')

const commonConductorConfig = {
  instances: {
    app: dna,
  },
}

const orchestratorSimple = new Orchestrator({
  conductors: {
    liza: commonConductorConfig,
    jack: commonConductorConfig,
  },
  debugLog: true,
  executor: tapeExecutor(require('tape')),
  middleware: backwardCompatibilityMiddleware,
})

require('./single_agent_tests/categories_test')(orchestratorSimple.registerScenario);
require('./single_agent_tests/happs_test')(orchestratorSimple.registerScenario);
require('./single_agent_tests/whoami_test')(orchestratorSimple.registerScenario);
require('./multi_agent_tests/upvote_test')(orchestratorSimple.registerScenario);

const run = async () => {
  const liza = await spawnConductor('liza', 3000)
  await orchestratorSimple.registerConductor({name: 'liza', url: 'http://0.0.0.0:3000'})
  const jack = await spawnConductor('jack', 4000)
  await orchestratorSimple.registerConductor({name: 'jack', url: 'http://0.0.0.0:4000'})

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
  console.log("Waiting for conductors to settle...")
  await delay(5000)
  console.log("Ok, starting tests!")

  await orchestratorSimple.run()
  liza.kill()
  jack.kill()
  process.exit()
}

run()
