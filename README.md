# HApps-Store

![GitHub last commit](https://img.shields.io/github/last-commit/holochain/HApps-Store.svg)
![GitHub](https://img.shields.io/github/license/holochain/HApps-Store.svg)
[![CircleCI](https://circleci.com/gh/holochain/hApp-Store.svg?style=svg)](https://circleci.com/gh/holochain/hApp-Store)
---
An early version of the Holochain hApp store.

This version exists to allow participants of the Holo closed alpha program to find and install DNAs to host.

---

## Test DNA
`make test`

## Building and Running

### Build Holochain DNA

The DNA builds with Holochain. Ensure you have the holochain developer cli `hc` and holochain conductor `holochain` installed that match this version.  The simplest way to ensure this is to use holoportos' Nix configuration, and then (once a compatible Nix environment has been created), running `make install` to build into `dna-src/dist/hApp-store.dna.json`

```
$ git clone git@github.com:holochain/hApp-store.git
$ cd hApp-store
$ nix-shell
[nix-shell:~/src/hApp-store]$ make install
$ make install
mkdir -p dna-src/dist/
cd dna-src && hc package --output dist/hApp-store.dna.json --strip-meta
> cargo build --release --target=wasm32-unknown-unknown
...
Finished release [optimized] target(s) in 0.06s
Created DNA package file at "dist/hApp-store.dna.json"
DNA hash: Qmd6pArbijQ3ija5FnyrMaZirXJL83afbj8DJGuAENAdM9
```

Holochain DNA Rust Unit tests and Node Scenario tests can be run:

```
[nix-shell:~/src/hAPp-store]$ make test
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

Copyright (C) 2017, The MetaCurrency Project (Eric Harris-Braun, Arthur Brock, et. al.)

This program is free software: you can redistribute it and/or modify it under the terms of the license provided in the LICENSE file (GPLv3.0). This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

Note: We are considering other 'looser' licensing options (like MIT license) but at this stage are using GPL while we're getting the matter sorted out.
