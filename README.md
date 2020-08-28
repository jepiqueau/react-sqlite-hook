# React Hook for @Capacitor-community/sqlite

A React Hook to help Capacitor developpers to use `@capacitor-community/sqlite` plugin in React or Ionic/React applications

This is an alpha version

## Getting Started in your Ionic/React App

```bash
npm install --save @capacitor-community/sqlite
npm install --save-dev react-sqlite-hook
```

## Applications demonstrating the use of the plugin and the react hook

 - [react-sqlite-app-starter] (https://github.com/jepiqueau/react-sqlite-app-starter)


## Usage
Import the hook from its own path:

```js
 import { useSQLite } from 'react-sqlite-hook'
```

Then use the hook from that namespace in your app:

```js
import React, { useState, useEffect} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonList, IonItem, IonLabel } from '@ionic/react';
import './Tab2.css';
import { useSQLite } from 'react-sqlite-hook/dist';
import { createTablesNoEncryption, importTwoUsers, importThreeMessages,
  dropTablesTablesNoEncryption } from '../Utils/utils-db-no-encryption';

const Tab2: React.FC = () => {
  const [log, setLog] = useState<string[]>([]);
  const [start, setStart] = useState(0);
  const startTest = () => {
    setStart(prev => prev + 1); 
  }
  const {openDB, createSyncTable, close, execute, executeSet, run, query,
    isDBExists, deleteDB, isJsonValid, importFromJson, exportToJson, setSyncDate} = useSQLite();
  useEffect( () => {
    async function testDatabaseNoEncryption(): Promise<Boolean>  {
      setLog((log) => log.concat("*** Starting testDatabaseNoEncryption ***\n"));
      let result: any = await openDB("test-sqlite"); 
      if(result.result) {
        setLog((log) => log.concat("Database 'test-sqlite' Opened\n"));
        // Drop tables if exists
        result = await execute(dropTablesTablesNoEncryption);
        console.log("execute1 ",result)
        if(result.changes.changes !== 0 && result.changes.changes !== 1) {
          setLog((log) => log.concat("Execute2 failed\n"));
          return false;
        }
        // Create tables
        result = await execute(createTablesNoEncryption);
        console.log("execute2 ",result)
        if(result.changes.changes !== 0 && result.changes.changes !== 1) {
          setLog((log) => log.concat("Execute2 failed\n"));
          return false;
        }
        // Insert two users with execute method
        result = await execute(importTwoUsers);
        console.log("execute3 ",result)
        if(result.changes.changes !== 2) {
          setLog((log) => log.concat("Execute3 failed\n"));
          return false;
        }
        // Select all Users
        result = await query("SELECT * FROM users");
        console.log('result.values.length ',result.values.length)
        console.log('result.values[0].name ',result.values[0].name)
        console.log('result.values[1].name ',result.values[1].name)
        if(result.values.length !== 2 ||
        result.values[0].name !== "Whiteley" || result.values[1].name !== "Jones") {
          setLog((log) => log.concat("Select1 failed\n"));
          return false;
        }
        // add one user with statement and values              
        let sqlcmd = "INSERT INTO users (name,email,age) VALUES (?,?,?)";
        let values: Array<any>  = ["Simpson","Simpson@example.com",69];
        result = await run(sqlcmd,values);
        if(result.changes.changes !== 1 ||result.changes.lastId !== 3) {
          setLog((log) => log.concat("Run1 failed\n"));
          return false;
        }
        // add one user with statement              
        sqlcmd = `INSERT INTO users (name,email,age) VALUES ("Brown","Brown@example.com",15)`;
        result = await run(sqlcmd);
        if(result.changes.changes !== 1 || result.changes.lastId !== 4) {
          setLog((log) => log.concat("Run2 failed\n"));
          return false;
        }
        // Select all Users
        result = await query("SELECT * FROM users");
        if(result.values.length !== 4) {
          setLog((log) => log.concat("Select2 failed\n"));
          return false;
        }
        // Select Users with age > 35
        sqlcmd = "SELECT name,email,age FROM users WHERE age > ?";
        values = ["35"];
        result = await query(sqlcmd,values);
        if(result.values.length !== 2) {
          setLog((log) => log.concat("Select with filter on age failed\n"));
          return false;
        }
        // Import three messages
        result = await execute(importThreeMessages);
        if(result.changes.changes !== 3) {
          setLog((log) => log.concat("Insert messages failed\n"));
          return false;
        }
        // Select all Messages
        result = await query("SELECT * FROM messages");
        if(result.values.length !== 3 ||
            result.values[0].title !== "test post 1" || result.values[1].title !== "test post 2" 
            || result.values[2].title !== "test post 3") {
          setLog((log) => log.concat("Select messages failed\n"));
          return false;    
        }
        // Close the Database
        result = await close("test-sqlite")
        if(!result.result) {
          setLog((log) => log.concat("Failed to close the database\n"));
          return false;    
        }       
      }
      setLog((log) => log.concat("*** Ending testDatabaseNoEncryption ***\n"));
      return true;
  }
    if(start > 0) {
      testDatabaseNoEncryption().then(res => {
        if(res) {
          setLog((log) => log.concat("*** The set of tests was successful ***\n"));
        } else {
          setLog((log) => log.concat("*** The set of tests failed ***\n"));
        }
      });


    }
  }, [openDB, createSyncTable, close, execute, executeSet, run, query, isDBExists, deleteDB,
    isJsonValid, importFromJson, exportToJson, setSyncDate, start]);   

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab Two</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonItem routerLink="/tab2/details">
            <IonLabel>
              <h2>Go to detail</h2>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonButton onClick={startTest} expand="block">SQLite Test</IonButton>
          </IonItem>
        </IonList>
        <pre>
          <p>{log}</p>
        </pre>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;

```

with `../Utils/utils-db-no-encryption`

```js
export const createTablesNoEncryption: string =  `
    BEGIN TRANSACTION;
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY NOT NULL,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    company TEXT,
    size FLOAT,
    age INTEGER
    );
    CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY NOT NULL,
    userid INTEGER,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    FOREIGN KEY (userid) REFERENCES users(id) ON DELETE SET DEFAULT
    );
    PRAGMA user_version = 1;
    COMMIT TRANSACTION;
`;
export const importTwoUsers: string = `
    BEGIN TRANSACTION;
    DELETE FROM users;
    INSERT INTO users (name,email,age) VALUES ("Whiteley","Whiteley.com",30);
    INSERT INTO users (name,email,age) VALUES ("Jones","Jones.com",44);
    COMMIT TRANSACTION;
`;
export const importThreeMessages: string = `
    BEGIN TRANSACTION;
    DELETE FROM messages;
    INSERT INTO messages (userid,title,body) VALUES (1,"test post 1","content test post 1");
    INSERT INTO messages (userid,title,body) VALUES (2,"test post 2","content test post 2");
    INSERT INTO messages (userid,title,body) VALUES (1,"test post 3","content test post 3");
    COMMIT TRANSACTION;
`;
export const dropTablesTablesNoEncryption: string = `
    PRAGMA foreign_keys = OFF;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS messages;
    PRAGMA foreign_keys = ON;
`;
```


