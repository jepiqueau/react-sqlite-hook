//Inspired from https://github.com/capacitor-community/react-hooks/blob/master/src/storage/

import { useState, useEffect, useCallback } from 'react';
import { Capacitor, Plugins } from '@capacitor/core';
import { AvailableResult, notAvailable } from './util/models';
import { isFeatureAvailable, featureNotAvailableError } from './util/feature-check';
import * as CDSSPlugin from 'capacitor-data-storage-sqlite';


interface StorageSQLiteResult extends AvailableResult {
    openStore: (options: any) => Promise<boolean>;
    setTable: (table: string) => Promise<{result: boolean, message: string}>;
    getItem: (key: string) => Promise<string | null>;
    setItem: (key: string, value: string) => Promise<void>;
    removeItem: (key: string) => Promise<boolean>;
    clear: () => Promise<boolean>;
    isKey: (key: string) => Promise<boolean | null>;
    getAllKeys: () => Promise<string[]>;
    getAllValues: () => Promise<string[]>;
    getAllKeysValues: () => Promise<any[]>;
    deleteStore: (options:any) => Promise<boolean>;
}
export const availableFeatures = {
    useStorage: isFeatureAvailable('CapacitorDataStorageSqlite', 'useStorageSQLite')
}

export function useStorageSQLite(): StorageSQLiteResult {
    const { CapacitorDataStorageSqlite } = Plugins;
    const platform = Capacitor.getPlatform();
    const storageSQLite = platform === "ios" || platform === "android" ? CapacitorDataStorageSqlite :
        platform === "electron" ? CDSSPlugin.CapacitorDataStorageSqliteElectron : CDSSPlugin.CapacitorDataStorageSqlite;
    if (!availableFeatures.useStorage) {
        return {
            openStore: featureNotAvailableError,
            setTable: featureNotAvailableError,
            getItem: featureNotAvailableError,
            setItem: featureNotAvailableError,
            removeItem: featureNotAvailableError,
            clear: featureNotAvailableError,
            isKey: featureNotAvailableError,
            getAllKeys: featureNotAvailableError,
            getAllValues: featureNotAvailableError,
            getAllKeysValues: featureNotAvailableError,
            deleteStore: featureNotAvailableError,
            ...notAvailable
        };
    }
    const openStore = useCallback(async (options: any) => {
        const database: string = options.database ? options.database : "storage";
        const table: string = options.table ? options.table : "storage_table";
        const encrypted: boolean = options.encrypted ? options.encrypted : false;
        const mode:string = options.mode ? options.mode : "no-encryption";
        const r = await storageSQLite.openStore({database,table,encrypted,mode});
        if(r) {
            if( typeof r.result != 'undefined') {
                return r.result;
            }
        }
        return false;
    }, []);

    const setTable = useCallback(async (table: string) => {
        table = table.length > 0 ? table : "storage_table";
        const r = await storageSQLite.setTable({table});
        if(r) {
            if( r.message && r.message.length > 0) {
                return {result: false, message: r.message};
            }
            if( typeof r.result != 'undefined') {
                if (r.result) {
                    return { result: r.result, message: ""};
                }
            }
        }
        return {result: false, message: "Error in setTable"};
    }, []);

    const getItem = useCallback(async (key: string) => {
        const v = await storageSQLite.get({ key });
        if (v) {
            if(v.value) {
                return v.value;
            }
        }
        return null;
      }, []);

    const setItem = useCallback(async (key: string, value: string) => {
        await storageSQLite.set({ key, value: value });
        return
    }, []);
    const removeItem = useCallback(async (key: string) => {
        const r = await storageSQLite.remove({ key });
        if(r) {
            if( typeof r.result != 'undefined') {
                return r.result;
            }
        }
        return false;
    }, []);
    const clear = useCallback(async () => {
        const r = await storageSQLite.clear();
        if(r) {
            if( typeof r.result != 'undefined') {
                return r.result;
            }
        }
        return false;
    }, []);
    const isKey = useCallback(async (key: string) => {
        const r = await storageSQLite.iskey({ key });
        if(r) {
            if( typeof r.result != 'undefined') {
                return r.result;
            }
        }
        return false;
    }, []);
    const getAllKeys = useCallback(async () => {
        const r = await storageSQLite.keys();
        if(r) {
            if(r.keys) {
                return r.keys;
            }
        }
        return [];
    }, []);
    const getAllValues = useCallback(async () => {
        const r = await storageSQLite.values();
        if(r) {
            if(r.values) {
                return r.values;
            }
        }
        return [];
    }, []);
    const getAllKeysValues = useCallback(async () => {
        const r = await storageSQLite.keysvalues();
        if(r) {
            if(r.keysvalues) {
                return r.keysvalues;
            }
        }
        return [];
    }, []);
    const deleteStore = useCallback(async (options: any) => {
        const database: string = options.database ? options.database : "storage";
        const r = await storageSQLite.deleteStore({database});
        if(r) {
            if( typeof r.result != 'undefined') {
                return r.result;
            }
        }
        return false;
    }, []);    
        
    return { openStore, setTable, getItem, setItem, removeItem, clear, isKey,
        getAllKeys, getAllValues,getAllKeysValues, deleteStore, isAvailable: true };
}
