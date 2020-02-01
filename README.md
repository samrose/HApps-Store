# happ-store

[![Project](https://img.shields.io/badge/project-holochain-blue.svg?style=flat-square)](http://holochain.org/)
[![Chat](https://img.shields.io/badge/chat-chat%2eholochain%2enet-blue.svg?style=flat-square)](https://chat.holochain.org)
[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)
[![Twitter Follow](https://img.shields.io/twitter/follow/holochain.svg?style=social&label=Follow)](https://twitter.com/holochain)
![GitHub last commit](https://img.shields.io/github/last-commit/holochain/happ-store.svg)
[![CircleCI](https://circleci.com/gh/holochain/happ-store?style=svg)](https://circleci.com/gh/holochain/happ-store)
---
An early version of the Holochain happ store.

---

## Test DNA
`make test`

## Building and Running

### Build Holochain DNA

The DNA builds with Holochain. Ensure you have the holochain developer cli `hc` and holochain conductor `holochain` installed that match this version.  The simplest way to ensure this is to use holoportos' Nix configuration, and then (once a compatible Nix environment has been created), running `make install` to build into `dist/happ-store.dna.json`

```
$ git clone git@github.com:holochain/happ-store.git
$ cd happ-store
$ nix-shell
[nix-shell:~/src/happ-store]$ make install
$ make install
hc package 
> cargo build --release --target=wasm32-unknown-unknown
...
Finished release [optimized] target(s) in 0.06s
Created DNA package file at "dist/happ-store.dna.json"
DNA hash: Qmd6pArbijQ3ija5FnyrMaZirXJL83afbj8DJGuAENAdM9
```

Holochain DNA Rust Unit tests and Node Scenario tests can be run:

```
[nix-shell:~/src/happ-store]$ make test
...
✓ add Category
✓ Create an app, add dna+ui bundles and retrieve
✓ Create an app, add dna+ui bundles and retrieve
✓ get user address
# tests 18
# pass  18
✓ ok
```

### Build UI

Ensure `npm` is installed and run

```
npm run build
```

This will build the UI into the `ui/` directory

### Running in the Holochain conductor

Ensure the holochain conductor binary is on your path and run the npm helper script

```
npm run hc:start
```

Alternatively you can start it using the conductor directly by running

```
holochain -c ./conductor-config.toml
```


## Built With

* [Holochain v0.0.24-alpha2](https://github.com/holochain/holochain-rust)
* [Typescript](https://github.com/Microsoft/TypeScript)
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)

## Authors

* **Joel Ulahanna** - [Zo-El](https://github.com/zo-el)
* **Lisa Jetton** - [JettTech](https://github.com/JettTech)
* **Willem Olding** - [willemolding](https://github.com/willemolding/)

## License
[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)

Copyright (C) 2017 - 2019, Holochain Foundation

This program is free software: you can redistribute it and/or modify it under the terms of the license p
rovided in the LICENSE file (GPLv3).  This program is distributed in the hope that it will be useful, bu
t WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR
 PURPOSE.

**Note:** We are considering other 'looser' licensing options (like MIT license) but at this stage are using GPL while we're getting the matter sorted out.  See [this article](https://medium.com/holochain/licensing-needs-for-truly-p2p-software-a3e0fa42be6c) for some of our thinking on licensing for distributed application frameworks.
