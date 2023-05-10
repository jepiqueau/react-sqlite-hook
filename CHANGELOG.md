## 3.2.1 (2023-05-10)

### Chore

- update to @capacitor/core@4.8.0
- update to @capacitor-community/sqlite@4.8.0-0

## 3.2.0 (2023-03-09)

### Chore

- update to @capacitor/core@4.6.3
- update to @capacitor-community/sqlite@4.6.3-1

### Added Features

 -  checkEncryptionSecret, moveDatabasesAndAddSuffix
 -  isDatabaseEncrypted, isInConfigEncryption, isInConfigBiometricAuth
 
## 3.1.1 (2022-09-25)

### Bug Fixes

- Fix listeners in useEffect

## 3.1.0 (2022-09-24)

### Chore

- update to react@18.2.0

## 3.0.2 (2022-09-23)

### Chore

- update to @capacitor-community/sqlite@4.1.1

### Added Features

- add getFromHTTPRequest

### Bug Fixes

- Fix FeatureNotAvailableError after upgrading from Capacitor 3 to Capacitor 4 issue#324 of @capacitor-community/sqlite as suggested by 
Alexander Kristiansen (axkristiansen)

## 3.0.1 (2022-09-18)

### Added Features

- add readonly to connection 

### Bug Fixes

- Fix addUpgradeStatement

## 3.0.0 (2022-08-29)

### Chore

- update to @capacitor/core 4.1.0
- update to @capacitor-community/sqlite 4.1.0-5

### Added Features

- add clearEncryptionSecret method 

## 2.1.12 (2022-05-21)

### Bug Fixes

- remove peer-dependencies on @capacitor-community/sqlite

## 2.1.11 (2022-05-21)

### Bug Fixes

- fix the peer-dependencies in package.json

## 2.1.10 (2022-05-21)

### Bug Fixes

- fix the peer-dependencies in package.json


## 2.1.9 (2022-05-21)

### Chore

- update to @capacitor/core 3.5.1
- update to @capacitor-community/sqlite 3.5.1-1

### Bug Fixes

- fix the peer-dependencies in package.json

## 2.1.8 (2022-05-09)

### Chore

- update to @capacitor/core 3.5.0
- update to @capacitor-community/sqlite 3.5.0


## 2.1.7 (2022-03-29)

### Bug Fixes

- fix the peer-dependencies in package.json

## 2.1.6 (2022-03-06)

### Chore

- update to @capacitor/core 3.4.1
- update to @capacitor-community/sqlite 3.4.1-1

## 2.1.5 (2021-12-19)

### Bug Fixes

- Fix README.md and some comments

## 2.1.4 (2021-12-19)

### Chore

- update to @capacitor/core 3.3.3
- update to @capacitor-community/sqlite 3.3.3-1

### Added Features

- add non-conformed database test 

## 2.1.2 (2021-11-07)

### Chore

- update to @capacitor/core 3.2.5
- update to @capacitor-community/sqlite 3.2.5

### Added Features

- add `overwrite` parameter to copyFromAssets method

## 2.1.1 (2021-10-18)

### Chore

- update to @capacitor/core 3.2.4
- update to @capacitor-community/sqlite 3.2.4

### Added Features

- add `getMigratableDbList` method (iOS, Android)
- add `dbNameList` paramter to `addSQLiteSuffix`and `deleteOldDatabase`  methods (iOS, Android)


## 2.1.0 (2021-09-25)

### Chore

- update to @capacitor/core 3.2.3
- update to @capacitor-community/sqlite 3.2.3-1

### Added Features

- add `initWebStore` and `saveToStore` methods to Web platform

### Bug Fixes

- Fix useSQLite() when no listeners given

## 2.0.6 (2021-09-15) CAPACITOR 3 LATEST

### Chore

- update to @capacitor/core 3.2.2
- update to @capacitor-community/sqlite 3.2.2-2

## 2.0.5 (2021-08-28) CAPACITOR 3 LATEST

### Bug Fixes

- Fix Electron no listeners

## 2.0.4 (2021-08-28) CAPACITOR 3 LATEST

### Chore

- update to @capacitor/core 3.2.0
- update to @capacitor-community/sqlite 3.2.0-8

### Bug Fixes

- Fix copyFromAssets

## 2.0.3 (2021-08-16) CAPACITOR 3 LATEST

### Chore

- update to @capacitor/core 3.1.2
- update to @capacitor-community/sqlite 3.1.3-3

### Added Features

- add `getCapacitorSQLite` method
- update README.md & APIHook.md

## 2.0.2 (2021-05-07) CAPACITOR 3 NEXT

### Chore

- update to @capacitor/core 3.0.0-rc.1
- update to @capacitor-community/sqlite 3.0.0-beta.13

### Added Features

- add `isSecretStored`, `setEncryptionSecret` & `changeEncryptionSecret` methods
- update README.md & APIHook.md

## 2.0.1 (2021-04-26) NEXT

### Added Features

- add `checkConnectionsConsistency` method
- add `import` & `export` JSON Listeners
- update README.md & APIHook.md

## 2.0.0 (2021-03-20) NEXT

## Chore

- @capacitor/core@3.0.0-rc.0
- @capacitor-community/sqlite@3.0.0-beta.7

## 2.0.0-alpha.1 (2021-01-26) NEXT

## Chore

- @capacitor/core@3.0.0-beta.1
- @capacitor-community/sqlite@3.0.0-beta.2

## 1.0.0 (2021-01-25) REFACTOR

## Chore

- Move to branch 2.9.x tag latest
- @capacitor-community/sqlite@2.9.6

## 1.0.0-beta.4 (2021-01-14) REFACTOR

## Chore

- @capacitor/core@2.4.6
- @capacitor-community/sqlite@2.9.0

### Bug Fixes

- Fix issue#60 remove Android permissions
- Fix readme & changelog
- fix APIHook.md

## 1.0.0-beta.3 (2021-01-05) REFACTOR

## Chore

- @capacitor-community/sqlite@2.9.0-beta.3

### Bug Fixes

- Fix readme & changelog
- fix APIHook.md

## 1.0.0-beta.2 (2021-01-01) REFACTOR

### Bug Fixes

- Fix readme
- Fix test

## 1.0.0-beta.1 (2020-12-28) REFACTOR

## Chore

- @capacitor/core@2.4.5
- @capacitor-community/sqlite@2.9.0-beta.1

## Added Features

- Add importFromJson and isJsonValid methods

## 1.0.0-alpha.4 (2020-12-05) REFACTOR

### Bug Fixes

- Fix readme

## 1.0.0-alpha.3 (2020-12-04) REFACTOR

### Added Features

 - getPlatform

### Bug Fixes

 - fix new SQLiteConnection with useMemo()


## 1.0.0-alpha.2 (2020-12-03) REFACTOR

### Chore

- @capacitor-community/sqlite@2.9.0-alpha.5

## 1.0.0-alpha.1 (2020-12-02) REFACTOR

### Chore

- @capacitor-community/sqlite@refactor

### Added Features

 - echo
 - createConnection
 - closeConnection
 - retrieveConnection
 - closeAllConnections
 - retrieveAllConnections
 - addUpgradeStatement
 - requestPermissions

## 0.0.9 (2021-01-25)

### Chores

- Has been moved to tag 'INITIAL' not maintained anymore

### Bug Fixes

- Update README

## 0.0.8 (2021-01-13)

### Bug Fixes

- Fix readme


## 0.0.7 (2020-11-14)

### Bug Fixes

- Fix requestPermissions remove listener for Android

## 0.0.6 (2020-11-13)

### Bug Fixes

- Fix readme

## 0.0.5 (2020-11-13)

### Added Features

- Add requestPermissions method for Android

## 0.0.4 (2020-10-23)

### Bug Fixes

- Add version to OpenDB

## 0.0.3 (2020-10-16)

### Chores

- @capacitor-community/sqlite: 2.4.2-6

## 0.0.2 (2020-10-07)

### Chores

- @capacitor-community/sqlite: 2.4.2-4

## 0.0.1 (2020-10-01)

### Chores

- @capacitor/core: update 2.4.2
- react: 16.13.1
- @capacitor-community/sqlite: 2.4.2-2
