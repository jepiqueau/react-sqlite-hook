<p align="center"><br><img src="https://user-images.githubusercontent.com/236501/85893648-1c92e880-b7a8-11ea-926d-95355b8175c7.png" width="128" height="128" /></p>
<h2 align="center">API HOOK DOCUMENTATION</h2>
<p align="center"><strong><code>react-sqlite-hook@next</code></strong></p>
<p align="center">
  A React Hook to help Capacitor developpers to use <strong><code>@capacitor-community/sqlite@next</code></strong> plugin in React or Ionic/React applications</p>


## Methods Index

<docgen-index>

* [`initWebStore()`](#initwebstore)
* [`saveToStore(...)`](#savetostore)
* [`echo(...)`](#echo)
* [`getPlatform()`](#getplatform)
* [`getCapacitorSQLite()`](#getcapacitorsqlite)
* [`addUpgradeStatement(...)`](#addupgradestatement)
* [`createConnection(...)`](#createconnection)
* [`retrieveConnection(...)`](#retrieveconnection)
* [`retrieveAllConnections()`](#retrieveallconnections)
* [`closeConnection(...)`](#closeconnection)
* [`closeAllConnections()`](#closeallconnections)
* [`isConnection(...)`](#isconnection)
* [`isDatabase(...)`](#isdatabase)
* [`isDatabaseEncrypted(...)`](#isdatabaseencrypted)
* [`isInConfigEncryption()`](#isinconfigencryption)
* [`isInConfigBiometricAuth()`](#isinconfigbiometricauth)
* [`getNCDatabasePath(...)`](#getncdatabasepath)
* [`createNCConnection(...)`](#createncconnection)
* [`retrieveNCConnection(...)`](#retrievencconnection)
* [`closeNCConnection(...)`](#closencconnection)
* [`isNCConnection(...)`](#isncconnection)
* [`isNCDatabase(...)`](#isncdatabase)
* [`getDatabaseList()`](#getdatabaselist)
* [`getMigratableDbList(...)`](#getmigratabledblist)
* [`addSQLiteSuffix(...)`](#addsqlitesuffix)
* [`deleteOldDatabases(...)`](#deleteolddatabases)
* [`importFromJson(...)`](#importfromjson)
* [`isJsonValid(...)`](#isjsonvalid)
* [`copyFromAssets(...)`](#copyfromassets)
* [`getFromHTTPRequest(...)`](#getfromhttprequest)
* [`checkConnectionsConsistency()`](#checkconnectionsconsistency)
* [`isSecretStored()`](#issecretstored)
* [`setEncryptionSecret(...)`](#setencryptionsecret)
* [`changeEncryptionSecret(...)`](#changeencryptionsecret)
* [`clearEncryptionSecret()`](#clearencryptionsecret)
* [`checkEncryptionSecret(...)`](#checkencryptionsecret)
* [`moveDatabasesAndAddSuffix(...)`](#movedatabasesandaddsuffix)
* [Interfaces](#interfaces)

</docgen-index>

* [Listeners](#listeners)

## API Hook

<docgen-api class="custom-css">
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

SQLite Hook Interface

### initWebStore()

```typescript
initWebStore() => Promise<void>
```

Init the web store

**Since:** 2.1.0

--------------------


### saveToStore(...)

```typescript
saveToStore(database: string) => Promise<void>
```

Save the datbase to the web store

| Param          | Type                |
| -------------- | ------------------- |
| **`database`** | <code>string</code> |

**Since:** 2.1.0

--------------------


### echo(...)

```typescript
echo(value: string) => Promise<{ value: string; }>
```

Echo a value

| Param       | Type                |
| ----------- | ------------------- |
| **`value`** | <code>string</code> |

**Returns:** <code>Promise&lt;{ value: string; }&gt;</code>

**Since:** 1.0.0 refactor

--------------------


### getPlatform()

```typescript
getPlatform() => Promise<{ platform: string; }>
```

Get platform

**Returns:** <code>Promise&lt;{ platform: string; }&gt;</code>

**Since:** 1.0.0 refactor

--------------------


### getCapacitorSQLite()

```typescript
getCapacitorSQLite() => Promise<{ plugin: any; }>
```

Get CapacitorSQLite plugin

**Returns:** <code>Promise&lt;{ plugin: any; }&gt;</code>

**Since:** 2.0.3

--------------------


### addUpgradeStatement(...)

```typescript
addUpgradeStatement(dbName: string, upgrade: VersionUpgrade) => Promise<void>
```

Add an Upgrade Statement to Update Database Version

| Param         | Type                                                      | Description                            |
| ------------- | --------------------------------------------------------- | -------------------------------------- |
| **`dbName`**  | <code>string</code>                                       | database name                          |
| **`upgrade`** | <code><a href="#versionupgrade">VersionUpgrade</a></code> | upgrade statement modified since 3.0.1 |

**Since:** 2.0.0

--------------------


### createConnection(...)

```typescript
createConnection(database: string, encrypted?: boolean | undefined, mode?: string | undefined, version?: number | undefined, readonly?: boolean | undefined) => Promise<SQLiteDBConnection>
```

Create a connection to a database

| Param           | Type                 | Description |
| --------------- | -------------------- | ----------- |
| **`database`**  | <code>string</code>  |             |
| **`encrypted`** | <code>boolean</code> |             |
| **`mode`**      | <code>string</code>  |             |
| **`version`**   | <code>number</code>  |             |
| **`readonly`**  | <code>boolean</code> | since 3.0.1 |

**Returns:** <code>Promise&lt;SQLiteDBConnection&gt;</code>

**Since:** 2.0.0 refactor

--------------------


### retrieveConnection(...)

```typescript
retrieveConnection(database: string, readonly?: boolean | undefined) => Promise<SQLiteDBConnection>
```

Retrieve an existing database connection

| Param          | Type                 | Description |
| -------------- | -------------------- | ----------- |
| **`database`** | <code>string</code>  |             |
| **`readonly`** | <code>boolean</code> | since 3.0.1 |

**Returns:** <code>Promise&lt;SQLiteDBConnection&gt;</code>

**Since:** 2.0.0

--------------------


### retrieveAllConnections()

```typescript
retrieveAllConnections() => Promise<Map<string, SQLiteDBConnection>>
```

Retrieve all database connections

**Returns:** <code>Promise&lt;<a href="#map">Map</a>&lt;string, SQLiteDBConnection&gt;&gt;</code>

**Since:** 2.0.0

--------------------


### closeConnection(...)

```typescript
closeConnection(database: string, readonly?: boolean | undefined) => Promise<void>
```

Close a database connection

| Param          | Type                 | Description |
| -------------- | -------------------- | ----------- |
| **`database`** | <code>string</code>  |             |
| **`readonly`** | <code>boolean</code> | since 3.0.1 |

**Since:** 2.0.0

--------------------


### closeAllConnections()

```typescript
closeAllConnections() => Promise<void>
```

Close all database connections

**Since:** 2.0.0

--------------------


### isConnection(...)

```typescript
isConnection(database: string, readonly?: boolean | undefined) => Promise<Result>
```

Check if database connection exists

| Param          | Type                 | Description |
| -------------- | -------------------- | ----------- |
| **`database`** | <code>string</code>  |             |
| **`readonly`** | <code>boolean</code> | since 3.0.1 |

**Returns:** <code>Promise&lt;<a href="#result">Result</a>&gt;</code>

**Since:** 2.0.0

--------------------


### isDatabase(...)

```typescript
isDatabase(database: string) => Promise<Result>
```

Check if database exists

| Param          | Type                |
| -------------- | ------------------- |
| **`database`** | <code>string</code> |

**Returns:** <code>Promise&lt;<a href="#result">Result</a>&gt;</code>

**Since:** 2.0.0

--------------------


### isDatabaseEncrypted(...)

```typescript
isDatabaseEncrypted(database: string) => Promise<Result>
```

Check if a SQLite database is encrypted

| Param          | Type                |
| -------------- | ------------------- |
| **`database`** | <code>string</code> |

**Returns:** <code>Promise&lt;<a href="#result">Result</a>&gt;</code>

**Since:** 3.2.0

--------------------


### isInConfigEncryption()

```typescript
isInConfigEncryption() => Promise<Result>
```

Check encryption value in capacitor.config

**Returns:** <code>Promise&lt;<a href="#result">Result</a>&gt;</code>

**Since:** 3.2.0

--------------------


### isInConfigBiometricAuth()

```typescript
isInConfigBiometricAuth() => Promise<Result>
```

Check encryption value in capacitor.config

**Returns:** <code>Promise&lt;<a href="#result">Result</a>&gt;</code>

**Since:** 3.2.0

--------------------


### getNCDatabasePath(...)

```typescript
getNCDatabasePath(folderPath: string, database: string) => Promise<capNCDatabasePathResult>
```

Get a Non-Conformed database path

| Param            | Type                |
| ---------------- | ------------------- |
| **`folderPath`** | <code>string</code> |
| **`database`**   | <code>string</code> |

**Returns:** <code>Promise&lt;<a href="#capncdatabasepathresult">capNCDatabasePathResult</a>&gt;</code>

**Since:** 2.1.4

--------------------


### createNCConnection(...)

```typescript
createNCConnection(databasePath: string, version?: number | undefined) => Promise<SQLiteDBConnection>
```

Create a Non-Conformed database connection

| Param              | Type                |
| ------------------ | ------------------- |
| **`databasePath`** | <code>string</code> |
| **`version`**      | <code>number</code> |

**Returns:** <code>Promise&lt;SQLiteDBConnection&gt;</code>

**Since:** 2.1.4

--------------------


### retrieveNCConnection(...)

```typescript
retrieveNCConnection(databasePath: string) => Promise<SQLiteDBConnection>
```

Retrieve a Non-Conformed database connection

| Param              | Type                |
| ------------------ | ------------------- |
| **`databasePath`** | <code>string</code> |

**Returns:** <code>Promise&lt;SQLiteDBConnection&gt;</code>

**Since:** 2.1.4

--------------------


### closeNCConnection(...)

```typescript
closeNCConnection(databasePath: string) => Promise<void>
```

Close a Non-Conformed database connection

| Param              | Type                |
| ------------------ | ------------------- |
| **`databasePath`** | <code>string</code> |

**Since:** 2.1.4

--------------------


### isNCConnection(...)

```typescript
isNCConnection(databasePath: string) => Promise<Result>
```

Check if Non-Conformed database connection exists

| Param              | Type                |
| ------------------ | ------------------- |
| **`databasePath`** | <code>string</code> |

**Returns:** <code>Promise&lt;<a href="#result">Result</a>&gt;</code>

**Since:** 2.1.4

--------------------


### isNCDatabase(...)

```typescript
isNCDatabase(databasePath: string) => Promise<Result>
```

Check if Non-Conformed database exists

| Param              | Type                |
| ------------------ | ------------------- |
| **`databasePath`** | <code>string</code> |

**Returns:** <code>Promise&lt;<a href="#result">Result</a>&gt;</code>

**Since:** 2.1.4

--------------------


### getDatabaseList()

```typescript
getDatabaseList() => Promise<capSQLiteValues>
```

Get the database list

**Returns:** <code>Promise&lt;<a href="#capsqlitevalues">capSQLiteValues</a>&gt;</code>

**Since:** 1.0.1 refactor

--------------------


### getMigratableDbList(...)

```typescript
getMigratableDbList(folderPath?: string | undefined) => Promise<capSQLiteValues>
```

Get Migratable database List

| Param            | Type                |
| ---------------- | ------------------- |
| **`folderPath`** | <code>string</code> |

**Returns:** <code>Promise&lt;<a href="#capsqlitevalues">capSQLiteValues</a>&gt;</code>

**Since:** 2.1.1

--------------------


### addSQLiteSuffix(...)

```typescript
addSQLiteSuffix(folderPath?: string | undefined, dbNameList?: string[] | undefined) => Promise<void>
```

Add SQLIte Suffix to existing databases

| Param            | Type                  | Description |
| ---------------- | --------------------- | ----------- |
| **`folderPath`** | <code>string</code>   |             |
| **`dbNameList`** | <code>string[]</code> | since 2.1.1 |

**Since:** 2.0.0

--------------------


### deleteOldDatabases(...)

```typescript
deleteOldDatabases(folderPath?: string | undefined, dbNameList?: string[] | undefined) => Promise<void>
```

Delete Old Cordova databases

| Param            | Type                  | Description |
| ---------------- | --------------------- | ----------- |
| **`folderPath`** | <code>string</code>   |             |
| **`dbNameList`** | <code>string[]</code> | since 2.1.1 |

**Since:** 2.0.0

--------------------


### importFromJson(...)

```typescript
importFromJson(jsonstring: string) => Promise<capSQLiteChanges>
```

Import a database From a JSON

| Param            | Type                | Description |
| ---------------- | ------------------- | ----------- |
| **`jsonstring`** | <code>string</code> | string      |

**Returns:** <code>Promise&lt;<a href="#capsqlitechanges">capSQLiteChanges</a>&gt;</code>

**Since:** 1.0.0 refactor

--------------------


### isJsonValid(...)

```typescript
isJsonValid(jsonstring: string) => Promise<Result>
```

Check the validity of a JSON Object

| Param            | Type                | Description |
| ---------------- | ------------------- | ----------- |
| **`jsonstring`** | <code>string</code> | string      |

**Returns:** <code>Promise&lt;<a href="#result">Result</a>&gt;</code>

**Since:** 1.0.0 refactor

--------------------


### copyFromAssets(...)

```typescript
copyFromAssets(overwrite?: boolean | undefined) => Promise<void>
```

Copy databases from assets to application database folder

| Param           | Type                 | Description |
| --------------- | -------------------- | ----------- |
| **`overwrite`** | <code>boolean</code> | boolean     |

**Since:** 2.0.0

--------------------


### getFromHTTPRequest(...)

```typescript
getFromHTTPRequest(url: string, overwrite?: boolean | undefined) => Promise<void>
```

Get databases from HTTP request to application database folder

| Param           | Type                 | Description |
| --------------- | -------------------- | ----------- |
| **`url`**       | <code>string</code>  | string      |
| **`overwrite`** | <code>boolean</code> | boolean     |

**Since:** 3.0.2

--------------------


### checkConnectionsConsistency()

```typescript
checkConnectionsConsistency() => Promise<Result>
```

Check the consistency between Js Connections
and Native Connections
if inconsistency all connections are removed

**Returns:** <code>Promise&lt;<a href="#result">Result</a>&gt;</code>

**Since:** 2.0.1

--------------------


### isSecretStored()

```typescript
isSecretStored() => Promise<Result>
```

Check if secure secret has been stored

**Returns:** <code>Promise&lt;<a href="#result">Result</a>&gt;</code>

**Since:** 2.0.2

--------------------


### setEncryptionSecret(...)

```typescript
setEncryptionSecret(passphrase: string) => Promise<void>
```

Set an encrypted secret to secure storage
To run only once
Will migrate from GlobalSQLite secret when required

| Param            | Type                |
| ---------------- | ------------------- |
| **`passphrase`** | <code>string</code> |

**Since:** 2.0.2

--------------------


### changeEncryptionSecret(...)

```typescript
changeEncryptionSecret(passphrase: string, oldpassphrase: string) => Promise<void>
```

Change encrypted secret from secure storage
Not to use to migrate from GlobalSQLite secret (run setEncryptionSecret)

| Param               | Type                |
| ------------------- | ------------------- |
| **`passphrase`**    | <code>string</code> |
| **`oldpassphrase`** | <code>string</code> |

**Since:** 2.0.2

--------------------


### clearEncryptionSecret()

```typescript
clearEncryptionSecret() => Promise<void>
```

Clear the encrypted secret from secure storage

**Since:** 3.0.0

--------------------


### checkEncryptionSecret(...)

```typescript
checkEncryptionSecret(passphrase: string) => Promise<Result>
```

Check encryption passphrase

| Param            | Type                |
| ---------------- | ------------------- |
| **`passphrase`** | <code>string</code> |

**Returns:** <code>Promise&lt;<a href="#result">Result</a>&gt;</code>

**Since:** 3.2.0

--------------------


### moveDatabasesAndAddSuffix(...)

```typescript
moveDatabasesAndAddSuffix(folderPath?: string | undefined, dbNameList?: string[] | undefined) => Promise<void>
```

Moves databases to the location the plugin can read them, and adds sqlite suffix
This resembles calling addSQLiteSuffix and deleteOldDatabases, but it is more performant as it doesn't copy but moves the files

| Param            | Type                  | Description                                                                                                                                                       |
| ---------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`folderPath`** | <code>string</code>   | the origin from where to move the databases                                                                                                                       |
| **`dbNameList`** | <code>string[]</code> | the names of the databases to move, check out the getMigratableDbList to get a list, an empty list will result in copying all the databases with '.db' extension. |

--------------------


### Interfaces


#### VersionUpgrade

| Prop             | Type                  |
| ---------------- | --------------------- |
| **`toVersion`**  | <code>number</code>   |
| **`statements`** | <code>string[]</code> |


#### Map

| Prop       | Type                |
| ---------- | ------------------- |
| **`size`** | <code>number</code> |

| Method      | Signature                                                                                                      |
| ----------- | -------------------------------------------------------------------------------------------------------------- |
| **clear**   | () =&gt; void                                                                                                  |
| **delete**  | (key: K) =&gt; boolean                                                                                         |
| **forEach** | (callbackfn: (value: V, key: K, map: <a href="#map">Map</a>&lt;K, V&gt;) =&gt; void, thisArg?: any) =&gt; void |
| **get**     | (key: K) =&gt; V \| undefined                                                                                  |
| **has**     | (key: K) =&gt; boolean                                                                                         |
| **set**     | (key: K, value: V) =&gt; this                                                                                  |


#### Result

| Prop          | Type                 |
| ------------- | -------------------- |
| **`result`**  | <code>boolean</code> |
| **`message`** | <code>string</code>  |


#### capNCDatabasePathResult

| Prop       | Type                | Description     |
| ---------- | ------------------- | --------------- |
| **`path`** | <code>string</code> | String returned |


#### capSQLiteValues

| Prop         | Type               | Description                                                                              |
| ------------ | ------------------ | ---------------------------------------------------------------------------------------- |
| **`values`** | <code>any[]</code> | the data values list as an Array iOS the first row is the returned ios_columns name list |


#### capSQLiteChanges

| Prop          | Type                                        | Description                               |
| ------------- | ------------------------------------------- | ----------------------------------------- |
| **`changes`** | <code><a href="#changes">Changes</a></code> | a returned <a href="#changes">Changes</a> |


#### Changes

| Prop          | Type                | Description                                          |
| ------------- | ------------------- | ---------------------------------------------------- |
| **`changes`** | <code>number</code> | the number of changes from an execute or run command |
| **`lastId`**  | <code>number</code> | the lastId created from a run command                |

</docgen-api>

### Listeners

`Available since 2.0.1`

The listeners are attached to the plugin.

| Listener             | Type               |  Description                                               |
| -------------------- | ------------------ | ---------------------------------------------------------- |
| **onProgressImport** | {progress: string} | Emitted at different steps of the `importFromJson` process |
| **onProgressExport** | {progress: string} | Emitted at different steps of the `exportToJson` process   |

