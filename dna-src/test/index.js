// This test file uses the tape testing framework.
// To learn more, go here: https://github.com/substack/tape
const test = require('tape');
const Container = require('@holochain/holochain-nodejs');

// instantiate an app from the DNA JSON bundle
const app = Container.loadAndInstantiate("dist/bundle.json")

// activate the new instance
app.start()
require('./unit_test/ratings_test')(app);
// require('./unit_test/whoami_test')(app);
// require('./unit_test/happs_test')(app);
// require('./unit_test/categories_test')(app);
