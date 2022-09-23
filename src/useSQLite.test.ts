
jest.mock('@capacitor/core', () => {
    let mDatabases: any = {};
    let curDatabase: string = "";
    let curEncrypted: boolean = false;
    let curMode: string = "no-encryption";
    let curTable: string = "";
    var mIsPluginAvailable: boolean = true;
    var platform: string = 'ios';
    return {
        Plugins: {
          CapacitorSQLite: {
              open: async (options: any) => {
                  const database = options.database ? options.database : "storage"; 
                  const encrypted: boolean = options.encrypted ? options.encrypted : false;
                  const mode:string = options.mode ? options.mode : "no-encryption";
                  if (!Object.keys(mDatabases).toString().includes(database)) {
                      let mTables: any = {};
                      mDatabases[database] = mTables; 
                  }
                  curDatabase = database;
                  curEncrypted = encrypted;
                  curMode = mode;
                  return {result: true};             
              },
              /* TODO other methods */
  
                    
          }
        },
        Capacitor: {
      
          init: (isPluginAvailable: boolean, _platform: string) => {
              mIsPluginAvailable = isPluginAvailable;
              platform = _platform;
          },
          isPluginAvailable: () => mIsPluginAvailable,
          getPlatform: () => platform,
          platform: platform
        }
      }
});
/*jest.mock('@capacitor-community/sqlite', () => {
    return {
        SQLiteConnection : jest.fn().mockImplementation(() => { return {} })
    }
});
*/
jest.mock('@capacitor-community/sqlite', () => {
    var mIsConnection: boolean = false;
    var connDict: Map<string, SQLiteDBConnection> = new Map();
    return {
        SQLiteConnection : jest.fn().mockImplementation(() => { 
            return {
                constructor: () => {
                    return {};
                },
                echo: async (value: string) => { 
                    return {value: value};
                }, 
                createConnection: async (dbName: string,
                                         encrypted?: boolean,
                                         mode?: string,
                                         version?: number,
                                         readonly?: boolean): Promise<any> => {
                        const mReadonly = readonly ? readonly : false;
                        let dbConn: SQLiteDBConnection = new 
                                            SQLiteDBConnection(dbName,mReadonly,CapacitorSQLite)
                        if(dbConn != null) {
                            connDict.set(dbName,dbConn)
                            mIsConnection = true;
                            return Promise.resolve(dbConn);    
                        } else {
                            return Promise.reject();
                        }                  
                },
                retrieveConnection: async (dbName: string, readonly?: boolean): Promise<SQLiteDBConnection> => {
                    if(mIsConnection) {
                        if(connDict.has(dbName)) {
                            const conn: any = connDict.get(dbName);
                            return Promise.resolve(conn);
                        } else {
                            return Promise.reject(`Connection ${dbName} does not exist`);
                        }
                    } else {
                        return Promise.reject("No connection available");
                    }
                },
                closeConnection: async (dbName: string, readonly?: boolean): Promise<void> => {
                    if(mIsConnection) {
                        if(connDict.has(dbName)) {
                            connDict.delete(dbName);
                            return Promise.resolve();
                        } else {
                            return Promise.reject();
                        }
                    } else {
                        return Promise.reject();
                    }
                },
                retrieveAllConnections: async (): Promise<Map<string, SQLiteDBConnection>> => {
                    if(mIsConnection) {
                        var conns: any = {};
                        let keys = [...connDict.keys()];
                        if(keys.length > 0) {
                            keys.forEach(key => {
                                conns[key] = connDict.get(key);
                            });
                            return Promise.resolve(conns);
                        } else {
                            return Promise.reject("No connection returned");
                        }
                    } else {
                        return Promise.reject("No connection available");
                    }
                },
                closeAllConnections: async (): Promise<void> => {
                    if(mIsConnection) {
                        connDict = new Map();
                        return Promise.resolve();
                    } else {
                        return Promise.reject();
                    }
                },

            } 
        }),
        SQLiteDBConnection : jest.fn().mockImplementation(() => { 
            return {
                constructor: () => {
                    return {};
                },
            }
        }),
    }
});


import { Capacitor } from '@capacitor/core';
import { renderHook, act } from '@testing-library/react-hooks'
import { useSQLite } from './useSQLite';
import { CapacitorSQLite, SQLiteDBConnection } from '@capacitor-community/sqlite';

it('Check CapacitorSQLite available for ios platform', async () => {
    const capacitorMock = (Capacitor as any);
    await act(async () => {
        capacitorMock.init(true,'ios');
    });
    
    const r = renderHook(() => useSQLite({}));

    await act(async () => {
      const result = r.result.current;
      const { isAvailable } = result;
      expect(isAvailable).toBe(true);
    });
});
it('Check CapacitorSQLite available for android platform', async () => {
    const capacitorMock = (Capacitor as any);
    await act(async () => {
        capacitorMock.init(true,'android');
    });
    
    const r = renderHook(() => useSQLite({}));
  
    await act(async () => {
      const result = r.result.current;
      const { isAvailable } = result;
      expect(isAvailable).toBe(true);
    });
});
it('Check CapacitorSQLite available for electron platform', async () => {
    const capacitorMock = (Capacitor as any);
    await act(async () => {
        capacitorMock.init(true, 'electron');
    });
    const r = renderHook(() => useSQLite({}));
  
    await act(async () => {
      const result = r.result.current;
      const { isAvailable } = result;
      expect(isAvailable).toBe(true);
    });
});
it('Check CapacitorSQLite available for web platform', async () => {
    const capacitorMock = (Capacitor as any);
    await act(async () => {
        capacitorMock.init(true, 'web');
    });
    const r = renderHook(() => useSQLite({}));
    await act(async () => {
    });
  
    await act(async () => {
      const result = r.result.current;
      const { isAvailable } = result;
      expect(isAvailable).toBe(true);
    });
});
it('Check CapacitorSQLite echo for ios platform', async () => {
    const capacitorMock = (Capacitor as any);
    await act(async () => {
        capacitorMock.init(true,'ios');
    });
    
    const r = renderHook(() => useSQLite({}));

    await act(async () => {
        const result = r.result.current;
        const { echo } = result;
        const res: any = await echo("hello"); 
        expect(res.value).toEqual("hello");
      });
  
});
it('Check CapacitorSQLite createConnection for ios platform', async () => {
    const capacitorMock = (Capacitor as any);
    await act(async () => {
        capacitorMock.init(true,'ios');
    });
    
    const r = renderHook(() => useSQLite({}));

    await act(async () => {
        const result = r.result.current;
        const { createConnection } = result;
            const res: any = await createConnection("testDB"); 
            expect(res).not.toBeNull();   
    });
  
});
it('Check CapacitorSQLite retrieveConnection for ios platform', async () => {
    const capacitorMock = (Capacitor as any);
    await act(async () => {
        capacitorMock.init(true,'ios');
    });
    
    const r = renderHook(() => useSQLite({}));

    await act(async () => {
        const result = r.result.current;
        const { createConnection, retrieveConnection } = result;
        let res: any = await createConnection("testDB"); 
        expect(res).not.toBeNull();
        res = await retrieveConnection("testDB");
        expect(res).not.toBeNull();
      });
  
});

it('Check CapacitorSQLite closeConnection for ios platform', async () => {
    const capacitorMock = (Capacitor as any);
    await act(async () => {
        capacitorMock.init(true,'ios');
    });
    
    const r = renderHook(() => useSQLite({}));

    await act(async () => {
        const result = r.result.current;
        const { createConnection, closeConnection,
                retrieveConnection } = result;
        let res: any = await createConnection("testDB"); 
        expect(res).not.toBeNull();
        expect.assertions(2);
        await closeConnection("testDB");
        try {
          res = await retrieveConnection("testDB");
        } catch (e) {
          expect(e).toEqual("Connection testDB does not exist");
        }
      
    });
  
});

it('Check CapacitorSQLite create two connections for ios platform', async () => {
    const capacitorMock = (Capacitor as any);
    await act(async () => {
        capacitorMock.init(true,'ios');
    });
    
    const r = renderHook(() => useSQLite({}));

    await act(async () => {
        const result = r.result.current;
        const { createConnection,
                retrieveAllConnections } = result;
        let res: any = await createConnection("testFirstDB"); 
        expect(res).not.toBeNull();
        res = await createConnection("testSecondDB"); 
        expect(res).not.toBeNull();
        res = await retrieveAllConnections();
        let keys = Object.keys(res);
        expect(keys.length).toEqual(2);
        expect(keys[0]).toEqual("testFirstDB");
        expect(keys[1]).toEqual("testSecondDB");
      });
  
});
it('Check CapacitorSQLite close all connections for ios platform', async () => {
    const capacitorMock = (Capacitor as any);
    await act(async () => {
        capacitorMock.init(true,'ios');
    });
    
    const r = renderHook(() => useSQLite({}));

    await act(async () => {
        const result = r.result.current;
        const { createConnection, closeAllConnections,
                retrieveAllConnections } = result;
        expect.assertions(7);
        let res: any = await createConnection("testFirstDB"); 
        expect(res).not.toBeNull();
        res = await createConnection("testSecondDB"); 
        expect(res).not.toBeNull();
        res = await retrieveAllConnections();
        let keys = Object.keys(res);
        expect(keys.length).toEqual(2);
        expect(keys[0]).toEqual("testFirstDB");
        expect(keys[1]).toEqual("testSecondDB");
        await closeAllConnections();
        expect(res).toBeTruthy();
        try {
            res = await retrieveAllConnections();
        } catch (e) {
            console.log(`in catch ${e}`)
          expect(e).toEqual("No connection returned");
        }

      });
 
});
