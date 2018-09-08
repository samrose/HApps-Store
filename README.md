# HApps-Store

![GitHub last commit](https://img.shields.io/github/last-commit/Holo-Host/HApps-Store.svg)
![GitHub](https://img.shields.io/github/license/Holo-Host/HApps-Store.svg)

---
The Holochain of Holochains Directory
This is the App store that all the users  would use to Check out all the HApps that are Available on the HCHC

> Notes:
> Will be able to be run the HC Admin GUI for installing apps.
> Otherwise should not control your system

---

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Ensure holochain-proto (at least version 26) is installed on your machine by running.

```
hcd -v
```

Subsequent steps also assumes npm/yarn is installed.

### Installing

The app can now be started for development purposes using
```
npm run hc:dev
```
and opening the browser to http://localhost:4141

---
If you would like to persist data between sessions install to the local holochain directory by running the following from the project root directory:
```
hcadmin init <id/name string>
hcadmin join ./build/ HCHC
hcd HCHC
```

## Built With

* [Holochain](https://github.com/holochain/holochain-proto)
* [Typescript](https://github.com/Microsoft/TypeScript)
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)

## Authors

* **Joel Ulahanna** - [Zo-El](https://github.com/zo-el)
* **Lisa Jetton** - [JettTech](https://github.com/JettTech)

## License

This project is licensed under the GPL-3 License - see the [LICENSE.md](LICENSE.md) file for details
