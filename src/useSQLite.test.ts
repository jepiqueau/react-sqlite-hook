
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
            }
            /* TODO other methods */
        }
      },
      Capacitor: {
    
        __init: (isPluginAvailable: boolean, _platform: string) => {
            mIsPluginAvailable = isPluginAvailable;
            platform = _platform;
        },
        isPluginAvailable: () => mIsPluginAvailable,
        getPlatform: () => platform,
      }
    }
});
jest.mock('@capacitor-community/sqlite', () => {
    return {
    }
});
import { Plugins, Capacitor } from '@capacitor/core';
import { renderHook, act } from '@testing-library/react-hooks'
import { useSQLite } from './useSQLite';

it('Check CapacitorSQLite available for ios platform', async () => {
    const capacitorMock = (Capacitor as any);
    await act(async () => {
        capacitorMock.__init(true,'ios');
    });
    const r = renderHook(() => useSQLite());

    await act(async () => {
      const result = r.result.current;
      const { isAvailable } = result;
      expect(isAvailable).toBe(true);
    });
});
it('Check CapacitorSQLite available for android platform', async () => {
    const capacitorMock = (Capacitor as any);
    await act(async () => {
        capacitorMock.__init(true,'android');
    });
    const r = renderHook(() => useSQLite());
  
    await act(async () => {
      const result = r.result.current;
      const { isAvailable } = result;
      expect(isAvailable).toBe(true);
    });
});
it('Check CapacitorSQLite available for electron platform', async () => {
    const capacitorMock = (Capacitor as any);
    await act(async () => {
        capacitorMock.__init(true, 'electron');
    });
    const r = renderHook(() => useSQLite());
  
    await act(async () => {
      const result = r.result.current;
      const { isAvailable } = result;
      expect(isAvailable).toBe(true);
    });
});
it('Check CapacitorSQLite available for web platform', async () => {
    const capacitorMock = (Capacitor as any);
    await act(async () => {
        capacitorMock.__init(false, 'web');
    });
    const r = renderHook(() => useSQLite());
    await act(async () => {
    });
  
    await act(async () => {
      const result = r.result.current;
      const { isAvailable } = result;
      expect(isAvailable).toBe(false);
    });
});
    
