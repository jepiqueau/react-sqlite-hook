<p align="center"><br><img src="https://avatars3.githubusercontent.com/u/16580653?v=4" width="128" height="128" /></p>

<h3 align="center">React Hook for <code>@capacitor-community/sqlite@latest</code> plugin</h3>
<p align="center"><strong><code>react-sqlite-hook@latest</code></strong></p>
<br>
<p align="center"><strong><code>Capacitor 4</code></strong></p>
<br>
<p align="center">
  A React Hook to help Capacitor developpers to use <strong><code>@capacitor-community/sqlite@latest</code></strong> plugin in React or Ionic/React applications
</p>

<br>
<p align="center">
    <img src="https://img.shields.io/maintenance/yes/2022?style=flat-square" />
    <a href="https://www.npmjs.com/package/react-sqlite-hook"><img src="https://img.shields.io/npm/l/react-sqlite-hook?style=flat-square" /></a>
<br>
  <a href="https://www.npmjs.com/package/react-sqlite-hook"><img src="https://img.shields.io/npm/dw/react-sqlite-hook?style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/react-sqlite-hook"><img src="https://img.shields.io/npm/v/react-sqlite-hook/next?style=flat-square" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
<a href="#contributors-"><img src="https://img.shields.io/badge/all%20contributors-1-orange?style=flat-square" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
</p>
<br>

## @LATEST For Capacitor 4 (Master)

The `Capacitor4`react-sqlite-hook interfacing the `@capacitor-community/sqlite@latest`

## For Capacitor 3 (v2.1.12)

The `Capacitor3`react-sqlite-hook interfacing the `@capacitor-community/sqlite@3.7.0`

## @REFACTOR REFACTOR 🚀 (Move to branch 2.9.x)

The `refactor` react-sqlite-hook interfacing the `@capacitor-community/sqlite@refactor`

## @INITIAL 🛑 (Move to branch 2.4.x)

The `initial` react-sqlite-hook interfacing the `@capacitor-community/sqlite@initial`. !!! The MAINTAINANCE is now STOPPED !!!
<br>

## Maintainers

| Maintainer        | GitHub                                    | Social |
| ----------------- | ----------------------------------------- | ------ |
| Quéau Jean Pierre | [jepiqueau](https://github.com/jepiqueau) |        |


## Installation

```bash
npm install --save @capacitor-community/sqlite@next
npm install --save-dev react-sqlite-hook@next
```
## Supported methods

| Name                        | Android | iOS | Electron | Web |
| :-------------------------- | :------ | :-- | :------- | :-- |
| echo                        | ✅      | ✅   | ✅       | ✅  |
| getPlatform                 | ✅      | ✅   | ✅       | ✅  |
| getCapacitorSQLite          | ✅      | ✅   | ✅       | ✅  |
| addUpgradeStatement         | ✅      | ✅   | ✅       | ✅  |
| createConnection            | ✅      | ✅   | ✅       | ✅  |
| retrieveConnection          | ✅      | ✅   | ✅       | ✅  |
| retrieveAllConnections      | ✅      | ✅   | ✅       | ✅  |
| closeConnection             | ✅      | ✅   | ✅       | ✅  |
| closeAllConnections         | ✅      | ✅   | ✅       | ✅  |
| isConnection                | ✅      | ✅   | ✅       | ✅  |
| isDatabase                  | ✅      | ✅   | ✅       | ✅  |
| getDatabaseList             | ✅      | ✅   | ✅       | ✅  |
| getMigratableDbList         | ✅      | ✅   | ❌       | ❌  |
| addSQLiteSuffix             | ✅      | ✅   | ❌       | ❌  |
| deleteOldDatabases          | ✅      | ✅   | ❌       | ❌  |
| importFromJson              | ✅      | ✅   | ✅       | ✅  |
| isJsonValid                 | ✅      | ✅   | ✅       | ✅  |
| copyFromAssets              | ✅      | ✅   | ✅       | ✅  |
| checkConnectionsConsistency | ✅      | ✅   | ✅       | ✅  |
| isSecretStored              | ✅      | ✅   | ❌       | ❌  |
| setEncryptionSecret         | ✅      | ✅   | ❌       | ❌  |
| changeEncryptionSecret      | ✅      | ✅   | ❌       | ❌  |
| clearEncryptionSecret       | ✅      | ✅   | ❌       | ❌  |
| removeListeners             | ✅      | ✅   | ✅       | ✅  |
| initWebStore                | ❌      | ❌   | ❌       | ✅  |
| saveToStore                 | ❌      | ❌   | ❌       | ✅  |
| getNCDatabasePath           | ✅      | ✅   | ❌       | ❌  |
| createNCConnection          | ✅      | ✅   | ❌       | ❌  |
| closeNCConnection           | ✅      | ✅   | ❌       | ❌  |
| retrieveNCConnection        | ✅      | ✅   | ❌       | ❌  |
| isNCConnection              | ✅      | ✅   | ❌       | ❌  |
| isNCDatabase                | ✅      | ✅   | ❌       | ❌  |
| getFromHTTPRequest          | ✅      | ✅   | ✅       | ✅  |


## Supported listeners

| Name             | Android | iOS | Electron | Web |
| :--------------- | :------ | :-- | :------- | :-- |
| onProgressImport | ✅      | ✅   | 🚧       | ✅  |
| onProgressExport | ✅      | ✅   | 🚧       | ✅  |


## Documentation

- [API Hook](https://github.com/jepiqueau/react-sqlite-hook/tree/master/docs/APIHook.md)


## Applications demonstrating the use of the plugin and the react hook

 - [react-sqlite-app-starter](https://github.com/jepiqueau/react-sqlite-app-starter)


## Usage 

The usage of `react-sqlite-hook`is demonstrated in

- [Ionic/React_Usage_Documentation](https://github.com/capacitor-community/sqlite/blob/master/docs/Ionic-React-Usage.md)



## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/jepiqueau"><img src="https://avatars3.githubusercontent.com/u/16580653?v=4" width="100px;" alt=""/><br /><sub><b>Jean Pierre Quéau</b></sub></a><br /><a href="https://github.com/jepiqueau/react-sqlite-hook/commits?author=jepiqueau" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!



