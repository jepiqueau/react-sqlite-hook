import { useCallback } from 'react';
import { Capacitor, Plugins } from '@capacitor/core';
import { AvailableResult, notAvailable } from './util/models';
import { isFeatureAvailable, featureNotAvailableError } 
                                    from './util/feature-check';
import '@capacitor-community/sqlite';

interface Set {
    statement?: string;
    values?: Array<any>;
}

interface VersionUpgrade {
    fromVersion: number;
    toVersion: number;
    statement: string;
    set?: Array<Set>; 
}

interface SQLiteResult extends AvailableResult {
    openDB: (dbName: string,encrypted?: boolean,mode?: string)
                => Promise<{result?: boolean, message?: string}>;
    createSyncTable: ()
                => Promise<{changes?: {changes:number}}>;
    close: (dbName: string)
                => Promise<{result?: boolean, message?: string}>;
    execute: (statements: string)
                => Promise<{changes?: {changes: number},
                            message?: string}>;
    executeSet: (set: Array<Set>)
                => Promise<{changes?: {changes: number, lastId: number},
                            message?: string}>;
    run: (statement: string,values?: Array<any>)
                => Promise<{changes?: {changes: number, lastId: number},
                            message?: string}>;
    query: (statement: string,values?: Array<string>)
                => Promise<{values?: Array<any>,message?: string}>
    isDBExists: (dbName: string)
                => Promise<{result?: boolean, message?: string}>;
    deleteDB: (dbName: string)
                => Promise<{result?: boolean, message?: string}>;
    isJsonValid: (jsonstring: string)
                => Promise<{result?: boolean, message?: string}>;
    importFromJson: (jsonstring: string)
                => Promise<{changes?: {changes: number},
                            message?: string}>;
    exportToJson: (mode: string)
                => Promise<{export?: any,message?: string}>;
    setSyncDate: (syncDate: string)
                => Promise<{result?: boolean, message?: string}>;
    addUpgradeStatement: (dbName: string, upgrade: VersionUpgrade)
                => Promise<{result?: boolean, message?: string}>;
}
export const availableFeatures = {
    useSQLite: isFeatureAvailable('CapacitorSQLite', 'useSQLite')
}
/**
 * useSQLite Hook
 */
export function useSQLite(): SQLiteResult {
    const { CapacitorSQLite } = Plugins;
    const platform = Capacitor.getPlatform();
    const mSQLite: any = CapacitorSQLite;
    const availableFeaturesN = {
        useSQLite: isFeatureAvailable('CapacitorSQLite', 'useSQLite')
    }
    const androidPremissions = async () => {
        console.log("%%% in androidPremissions platform " 
                    + platform + "%%%");
        try {
            await mSQLite.requestPermissions();
            return { result: true };
        } catch (e) {
            console.log("Error requesting permissions " + e);
            return { result: false,
                message: "Error requesting permissions " + e};
        }   
    }
  
    if (!availableFeaturesN.useSQLite) {
        return {
            openDB: featureNotAvailableError,
            createSyncTable: featureNotAvailableError,
            close: featureNotAvailableError,
            execute: featureNotAvailableError,
            executeSet: featureNotAvailableError,
            run: featureNotAvailableError,
            query: featureNotAvailableError,
            isDBExists: featureNotAvailableError,
            deleteDB: featureNotAvailableError,
            isJsonValid: featureNotAvailableError,
            importFromJson: featureNotAvailableError,
            exportToJson: featureNotAvailableError,
            setSyncDate: featureNotAvailableError,
            addUpgradeStatement: featureNotAvailableError,
            ...notAvailable
        };
    }
    /**
     * Open a Database
     * @param dbName string
     * @param _encrypted boolean optional 
     * @param _mode string optional
     * @param version number optional
     */  
    const openDB = useCallback(async (dbName: string,
                                      encrypted?: boolean,
                                      mode?: string,
                                      version?: number) => {
        console.log("%%% in openDB platform " + platform + "%%%");
        if(platform === "android") { 
            const permissions: any = await androidPremissions();
            console.log("%%% in openDB permissions " 
                        + JSON.stringify(permissions) + "%%%");
            if(!permissions.result) return permissions;
        }      
        if (typeof dbName === 'undefined') {
            return { result: false,
                            message: 'Must provide a database name'};
        }      
        const mDatabase: string = dbName;
        const mVersion: number = version ? version : 1;
        const mEncrypted: boolean = encrypted ? encrypted : false;
        const mMode: string = mode ? mode : "no-encryption";
        const r = await mSQLite.open({database: mDatabase,
                                      encrypted: mEncrypted,
                                      mode: mMode, version: mVersion});
        if(r) {
            if( typeof r.result != 'undefined') {
                return r;
            }
        }
        return {result: false, message: "Error in openDB"};
    }, []);
    /**
     * Create synchronisation table
     */
    const createSyncTable = useCallback(async () => {
        const r = await mSQLite.createSyncTable();
        console.log('result createSyncTable ',r);
        if(r) {
            if( typeof r.changes != 'undefined') {
                return r;
            }
        }
        return {changes:0};
    }, []);
    /**
     * Close the Database
     * @param dbName string
     */
    const close = useCallback(async (dbName: string) => {
        if(dbName.length > 0) {
            const r = await mSQLite.close({database:dbName});
            console.log('result close ',r);
            if(r) {
                if( typeof r.result != 'undefined') {
                    return r;
                }
            } 
            return {result: false, message: "Error in close"};  
        }
        return {result: false, message: "Must provide a database name"};
    }, []);
    /**
     * Execute a set of Raw Statements
     * @param statements string 
     */
    const execute = useCallback(async (statements: string) => {
        if(statements.length > 0) {
            const r = await mSQLite.execute({statements:statements});
            console.log('result execute ',r);
            if(r) {
                if( typeof r.changes != 'undefined') {
                    return r;
                }
            } 
            return {changes:{changes:0}, message: "Error in execute"};  
        }
        return {changes:{changes:0},message:"Statements is empty"};
    }, []);
    /**
     * Execute a set of Raw Statements as Array<any>
     * @param set Array<any> 
     */
    const executeSet = useCallback(async (set:Array<any>) => {
        if(set.length > 0) {
            const r = await mSQLite.executeSet({set:set});
            console.log('result executeSet ',r);
            if(r) {
                if( typeof r.changes != 'undefined') {
                    return r;
                }
            }           
            return {changes:{changes: -1,lastId: -1},
                                message: "Error in executeSet"};
        }
        return {changes:{changes:-1,lastId:-1},message:"Set is empty"};
    }, []);
    /**
     * Execute a Single Raw Statement
     * @param statement string
     * @param values Array<any> optional
     */
    const run = useCallback(async (statement: string,
                                  values?: Array<any>) => {
        if(statement.length > 0) {
            const vals: Array<any> = values ? values : [];
            const r = await mSQLite.run({statement: statement,
                                         values: vals});
            console.log('result run ',r);
            if(r) {
                if( typeof r.changes != 'undefined') {
                    return r;
                }
            } 
            return {changes:{changes:0}, message: "Error in run"};  
        }
        return {changes:{changes:0,lastId:-1},
                                message: "Statement is empty"};
    }, []);
    /**
     * Query a Single Raw Statement
     * @param statement string
     * @param values Array<string> optional
     */
    const query = useCallback(async (statement: string,
                                     values?:Array<string>) => {
        if(statement.length > 0) {
            const vals: Array<any> = values ? values : [];
            const r = await mSQLite.query({statement: statement,
                                           values: vals});
            console.log('result query ',r);
            if(r) {
                if( typeof r.values != 'undefined') {
                    return r;
                }
            } 
            return {values:[], message: "Error in query"};  
        }
        return {values:[],message:"Statement is empty"};
    }, []);
    /**
     * Check if the Database file exists
     * @param dbName string
     */
    const isDBExists = useCallback(async (dbName: string) => {
        if(dbName.length > 0) {
            const r = await mSQLite.isDBExists({database:dbName});
            console.log('result isDBExists ',r);
            if(r) {
                if( typeof r.result != 'undefined') {
                    return r;
                }
            } 
            return {result: false, message: "Error in isDBExists"};  
        }
        return {result: false, message: "Must provide a database name"};
    }, []);
    /**
     * Delete the Database file
     * @param dbName string
     */
    const deleteDB = useCallback(async (dbName: string) => {
        if(dbName.length > 0) {
            const r = await mSQLite.deleteDatabase({database:dbName});
            console.log('result deleteDB ',r);
            if(r) {
                if( typeof r.result != 'undefined') {
                    return r;
                }
            } 
            return {result: false, message: "Error in deleteDB"};  
        }
        return {result: false, message: "Must provide a database name"};
    }, []);
    /**
     * Check the validity of a JSON Object
     * @param jsonstring string 
     */
    const isJsonValid = useCallback(async (jsonstring: string) => {
        if(jsonstring.length > 0) {
            const r = await mSQLite.isJsonValid(
                                        {jsonstring:jsonstring});
            console.log('result isJsonValid ',r);
            if(r) {
                if( typeof r.result != 'undefined') {
                    return r;
                }
            } 
            return {result: false, message: "Error in isJsonValid"};  
        }
        return {result: false, message: "Must provide a Json string"};
    }, []);
    /**
     * Import a database From a JSON Object
     * @param jsonstring string 
     */
    const importFromJson = useCallback(async (jsonstring: string) => {
        if(jsonstring.length > 0) {
            const r = await mSQLite.importFromJson (
                                        {jsonstring:jsonstring});
            console.log('result importFromJson ',r);
            if(r) {
                if( typeof r.changes != 'undefined') {
                    return r;
                }
            } 
            return {changes:{changes:-1},
                            message: "Error in importFromJson"};  
        }
        return {changes:{changes:-1},
                            message: "Must provide a Json string"};
    }, []);
    /**
     * Export the given database to a JSON Object
     * @param mode string
     */
    const exportToJson = useCallback(async (mode: string) => {
        if(mode.length > 0) {
            const r = await mSQLite.exportToJson({jsonexportmode:mode});
            console.log('result exportToJson ',r);
            if(r) {
                if( typeof r.export != 'undefined') {
                    return r;
                }
            } 
            return {export:{}, message: "Error in exportToJson"};  
        }
        return {export:{},message:"Must provide an export mode"};
    }, []);
    /**
     * Set the synchronization date
     * @param syncDate string 
     */
    const setSyncDate = useCallback(async (syncDate:string) => {
        if(syncDate.length > 0) {
            const r = await mSQLite.setSyncDate({syncdate:syncDate});
            console.log('result setSyncDate ',r);
            if(r) {
                if( typeof r.result != 'undefined') {
                    return r;
                }
            } 
            return {result: false, message:"Error in setSyncDate"};
        }
        return {result: false,
                    message:"Must provide a synchronization date"};
    }, []);
    /**
     * Add the upgrade Statement for database version upgrading
     * @param dbName string 
     * @param upgrade VersionUpgrade
     */
    const addUpgradeStatement = useCallback(async (dbName:string,
                upgrade: VersionUpgrade) => {
        if(upgrade === null) {
            return {result: false,
                    message:"Must provide an upgrade statement"};
        }
        if(upgrade.fromVersion === null || upgrade.toVersion === null
            || upgrade.statement === null) {
                let msg = "Must provide an upgrade statement with ";
                msg += "fromVersion & toVersion & statement"
                return {result: false,
                    message: msg};
            }

        if(dbName.length > 0) {
            const r = await mSQLite.addUpgradeStatement(
                {database: dbName, upgrade: [upgrade]});
            if(r) {
                if( typeof r.result != 'undefined') {
                    return r;
                }
            }  
        } else {
            return {result: false,
                message:"Must provide a database name"};
        }
    }, []);
    return { openDB, createSyncTable, close, execute, executeSet, run,
        query, isDBExists, deleteDB, isJsonValid, importFromJson,
        exportToJson, setSyncDate, addUpgradeStatement,
        isAvailable: true };
}
