import { renderHook, act } from '@testing-library/react-hooks'
import { useStorageSQLite } from './useStorageSQLite';

jest.mock('@capacitor/core', () => {
    let mDatabases: any = {};
    let curDatabase: string = "";
    let curTable: string = "";
    return {
      Plugins: {
        CapacitorDataStorageSqlite: {
            openStore: async (options: any) => {
                const database = options.database ? options.database : "storage"; 
                const table: string = options.table ? options.table : "storage_table";
                const encrypted: boolean = options.encrypted ? options.encrypted : false;
                const mode:string = options.mode ? options.mode : "no-encryption";
                if (!Object.keys(mDatabases).toString().includes(database)) {
                    let mTables: any = {};
                    let mData: any = {};
                    mTables[table] = mData;
                    mDatabases[database] = mTables; 
                } else if (!Object.keys(mDatabases[database]).toString().includes(table)) {
                    let mTables = mDatabases[database];
                    let mData: any = {};
                    mTables[table] = mData;
                    mDatabases[database] = mTables; 
                }
                curDatabase = database;
                curTable = table;
                return {result: true};             
            },
            setTable: async ({ table }: { table: string }) => { 
                if (!Object.keys(mDatabases[curDatabase]).toString().includes(table)) { 
                    let mTables = mDatabases[curDatabase];
                    let mData: any = {};
                    mTables[table] = mData;
                    mDatabases[curDatabase] = mTables; 
                }
                curTable = table;
                return {result: true, message:""};             
            },
            get: async ({ key }: { key: string }) => { 
                try {
                    const value = mDatabases[curDatabase][curTable][key];  
                    return {value: value};
                }
                catch {
                    return null;
                }             
            },
            set: async ({ key, value }: { key: string, value: string }): Promise<void> => {
                mDatabases[curDatabase][curTable][key] = value;
                return;
            },
            remove: async ({ key }: { key: string }) => {
                try {
                    delete mDatabases[curDatabase][curTable][key];
                    return {result: true};             
                }
                catch {
                    return {result: false};             
                }
            },
            clear: async () => {
                try {
                    delete mDatabases[curDatabase][curTable];
                    curTable = "";
                    return {result: true};             
                }
                catch {
                    return {result: false};             
                }
            },
            iskey: async({ key }: { key: string }) => {
                const result = Object.keys(mDatabases[curDatabase][curTable]).toString().includes(key);
                return {result: result};
            },
            keys: async () => {
                try {
                    const result = Object.keys(mDatabases[curDatabase][curTable]);
                    return {keys: result};
                }
                catch {
                    return {keys: null};
                }
            },
            values: async () => {
                try {
                    const result = Object.values(mDatabases[curDatabase][curTable]);
                    return {values: result};
                }
                catch {
                    return {values: null};
                }
            },
            keysvalues: async () => {
                try {
                    let result: Array<{key: string, value:string}> = [];
                    const keys = Object.keys(mDatabases[curDatabase][curTable]);
                    keys.forEach((key) => {
                        const value: string = mDatabases[curDatabase][curTable][key];
                        result = [...result,{key: key, value: value} ];
                    });
                    return {keysvalues: result};
                }
                catch {
                    return {keysvalues: null};
                }
            },
            deleteStore: async (options: any) => {
                const database = options.database ? options.database : "storage";
                if (!Object.keys(mDatabases).includes(database)) {
                    return {result: false};
                }
                delete mDatabases[database];
                if (database === curDatabase) curDatabase = "";
                return {result: true};
            },
        }
      },
      Capacitor: {
        isPluginAvailable: () => true,
        getPlatform: () => 'ios',
        platform: 'ios'
      }
    }
});
jest.mock('capacitor-data-storage-sqlite', () => {
    return {
    }
});

it('Gets and sets storage values from default', async () => {
    const r = renderHook(() => useStorageSQLite());
  
    await act(async () => {
      const result = r.result.current;
      const { isAvailable } = result;
      expect(isAvailable).toBe(true);
    });
    await act(async () => {
        const result = r.result.current;
    
        const { openStore, setTable, getItem, setItem, removeItem, clear,
        isKey, getAllKeys, getAllValues, getAllKeysValues, deleteStore} = result;
        let res:boolean = await openStore({});
        expect(res).toBe(true);
 
        await setItem('name', 'Max');
    
        let name = await getItem('name');
        expect(name).toEqual('Max');
        res = await isKey('name');
        expect(res).toBe(true);
        res = await removeItem('name');
        expect(res).toBe(true);
        name = await getItem('name');
        expect(name).toBeNull();
        res = await isKey('name');
        expect(res).toBe(false);
    
        await setItem('name', 'Jeep');
        await setItem('session', 'Opened');
        await setItem('email', 'jeep@example.com');
        const keys = await getAllKeys();
        expect(keys.length).toEqual(3);
        expect(keys).toStrictEqual(['name','session','email']);
        const values = await getAllValues();
        expect(values.length).toEqual(3);
        expect(values).toStrictEqual(['Jeep','Opened','jeep@example.com']);
        const keysvalues = await getAllKeysValues();
        expect(keysvalues.length).toEqual(3);
        expect(keysvalues).toStrictEqual([{key:'name',value:'Jeep'},{key:'session',value:'Opened'},{key:'email',value:'jeep@example.com'}]);
        res = await clear();
        expect(res).toBeTruthy();
        name = await getItem('name');
        expect(name).toBeNull();
        res = await deleteStore({});
        expect(res).toBeTruthy();
        res = await deleteStore({database:"foo"});
        expect(res).toBeFalsy();

    });
});    
it('Gets and sets storage values from "myTest" Store & "myStore" Table', async () => {
    const r = renderHook(() => useStorageSQLite());
    
    await act(async () => {
        const result = r.result.current;
        const { isAvailable } = result;
        expect(isAvailable).toBe(true);
    });
    await act(async () => {
        const result = r.result.current;
    
        const { openStore, setTable, getItem, setItem, removeItem, clear,
        isKey, getAllKeys, getAllValues, getAllKeysValues, deleteStore} = result;
        let res:boolean = await openStore({database: 'myTest', table: 'myStore'});
        expect(res).toBe(true);
    
        await setItem('name', 'Max');
    
        let name = await getItem('name');
        expect(name).toEqual('Max');
    
        res = await removeItem('name');
        expect(res).toBe(true);
        name = await getItem('name');
        expect(name).toBeNull();
    
        await setItem('name', 'Jeep');
        res = await clear();
        expect(res).toBeTruthy();
        name = await getItem('name');
        expect(name).toBeNull();
    }); 
}); 
 
it('Gets and sets storage values from one store & two tables', async () => {
    const r = renderHook(() => useStorageSQLite());
    
    await act(async () => {
        const result = r.result.current;
        const { isAvailable } = result;
        expect(isAvailable).toBe(true);
    });
    await act(async () => {
        const result = r.result.current;
    
        const { openStore, setTable, getItem, setItem, removeItem, clear,
        isKey, getAllKeys, getAllValues, getAllKeysValues, deleteStore} = result;
        let res:boolean = await openStore({database: 'myTest', table: 'myStore'});
        expect(res).toBe(true);
    
        await setItem('name', 'Max');
    
        let name = await getItem('name');
        expect(name).toEqual('Max');
    
        res = await removeItem('name');
        expect(res).toBe(true);
        name = await getItem('name');
        expect(name).toBeNull();
    
        await setItem('name', 'Jeep');
        await setItem('email', 'jeep@example.com');
        name = await getItem('name');
        let email = await getItem('email');
        expect(name).toEqual('Jeep');
        expect(email).toEqual('jeep@example.com');
        let retTable = await setTable('second');
        expect(retTable.result).toBeTruthy();
        expect(retTable.message).toEqual("");
        await setItem('session', 'Opened');
        await setItem('json', JSON.stringify({a: 5,b: 362.235,c:"hello World!"}));
        let session = await getItem('session');
        expect(session).toEqual('Opened');
        let jsonString = await getItem('json');
        if(jsonString != null) {
            let json = JSON.parse(jsonString);
            expect(json.a).toEqual(5);
            expect(json.b).toEqual(362.235);
            expect(json.c).toEqual("hello World!");    
        }
        retTable = await setTable('myStore');
        expect(retTable.result).toBeTruthy();
        expect(retTable.message).toEqual("");
        await setItem('mobile', '0123456789');
        let mobile = await getItem('mobile');
        expect(mobile).toEqual('0123456789');
        const keysvalues = await getAllKeysValues();
        expect(keysvalues.length).toEqual(3);
        expect(keysvalues).toStrictEqual([{key:'name',value:'Jeep'},{key:'email',value:'jeep@example.com'},{key:'mobile',value:'0123456789'}]);
        


    });    
}); 