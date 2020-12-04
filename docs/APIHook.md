<p align="center"><br><img src="https://user-images.githubusercontent.com/236501/85893648-1c92e880-b7a8-11ea-926d-95355b8175c7.png" width="128" height="128" /></p>
<h2 align="center">API HOOK DOCUMENTATION</h2>
<p align="center"><strong><code>react-sqlite-hook</code></strong></p>
<p align="center">
  A React Hook to help Capacitor developpers to use <strong><code>@capacitor-community/sqlite</code></strong> plugin in React or Ionic/React applications</p>


## Methods Index

<docgen-index>

* [`echo(...)`](#echo)
* [`getPlatform()`](#getplatform)
* [`addUpgradeStatement(...)`](#addupgradestatement)
* [`createConnection(...)`](#createconnection)
* [`retrieveConnection(...)`](#retrieveconnection)
* [`retrieveAllConnections()`](#retrieveallconnections)
* [`closeConnection(...)`](#closeconnection)
* [`closeAllConnections()`](#closeallconnections)
* [`requestPermissions()`](#requestpermissions)
* [Interfaces](#interfaces)

</docgen-index>

## API Hook

<docgen-api class="custom-css">
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

SQLite Hook Interface

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


### addUpgradeStatement(...)

```typescript
addUpgradeStatement(dbName: string, upgrade: VersionUpgrade) => Promise<Result>
```

Add an Upgrade Statement to Update Database Version

| Param         | Type                                                      | Description       |
| ------------- | --------------------------------------------------------- | ----------------- |
| **`dbName`**  | <code>string</code>                                       | database name     |
| **`upgrade`** | <code><a href="#versionupgrade">VersionUpgrade</a></code> | upgrade statement |

**Returns:** <code>Promise&lt;<a href="#result">Result</a>&gt;</code>

**Since:** 1.0.0 refactor

--------------------


### createConnection(...)

```typescript
createConnection(database: string, encrypted?: boolean | undefined, mode?: string | undefined, version?: number | undefined) => Promise<SQLiteDBConnection | Result | null>
```

Create a connection to a database

| Param           | Type                 |
| --------------- | -------------------- |
| **`database`**  | <code>string</code>  |
| **`encrypted`** | <code>boolean</code> |
| **`mode`**      | <code>string</code>  |
| **`version`**   | <code>number</code>  |

**Returns:** <code>Promise&lt;SQLiteDBConnection | <a href="#result">Result</a> | null&gt;</code>

**Since:** 1.0.0 refactor

--------------------


### retrieveConnection(...)

```typescript
retrieveConnection(database: string) => Promise<SQLiteDBConnection | Result | null>
```

Retrieve an existing database connection

| Param          | Type                |
| -------------- | ------------------- |
| **`database`** | <code>string</code> |

**Returns:** <code>Promise&lt;SQLiteDBConnection | <a href="#result">Result</a> | null&gt;</code>

**Since:** 1.0.0 refactor

--------------------


### retrieveAllConnections()

```typescript
retrieveAllConnections() => Promise<any | null>
```

Retrieve all database connections

**Returns:** <code>Promise&lt;any&gt;</code>

**Since:** 1.0.0 refactor

--------------------


### closeConnection(...)

```typescript
closeConnection(database: string) => Promise<Result>
```

Close a database connection

| Param          | Type                |
| -------------- | ------------------- |
| **`database`** | <code>string</code> |

**Returns:** <code>Promise&lt;<a href="#result">Result</a>&gt;</code>

**Since:** 1.0.0 refactor

--------------------


### closeAllConnections()

```typescript
closeAllConnections() => Promise<Result>
```

Close all database connections

**Returns:** <code>Promise&lt;<a href="#result">Result</a>&gt;</code>

**Since:** 1.0.0 refactor

--------------------


### requestPermissions()

```typescript
requestPermissions() => Promise<Result>
```

Request Permissions

**Returns:** <code>Promise&lt;<a href="#result">Result</a>&gt;</code>

**Since:** 1.0.0 refactor

--------------------


### Interfaces


#### Result

| Prop          | Type                 |
| ------------- | -------------------- |
| **`result`**  | <code>boolean</code> |
| **`message`** | <code>string</code>  |


#### VersionUpgrade

| Prop              | Type                 |
| ----------------- | -------------------- |
| **`fromVersion`** | <code>number</code>  |
| **`toVersion`**   | <code>number</code>  |
| **`statement`**   | <code>string</code>  |
| **`set`**         | <code>MySet[]</code> |


#### MySet

| Prop            | Type                |
| --------------- | ------------------- |
| **`statement`** | <code>string</code> |
| **`values`**    | <code>any[]</code>  |

</docgen-api>

