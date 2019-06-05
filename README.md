# HApps-Store

![GitHub last commit](https://img.shields.io/github/last-commit/holochain/HApps-Store.svg)
![GitHub](https://img.shields.io/github/license/holochain/HApps-Store.svg)

---
An early version of the Holochain hApp store.

This version exists to allow participants of the Holo closed alpha program to find and install DNAs to host. 

---

## Building and Running

### Build Holochain DNA

The DNA builds with Holochain. Ensure you have the holochain developer cli `hc` and holochain conductor `holochain` installed that match this version. Then run from the project root
```
npm run hc:build
```

This should build the dna in to the `dna/` directory.

Holochain tests can be run using `npm run hc:test`

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

* [Holochain v0.0.18-alpha1](https://github.com/holochain/holochain-rust)
* [Typescript](https://github.com/Microsoft/TypeScript)
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)

## Authors

* **Joel Ulahanna** - [Zo-El](https://github.com/zo-el)
* **Lisa Jetton** - [JettTech](https://github.com/JettTech)
* **Willem Olding** - [willemolding](https://github.com/willemolding/)

## License

This project is licensed under the GPL-3 License - see the [LICENSE.md](LICENSE.md) file for details
