<p align="center"><br><img src="https://avatars3.githubusercontent.com/u/16580653?v=4" width="128" height="128" /></p>

<h3 align="center">React Hook for <code>@capacitor-community/sqlite</code> plugin</h3>
<p align="center"><strong><code>react-sqlite-hook</code></strong></p><br>
<p align="center" style="font-size:50px;color:red"><strong>REFACTOR</strong></p><br>
<p align="center">
  A React Hook to help Capacitor developpers to use <strong><code>@capacitor-community/sqlite</code></strong> plugin in React or Ionic/React applications
</p>

<br>
<p align="center">
    <img src="https://img.shields.io/maintenance/yes/2020?style=flat-square" />
    <a href="https://www.npmjs.com/package/react-sqlite-hook"><img src="https://img.shields.io/npm/l/react-sqlite-hook?style=flat-square" /></a>
<br>
  <a href="https://www.npmjs.com/package/react-sqlite-hook"><img src="https://img.shields.io/npm/dw/react-sqlite-hook?style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/react-sqlite-hook"><img src="https://img.shields.io/npm/v/react-sqlite-hook?style=flat-square" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
<a href="#contributors-"><img src="https://img.shields.io/badge/all%20contributors-1-orange?style=flat-square" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
</p>

## Maintainers

| Maintainer        | GitHub                                    | Social |
| ----------------- | ----------------------------------------- | ------ |
| Quéau Jean Pierre | [jepiqueau](https://github.com/jepiqueau) |        |


## Installation

```bash
npm install --save @capacitor-community/sqlite@refactor
npm install --save-dev react-sqlite-hook@refactor
```

## Applications demonstrating the use of the plugin and the react hook

 - [react-sqlite-app-starter] (https://github.com/jepiqueau/react-sqlite-app-starter/tree/refactor)


## Usage 

- in the project `app.tsx` file import the sqlite hook

```ts
import { useSQLite } from 'react-sqlite-hook/dist';

...

export let sqlite: any;

const App: React.FC = () => {
  // to use the hook as a singleton 
  const {echo, getPlatform, createConnection, closeConnection,
         retrieveConnection, retrieveAllConnections, closeAllConnections,
         addUpgradeStatement, requestPermissions, 
         isAvailable} = useSQLite();
  sqlite = {echo: echo, getPlatform: getPlatform,
            createConnection: createConnection,
            closeConnection: closeConnection,
            retrieveConnection: retrieveConnection,
            retrieveAllConnections: retrieveAllConnections,
            closeAllConnections: closeAllConnections,
            addUpgradeStatement: addUpgradeStatement,
            requestPermissions: requestPermissions,
            isAvailable:isAvailable};

...
  return (
    ...
  )
};
export default App;
```

 - in a project component 

 ```ts
 ...
import { sqlite } from '../App';
import { SQLiteDBConnection, Result } from 'react-sqlite-hook/dist';

const NoEncryption: React.FC = () => {
    const [log, setLog] = useState<string[]>([]);

    useEffect( () => {
        const testDatabaseNoEncryption = async (): Promise<Boolean>  => {
            setLog((log) => log.concat("* Starting testDatabaseNoEncryption *\n"));
    
            // test the plugin with echo
            let res: any = await sqlite.echo("Hello from echo");
            if(res.value !== "Hello from echo") return false;
            setLog((log) => log.concat("> Echo successful\n"));
            // create a connection for testNew
            res = await sqlite.createConnection("testNew");
            if(res == null ) return false;
            if((Object.keys(res)).includes("result") && !res.result) return false;
            setLog((log) => log.concat("> createConnection " +
                                        " 'testNew' successful\n"));
            let db: SQLiteDBConnection = res; 
          
            // open testNew
            res = await db.open();
            if(!res.result) return false;
            setLog((log) => log.concat("> open 'testNew' successful\n"));

            // Drop tables if exists
            res = await db.execute(dropTablesTablesNoEncryption);
            if(res.changes.changes !== 0 &&
                         res.changes.changes !== 1) return false;
            setLog((log) => log.concat(" Execute1 successful\n"));
            
            // Create tables
            res = await db.execute(createTablesNoEncryption);
            if(res.changes.changes !== 0 &&
                res.changes.changes !== 1) return false;
            setLog((log) => log.concat(" Execute2 successful\n"));

            // Insert two users with execute method
            res = await db.execute(importTwoUsers);
            if(res.changes.changes !== 2) return false;
            setLog((log) => log.concat(" Execute3 successful\n"));

            // Select all Users
            res = await db.query("SELECT * FROM users");
            if(res.values.length !== 2 ||
            res.values[0].name !== "Whiteley" ||
                        res.values[1].name !== "Jones") return false;
            setLog((log) => log.concat(" Select1 successful\n"));

            // add one user with statement and values              
            let sqlcmd = "INSERT INTO users (name,email,age) VALUES (?,?,?)";
            let values: Array<any>  = ["Simpson","Simpson@example.com",69];
            res = await db.run(sqlcmd,values);
            if(res.changes.changes !== 1 ||
                            res.changes.lastId !== 3) return false;
            setLog((log) => log.concat(" Run1 successful\n"));

            // add one user with statement              
            sqlcmd = `INSERT INTO users (name,email,age) VALUES `+
                            `("Brown","Brown@example.com",15)`;
            res = await db.run(sqlcmd);
            if(res.changes.changes !== 1 ||
                        res.changes.lastId !== 4) return false;
            setLog((log) => log.concat(" Run2 successful\n"));

            // Select all Users
            res = await db.query("SELECT * FROM users");
            if(res.values.length !== 4) return false;
            setLog((log) => log.concat(" Select2 successful\n"));

            // Select Users with age > 35
            sqlcmd = "SELECT name,email,age FROM users WHERE age > ?";
            values = ["35"];
            res = await db.query(sqlcmd,values);
            if(res.values.length !== 2) return false;
            setLog((log) => log
                    .concat(" Select with filter on age successful\n"));          
            // Close Connection NoEncryption        
            res = await sqlite.closeConnection("NoEncryption"); 
            if(!res.result) {
                return false; 
            }
    
          return true;
        }
        if(sqlite.isAvailable) {
            testDatabaseNoEncryption().then(res => {
                if(res) {    
                    setLog((log) => log
                        .concat("\n* The set of tests was successful *\n"));
                } else {
                    setLog((log) => log
                        .concat("\n* The set of tests failed *\n"));
                }
            });
        } else {
            sqlite.getPlatform().then((ret: { platform: string; })  =>  {
                setLog((log) => log.concat("\n* Not available for " + 
                                    ret.platform + " platform *\n"));
            });         
        }
         
      }, []);   
    
      
  return (
        <IonCard className="container-noencryption">
            <IonCardContent>
                <pre>
                    <p>{log}</p>
                </pre>
            </IonCardContent>
        </IonCard>
  );
};

 ```

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



