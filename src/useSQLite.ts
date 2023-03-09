import { useCallback, useMemo, useEffect, useRef } from 'react';
import { Capacitor } from '@capacitor/core';
import { AvailableResult, notAvailable } from './util/models';
import { isFeatureAvailable, featureNotAvailableError } 
                                    from './util/feature-check';
import { CapacitorSQLite, SQLiteDBConnection, SQLiteConnection,
         capSQLiteChanges, capSQLiteValues, capNCDatabasePathResult } from '@capacitor-community/sqlite';

export { SQLiteDBConnection }

export type SQLiteProps = {
    onProgressImport?: (progress: string) => void;
    onProgressExport?: (progress: string) => void;
}
/**
 * SQLite Hook Interface
 */
export interface SQLiteHook extends AvailableResult {
    /**
     * Init the web store
     * @returns Promise<void>
     * @since 2.1.0
     */
    initWebStore(): Promise<void>;
    /**
     * Save the datbase to the web store
     * @param database
     * @returns Promise<void>
     * @since 2.1.0
     */
    saveToStore(database: string): Promise<void>;
     /**
     * Echo a value
     * @param value
     * @returns Promise<{value: string}>
     * @since 1.0.0 refactor
     */
    echo(value: string): Promise<{value: string}>;
    /**
     * Get platform
     * @returns Promise<{platform: string}>
     * @since 1.0.0 refactor
     */
    getPlatform(): Promise<{platform: string}>;
    /**
     * Get CapacitorSQLite plugin
     * @returns Promise<{plugin: any}}>
     * @since 2.0.3
     */
    getCapacitorSQLite(): Promise<{plugin: any}>;

    /**
     * Add an Upgrade Statement to Update Database Version
     * @param dbName database name
     * @param upgrade upgrade statement modified since 3.0.1
     * @returns Promise<void>
     * @since 2.0.0
     */
    addUpgradeStatement(dbName: string, upgrade: VersionUpgrade)
                                                    :Promise<void>;
    /**
     * Create a connection to a database
     * @param database
     * @param encrypted
     * @param mode
     * @param version
     * @param readonly since 3.0.1
     * @returns Promise<SQLiteDBConnection>
     * @since 2.0.0 refactor
     */
    createConnection(
        database: string,
        encrypted?: boolean,
        mode?: string,
        version?: number,
        readonly?: boolean
    ): Promise<SQLiteDBConnection>;
    /**
     * Retrieve an existing database connection
     * @param database
     * @param readonly since 3.0.1
     * @returns Promise<SQLiteDBConnection>
     * @since 2.0.0
     */
    retrieveConnection(database: string, readonly?: boolean): Promise<SQLiteDBConnection>;
    /**
     * Retrieve all database connections
     * @returns Promise<Map<string, SQLiteDBConnection>>
     * @since 2.0.0
     */
    retrieveAllConnections(): Promise<Map<string, SQLiteDBConnection>>;
    /**
     * Close a database connection
     * @param database
     * @param readonly since 3.0.1
     * @returns Promise<void>
     * @since 2.0.0 
     */
    closeConnection(database: string, readonly?: boolean): Promise<void>;
    /**
     * Close all database connections
     * @returns Promise<void>
     * @since 2.0.0
     */
    closeAllConnections(): Promise<void>;
    /**
     * Check if database connection exists
     * @param database
     * @param readonly since 3.0.1
     * @returns Promise<Result>
     * @since 2.0.0
     */
    isConnection(database: string, readonly?: boolean): Promise<Result>;
    /**
     * Check if database exists
     * @param database
     * @returns Promise<Result>
     * @since 2.0.0
     */
    isDatabase(database: string): Promise<Result>;
    /**
     * Check if a SQLite database is encrypted
     * @param database
     * @returns Promise<Result>
     * @since 3.2.0
     */
    isDatabaseEncrypted(database: string): Promise<Result>;
    /**
     * Check encryption value in capacitor.config
     * @returns Promise<Result>
     * @since 3.2.0
     */
    isInConfigEncryption(): Promise<Result>;
    /**
     * Check encryption value in capacitor.config
     * @returns Promise<Result>
     * @since 3.2.0
     */
    isInConfigBiometricAuth(): Promise<Result>;

    /**
     * Get a Non-Conformed database path
     * @param databasePath
     * @param version
     * @returns Promise<capNCDatabasePathResult>
     * @since 2.1.4
     */
    getNCDatabasePath(folderPath: string, database: string): Promise<capNCDatabasePathResult>;
    /**
     * Create a Non-Conformed database connection
     * @param databasePath
     * @param version
     * @returns Promise<SQLiteDBConnection>
     * @since 2.1.4
     */
    createNCConnection(databasePath: string, version?: number): Promise<SQLiteDBConnection>;
    /**
     * Retrieve a Non-Conformed database connection
     * @param databasePath
     * @returns Promise<SQLiteDBConnection>
     * @since 2.1.4
     */
    retrieveNCConnection(databasePath: string): Promise<SQLiteDBConnection>;
    /**
     * Close a Non-Conformed database connection
     * @param databasePath
     * @returns Promise<void>
     * @since 2.1.4
     */
    closeNCConnection(databasePath: string): Promise<void>;
    /**
     * Check if Non-Conformed database connection exists
     * @param databasePath
     * @returns Promise<Result>
     * @since 2.1.4
     */
    isNCConnection(databasePath: string): Promise<Result>;
    /**
     * Check if Non-Conformed database exists
     * @param databasePath
     * @returns Promise<Result>
     * @since 2.1.4
     */
    isNCDatabase(databasePath: string): Promise<Result>;
    /**
     * Get the database list
     * @returns Promise<capSQLiteValues>
     * @since 1.0.1 refactor
     */
    getDatabaseList(): Promise<capSQLiteValues>;
    /**
     * Get Migratable database List
     * @param folderPath
     * @returns Promise<capSQLiteValues>
     * @since 2.1.1
     */
    getMigratableDbList(folderPath?: string): Promise<capSQLiteValues>
     /**
     * Add SQLIte Suffix to existing databases
     * @param folderPath
     * @param dbNameList since 2.1.1
     * @returns Promise<void>
     * @since 2.0.0
     */
    addSQLiteSuffix(folderPath?: string, dbNameList?: string[]): Promise<void>
    /**
     * Delete Old Cordova databases
     * @param folderPath
     * @param dbNameList since 2.1.1
     * @returns Promise<void>
     * @since 2.0.0
     */
    deleteOldDatabases(folderPath?: string, dbNameList?: string[]): Promise<void>;
    /**
     * Import a database From a JSON
     * @param jsonstring string
     * @returns Promise<capSQLiteChanges>
     * @since 1.0.0 refactor
     */
    importFromJson(jsonstring: string): Promise<capSQLiteChanges>;
    /**
     * Check the validity of a JSON Object
     * @param jsonstring string
     * @returns Promise<Result>
     * @since 1.0.0 refactor
     */
    isJsonValid(jsonstring: string): Promise<Result>;

    /**
     * Copy databases from assets to application database folder
     * @param overwrite boolean
     * @returns Promise<void>
     * @since 2.0.0
     */
    copyFromAssets(overwrite?: boolean): Promise<void>;
    /**
     * Get databases from HTTP request to application database folder
     * @param url string
     * @param overwrite boolean
     * @returns Promise<void>
     * @since 3.0.2
     */
     getFromHTTPRequest(url: string, overwrite?: boolean): Promise<void>;
     /**
     * Check the consistency between Js Connections
     * and Native Connections
     * if inconsistency all connections are removed
     * @returns Promise<Result>
     * @since 2.0.1
     */
    checkConnectionsConsistency(): Promise<Result>;
    /**
     * Check if secure secret has been stored
     * @returns Promise<Result>
     * @since 2.0.2
     */
    isSecretStored(): Promise<Result>; 
    /**
     * Set an encrypted secret to secure storage
     * To run only once
     * Will migrate from GlobalSQLite secret when required
     * @param passphrase 
     * @returns Promise<void>
     * @since 2.0.2
     */
    setEncryptionSecret(passphrase: string): Promise<void>;   
    /**
     * Change encrypted secret from secure storage
     * Not to use to migrate from GlobalSQLite secret (run setEncryptionSecret)
     * @param passphrase 
     * @param oldpassphrase 
     * @returns Promise<void>
     * @since 2.0.2
     */
    changeEncryptionSecret(passphrase: string, oldpassphrase: string): Promise<void>; 
    /**
     * Clear the encrypted secret from secure storage
     * @returns Promise<void>
     * @since 3.0.0
     */ 
    clearEncryptionSecret(): Promise<void>;   
    /**
     * Check encryption passphrase
     *
     * @param passphrase 
     * @return Promise<Result>
     * @since 3.2.0
     */
    checkEncryptionSecret(passphrase: string): Promise<Result>;
    /**
     * Moves databases to the location the plugin can read them, and adds sqlite suffix
     * This resembles calling addSQLiteSuffix and deleteOldDatabases, but it is more performant as it doesn't copy but moves the files
     * @param folderPath the origin from where to move the databases
     * @param dbNameList the names of the databases to move, check out the getMigratableDbList to get a list, an empty list will result in copying all the databases with '.db' extension.
     */
    moveDatabasesAndAddSuffix(folderPath?: string, dbNameList?: string[],): Promise<void>;

}

export interface MySet {
    statement?: string;
    values?: any[];
}

export interface VersionUpgrade {
    toVersion: number;
    statements: string[];
}

export interface Result {
    result?: boolean;
    message?: string
}


/**
 * useSQLite Hook
 */
export const useSQLite = (onProgress? : SQLiteProps): SQLiteHook  => {
    const platform = Capacitor.getPlatform();
    const sqlitePlugin: any = CapacitorSQLite;
    const mSQLite = useMemo(() => {
        return new SQLiteConnection(sqlitePlugin);
    },[sqlitePlugin])
    const listenerHasChangedRef = useRef(false);

    useEffect(() => {
        // init Listeners
        let importListener: any = null;
        let exportListener: any = null;    
        if(platform != "electron") {   
            if( onProgress && listenerHasChangedRef.current === false) { 
                console.log(`in onProgress add listeners `)
                listenerHasChangedRef.current = true;
                if(onProgress.onProgressImport && sqlitePlugin) importListener =
                    sqlitePlugin.addListener('sqliteImportProgressEvent',
                    (e: any) => {
                        if(typeof onProgress.onProgressImport !== 'undefined')
                        onProgress.onProgressImport(e.progress);
                    });
                if(onProgress.onProgressExport && sqlitePlugin) exportListener =
                    sqlitePlugin.addListener('sqliteExportProgressEvent',
                    (e: any) => {
                        if(typeof onProgress.onProgressExport !== 'undefined')
                        onProgress.onProgressExport(e.progress);
                    });
                }
            }
        return () => {
            if(platform != "electron") {  
                console.log(`in return remove listeners `)
                if( listenerHasChangedRef.current === true) {
                    sqlitePlugin.removeAllListeners();
                }
            }
        }
    }, []);

    const availableFeaturesN = {
        useSQLite: isFeatureAvailable('CapacitorSQLite', 'useSQLite')
    }

    /**
     * Initialize the Web Store
     */
    const initWebStore = useCallback(async (): Promise<void> => {
        if(platform != "web") { 
            return Promise.reject(`Not implemented on platform ${platform}`);
        }

        try {
            await mSQLite.initWebStore();
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    }, [mSQLite]);
    /**
     * Save the Database to store
     * @param dbName string
     */
    const saveToStore = useCallback(async (dbName: string): Promise<void> => {
        if(platform != "web") { 
            return Promise.reject(`Not implemented on platform ${platform}`);
        }
        if(dbName.length > 0) {
            try {
                await mSQLite.saveToStore(dbName);
                return Promise.resolve();
            } catch (err) {
                return Promise.reject(err);
            }
        } else {
            return Promise.reject('Must provide a database name');
        }
    }, [mSQLite]);
    

    const echo = useCallback(async (value: string): Promise<any> => {
        if(value) {
            const r = await mSQLite.echo(value);
            if(r) {
                return r;
            } else {
                return {value: null};
            }
        } else {
            return {value: null};
        }
    }, [mSQLite]);

    const getPlatform = useCallback(async (): Promise<any> => {
            return {platform: platform};
    }, [platform]);
    /**
     *  Get CapacitorSQLite plugin
     */
     const getCapacitorSQLite = async (): Promise<any> => {
        return {plugin: sqlitePlugin};
    }
    /**
     * Create a Connection to Database
     * @param dbName string
     * @param encrypted boolean optional 
     * @param mode string optional
     * @param version number optional
     * @param readonly boolean optional since 3.0.1
     */  
    const createConnection = useCallback(async (dbName: string,
        encrypted?: boolean,
        mode?: string,
        version?: number,
        readonly?: boolean
        )
                : Promise<SQLiteDBConnection> => {
        if (dbName == null || dbName.length === 0) {
            return Promise.reject(new Error('Must provide a database name'));
        } 
        const mDatabase: string = dbName;
        const mVersion: number = version ? version : 1;
        const mEncrypted: boolean = encrypted ? encrypted : false;
        const mMode: string = mode ? mode : "no-encryption";
        const mReadonly: boolean = readonly ? readonly : false;
        try {
            const r = await mSQLite.createConnection(
                mDatabase, mEncrypted, mMode, mVersion, mReadonly);
            if(r) {
                return Promise.resolve(r);
            } else {
                return Promise.reject("No returned connection");
            } 
        } catch (err) {
            return Promise.reject(err);
        }
    }, [mSQLite]);
    /**
     * Close the Connection to the Database
     * @param dbName string
     * @param readonly boolean optional since 3.0.1
     */
    const closeConnection = useCallback(async (dbName: string,
                                               readonly?: boolean): Promise<void> => {
        const mReadonly: boolean = readonly ? readonly : false;
        if(dbName.length > 0) {
            try {
                await mSQLite.closeConnection(dbName, mReadonly);
                return Promise.resolve();
            } catch (err) {
                return Promise.reject(err);
            }
        } else {
            return Promise.reject('Must provide a database name');
        }
    }, [mSQLite]);
    /**
     * Check if database connection exists
     * @param database
     * @param readonly boolean optional since 3.0.1
     */
     const isConnection = useCallback(async (dbName: string,
                                             readonly?: boolean): Promise<Result> => {
        const mReadonly: boolean = readonly ? readonly : false;
        if(dbName.length > 0) {
            try {
                const r = await mSQLite.isConnection(dbName, mReadonly);
                if(r) {
                        return Promise.resolve(r);
                } else {
                    return Promise.reject("No returned isConnection");
                }
            } catch (err) {
                return Promise.reject(err);
            } 
        } else {
            return Promise.reject('Must provide a database name');
        }

    }, [mSQLite]);
    /**
     * Check if database exists
     * @param database
     */
    const isDatabase = useCallback(async (dbName: string): Promise<Result> => {
        if(dbName.length > 0) {
            try {

                const r = await mSQLite.isDatabase(dbName);
                if(r) {
                    return Promise.resolve(r);
                } else {
                    return Promise.reject("Error in isDatabase");
                }
            } catch (err) {
                return Promise.reject(err);
            }
        } else {
            return Promise.reject('Must provide a database name');
        }

    }, [mSQLite]);
    /**
     * Check if a SQLite database is encrypted
     * @param database
     * @returns Promise<Result>
     * @since 3.2.0
     */
    const isDatabaseEncrypted = useCallback(async (dbName: string): Promise<Result> => {
        if(dbName.length > 0) {
            try {

                const r = await mSQLite.isDatabaseEncrypted(dbName);
                if(r) {
                    return Promise.resolve(r);
                } else {
                    return Promise.reject("Error in isDatabaseEncrypted");
                }
            } catch (err) {
                return Promise.reject(err);
            }
        } else {
            return Promise.reject('Must provide a database name');
        }
    }, [mSQLite]);
    /**
     * Check encryption value in capacitor.config
     * @returns Promise<Result>
     * @since 3.2.0
     */
    const isInConfigEncryption = useCallback(async (): Promise<Result> => {
        try {

            const r = await mSQLite.isInConfigEncryption();
            if(r) {
                return Promise.resolve(r);
            } else {
                return Promise.reject("Error in isInConfigEncryption");
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }, [mSQLite]);
    /**
     * Check encryption value in capacitor.config
     * @returns Promise<Result>
     * @since 3.2.0
     */
    const isInConfigBiometricAuth = useCallback(async (): Promise<Result> => {
        try {

            const r = await mSQLite.isInConfigBiometricAuth();
            if(r) {
                return Promise.resolve(r);
            } else {
                return Promise.reject("Error in isInConfigBiometricAuth");
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }, [mSQLite]);
    
    /**
     * Get the database list
     * @returns Promise<capSQLiteValues>
     * @since 1.0.1 refactor
     */
    const getDatabaseList = useCallback(async (): Promise<capSQLiteValues> => {
        try {
            const r = await mSQLite.getDatabaseList();
            if(r) {
                return Promise.resolve(r);
            } else {
                return Promise.reject("Error in getDatabaseList");
            }
        } catch (err) {
            return Promise.reject(err);
        }

    }, [mSQLite]);
    /**
     * Get the migratable database list
     * @param folderPath
     * 
     */
     const getMigratableDbList = useCallback(async (folderPath?: string): Promise<capSQLiteValues> => {
        const path: string = folderPath ? folderPath : "default"
        try {
            const r = await mSQLite.getMigratableDbList(path);
            if(r) {
                return Promise.resolve(r);
            } else {
                return Promise.reject("Error in getMigratableDbList");
            }
        } catch(err) {
            return Promise.reject(err);
        }

    }, [mSQLite]);
    /**
     * Add SQLIte Suffix to existing databases
     * @param folderPath
     * @param dbNameList
     */
    const addSQLiteSuffix = useCallback(async (folderPath?: string, dbNameList?: string[]): Promise<void> => {
        const path: string = folderPath ? folderPath : "default"
        const dbList: string[] = dbNameList ? dbNameList : []
        try {
            await mSQLite.addSQLiteSuffix(path, dbList);
            return Promise.resolve();
        } catch(err) {
            return Promise.reject(err);
        }

    }, [mSQLite]);
    /**
     * Delete Old Cordova databases
     * @param folderPath
     * @param dbNameList
     */
    const deleteOldDatabases = useCallback(async (folderPath?: string, dbNameList?: string[]): Promise<void> => {
        const path: string = folderPath ? folderPath : "default"
        const dbList: string[] = dbNameList ? dbNameList : []
        try {
            await mSQLite.deleteOldDatabases(path, dbList);
            return Promise.resolve();
        } catch(err) {
            return Promise.reject(err);
        }
    }, [mSQLite]);

    /**
     * Retrieve a Connection to the Database
     * @param dbName string
     * @param readonly boolean optional since 3.0.1
     */
    const retrieveConnection = useCallback(async (dbName: string,
                                                  readonly?:boolean): Promise<SQLiteDBConnection> => {
        const mReadonly: boolean = readonly ? readonly : false;
        if(dbName.length > 0) {
            try {
                const r = await mSQLite.retrieveConnection(dbName, mReadonly);
                if(r) {
                    return Promise.resolve(r);
                } else {
                    return Promise.reject("No returned connection");
                }
            } catch (err) {
                return Promise.reject(err);
            }        
        } else {
            return Promise.reject('Must provide a database name');
        }        
    }, [mSQLite]);
    /**
     * Retrieve all Connections to Databases
     * 
     */
    const retrieveAllConnections = useCallback(async (): Promise<Map<string, SQLiteDBConnection>> => {
        try {
            const r = await mSQLite.retrieveAllConnections();
            if(r) {
                return Promise.resolve(r);
            } else {
                return Promise.reject("No returned connection");
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }, [mSQLite]);
    /**
     * Close All Connections to Databases
     * @param dbName string
     */
    const closeAllConnections = useCallback(async (): Promise<void> => {
        try {
            await mSQLite.closeAllConnections();
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    }, [mSQLite]);
    /**
     * Import from Json 
     * @param jsonstring string
     */
    const importFromJson = useCallback(async (jsonstring: string): Promise<capSQLiteChanges> => {

        try {
            const r = await mSQLite.importFromJson(jsonstring);
            if(r) {
                return Promise.resolve(r);
            } else {
                return Promise.reject('Error in importFromJson');
            } 
        } catch (err) {
            return Promise.reject(err);
        }
    }, [mSQLite]);
    /**
     * Is Json Valid
     * @param jsonstring string
     */
    const isJsonValid = useCallback(async (jsonstring: string): Promise<Result> => {

        try {
            const r = await mSQLite.isJsonValid(jsonstring);
            if(r) {
                return Promise.resolve(r);
            } else {
                return Promise.reject('Error Json Object not valid');
            } 
        } catch (err) {
            return Promise.reject(err);
        }

    }, [mSQLite]);
    /**
     * Add the upgrade Statement for database version upgrading
     * @param dbName string 
     * @param upgrade VersionUpgrade
     */
    const addUpgradeStatement = useCallback(async (dbName:string,
                upgrade: VersionUpgrade): Promise<void> => {
        if(upgrade === null) {
            return Promise.reject(new Error("Must provide an upgrade statement"));
        }
        if(upgrade.toVersion === null
            || upgrade.statements === null) {
                let msg = "Must provide an upgrade statement with ";
                msg += "toVersion & statements"
                return Promise.reject(msg);
            }

        if(dbName.length > 0) {
            try {
                await mSQLite
                .addUpgradeStatement(dbName, upgrade.toVersion,
                                     upgrade.statements);
                return Promise.resolve();
            } catch (err) {
                return Promise.reject(err);
            }
        } else {
            return Promise.reject('Must provide a database name');
        }
    }, [mSQLite]);
    /**
     * Copy databases from assets to application database folder
     */
    const copyFromAssets = useCallback(async (overwrite?: boolean) : Promise<void> => {
        const mOverwrite = overwrite!= null ? overwrite : true;
        try {
            await mSQLite.copyFromAssets(overwrite);
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    }, [mSQLite]);
    /**
     * Get databases from HTTP request to application database folder
     */
     const getFromHTTPRequest = useCallback(async (url: string, overwrite?: boolean) : Promise<void> => {
        const mOverwrite = overwrite!= null ? overwrite : true;
        try {
            await mSQLite.getFromHTTPRequest(url, overwrite);
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    }, [mSQLite]);
    /**
     * Check the consistency between Js Connections
     * and Native Connections
     * if inconsistency all connections are removed
     */
    const checkConnectionsConsistency = useCallback(async () : Promise<Result> => {
        try {
            const r = await mSQLite.checkConnectionsConsistency();
            if(r) {
                return Promise.resolve(r);
            } else {
                return Promise.reject('Error Json Object not valid');
            } 
        } catch (err) {
            return Promise.reject(err);
        }

    }, [mSQLite]);
    /**
     * Check if secure secret has been stored
     * @returns Promise<Result>
     * @since 2.0.2
     */
    const isSecretStored = useCallback(async (): Promise<Result> => {
        try {
            const r = await mSQLite.isSecretStored();
            if(r) {
                return Promise.resolve(r);
            } else {
                return Promise.reject('Error in isSecretStored');
            } 
        } catch (err) {
            return Promise.reject(err);
        }

    }, [mSQLite]);
    /**
     * Set an encrypted secret to secure storage
     * To run only once
     * Will migrate from GlobalSQLite secret when required
     * @param passphrase 
     * @returns Promise<void>
     * @since 2.0.2
    */
    const setEncryptionSecret = useCallback(async (passphrase: string): Promise<void> => {
        if (passphrase == null || passphrase.length === 0) {
            return Promise.reject(new Error('Must provide a passphrase'));
        } 
        try {
            await mSQLite.setEncryptionSecret(passphrase);
            return Promise.resolve();
        } catch(err) {
            return Promise.reject(err);
        }

    }, [mSQLite]);
    /**
     * Change encrypted secret from secure storage
     * Not to use to migrate from GlobalSQLite secret (run setEncryptionSecret)
     * @param passphrase 
     * @param oldpassphrase 
     * @returns Promise<void>
     * @since 2.0.2
     */
    const changeEncryptionSecret = useCallback(async (passphrase: string,
        oldpassphrase: string): Promise<void> => {
        if (passphrase == null || passphrase.length === 0) {
            return Promise.reject(new Error('Must provide a passphrase'));
        } 
        if (oldpassphrase == null || oldpassphrase.length === 0) {
            return Promise.reject(new Error('Must provide the old passphrase'));
        } 
        try {
            await mSQLite.changeEncryptionSecret(passphrase, oldpassphrase);
            return Promise.resolve();
        } catch(err) {
            return Promise.reject(err);
        }

    }, [mSQLite]);
    /**
     * Clear the encrypted secret from secure storage
     * @returns Promise<void>
     * @since 3.0.0
     */ 
     const clearEncryptionSecret = useCallback(async (): Promise<void> => {
        try {
            await mSQLite.clearEncryptionSecret();
            return Promise.resolve();
        } catch(err) {
            return Promise.reject(err);
        }

    }, [mSQLite]);
    /**
     * Check Encryption Secret
     * 
     * @param passphrase 
     * @returns Promise<Result>
     * @since 3.2.0
     */
    const checkEncryptionSecret = useCallback( async(passphrase: string): Promise<Result> => {
        try {
            const r = await mSQLite.checkEncryptionSecret(passphrase);
            if(r) {
                return Promise.resolve(r);
            } else {
                return Promise.reject('Error in checkEncryptionSecret');
            } 
        } catch (err) {
            return Promise.reject(err);
        }

    }, [mSQLite]);
    /**
     * Get a Non-Conformed database path
     * @param databasePath
     * @param version
     * @returns Promise<capNCDatabasePathResult>
     * @since 2.1.4
     */
    const getNCDatabasePath = useCallback(async (folderPath: string, database: string): Promise<capNCDatabasePathResult> => {
        if (folderPath == null || folderPath.length === 0) {
            return Promise.reject(new Error('Must provide a folder path'));
        } 
        if (database == null || database.length === 0) {
            return Promise.reject(new Error('Must provide a database name'));
        } 
        const mFolderPath: string = folderPath;
        const mDatabase: string = database;
        try {
            const r = await mSQLite.getNCDatabasePath(
                mFolderPath, mDatabase);
            if(r) {
                return Promise.resolve(r);
            } else {
                return Promise.reject("No returned database path");
            } 
        } catch (err) {
            return Promise.reject(err);
        }

    }, [mSQLite]);
     /**
     * Create a Non-Conformed Database Connection 
     * @param databasePath string
     * @param version number optional
     * @since 2.1.4
     */  
     const createNCConnection = useCallback(async (databasePath: string, version?: number)
                                : Promise<SQLiteDBConnection> => {
        if (databasePath == null || databasePath.length === 0) {
            return Promise.reject(new Error('Must provide a database path'));
        } 
        const mDatabasePath: string = databasePath;
        const mVersion: number = version ? version : 1;
        try {
            const r = await mSQLite.createNCConnection(
                mDatabasePath, mVersion);
            if(r) {
                return Promise.resolve(r);
            } else {
                return Promise.reject("No returned NC connection");
            } 
        } catch (err) {
            return Promise.reject(err);
        }
    }, [mSQLite]);
    /**
     * Retrieve a Non-Conformed Database Connection 
     * @param databasePath string
     * @since 2.1.4
     */
     const retrieveNCConnection = useCallback(async (databasePath: string): Promise<SQLiteDBConnection> => {
        if(databasePath.length > 0) {
            try {
                const r = await mSQLite.retrieveNCConnection(databasePath);
                if(r) {
                    return Promise.resolve(r);
                } else {
                    return Promise.reject("No returned NC connection");
                }
            } catch (err) {
                return Promise.reject(err);
            }        
        } else {
            return Promise.reject('Must provide a database path');
        }        
    }, [mSQLite]);

    /**
     * Close a Non-Conformed Database Connection 
     * @param databasePath string
     * @since 2.1.4
     */
    const closeNCConnection = useCallback(async (databasePath: string): Promise<void> => {
        if(databasePath.length > 0) {
            try {
                await mSQLite.closeNCConnection(databasePath);
                return Promise.resolve();
            } catch (err) {
                return Promise.reject(err);
            }
        } else {
            return Promise.reject('Must provide a database path');
        }
    }, [mSQLite]);
    /**
     * Check if a Non-Conformed Database Connection  exists
     * @param databasePath
     * @since 2.1.4
     */
     const isNCConnection = useCallback(async (databasePath: string): Promise<Result> => {
        if(databasePath.length > 0) {
            try {
                const r = await mSQLite.isNCConnection(databasePath);
                if(r) {
                        return Promise.resolve(r);
                } else {
                    return Promise.reject("No returned  NC Connection");
                }
            } catch (err) {
                return Promise.reject(err);
            } 
        } else {
            return Promise.reject('Must provide a database path');
        }

    }, [mSQLite]);
    /**
     * Check if database exists
     * @param databasePath
     * @since 2.1.4
     */
    const isNCDatabase = useCallback(async (databasePath: string): Promise<Result> => {
        if(databasePath.length > 0) {
            try {

                const r = await mSQLite.isNCDatabase(databasePath);
                if(r) {
                    return Promise.resolve(r);
                } else {
                    return Promise.reject("No returned  NC Connection");
                }
            } catch (err) {
                return Promise.reject(err);
            }
        } else {
            return Promise.reject('Must provide a database path');
        }

    }, [mSQLite]);
    /**
     * Moves databases to the location the plugin can read them, and adds sqlite suffix
     * This resembles calling addSQLiteSuffix and deleteOldDatabases, but it is more performant as it doesn't copy but moves the files
     * @param folderPath the origin from where to move the databases
     * @param dbNameList the names of the databases to move, check out the getMigratableDbList to get a list, an empty list will result in copying all the databases with '.db' extension.
     */
    const moveDatabasesAndAddSuffix = useCallback(async (folderPath?: string, dbNameList?: string[],): Promise<void> => {
        const path: string = folderPath ? folderPath : 'default';
        const dbList: string[] = dbNameList ? dbNameList : [];
        try {
            await mSQLite.moveDatabasesAndAddSuffix(path, dbList);
            return Promise.resolve();
        } catch(err) {
            return Promise.reject(err);
        }
    
    }, [mSQLite]);

    if (!availableFeaturesN.useSQLite) {
        return {
            initWebStore: featureNotAvailableError,
            saveToStore: featureNotAvailableError,
            echo: featureNotAvailableError,
            getPlatform: featureNotAvailableError,
            getCapacitorSQLite: featureNotAvailableError,
            createConnection: featureNotAvailableError,
            closeConnection: featureNotAvailableError,
            retrieveConnection: featureNotAvailableError,
            retrieveAllConnections: featureNotAvailableError,
            closeAllConnections: featureNotAvailableError,
            addUpgradeStatement: featureNotAvailableError,
            importFromJson: featureNotAvailableError,
            isJsonValid: featureNotAvailableError,
            copyFromAssets: featureNotAvailableError,
            getFromHTTPRequest: featureNotAvailableError,
            isConnection: featureNotAvailableError,
            isDatabase: featureNotAvailableError,
            getNCDatabasePath: featureNotAvailableError,
            createNCConnection: featureNotAvailableError,
            closeNCConnection: featureNotAvailableError,
            retrieveNCConnection: featureNotAvailableError,
            isNCConnection: featureNotAvailableError,
            isNCDatabase: featureNotAvailableError,
            getDatabaseList: featureNotAvailableError,
            getMigratableDbList: featureNotAvailableError,
            addSQLiteSuffix: featureNotAvailableError,
            deleteOldDatabases: featureNotAvailableError,
            checkConnectionsConsistency: featureNotAvailableError,
            isSecretStored: featureNotAvailableError,
            setEncryptionSecret: featureNotAvailableError,
            changeEncryptionSecret: featureNotAvailableError,
            clearEncryptionSecret: featureNotAvailableError,
            checkEncryptionSecret: featureNotAvailableError,
            moveDatabasesAndAddSuffix: featureNotAvailableError,
            isInConfigEncryption: featureNotAvailableError,
            isInConfigBiometricAuth: featureNotAvailableError,
            isDatabaseEncrypted: featureNotAvailableError,            
            ...notAvailable
        };
    } else {
        return {echo, getPlatform, getCapacitorSQLite, createConnection, closeConnection,
            retrieveConnection, retrieveAllConnections, closeAllConnections,
            addUpgradeStatement, importFromJson, isJsonValid, copyFromAssets, getFromHTTPRequest,
            isConnection, isDatabase, getDatabaseList, getMigratableDbList, addSQLiteSuffix,
            deleteOldDatabases, checkConnectionsConsistency, 
            isSecretStored, setEncryptionSecret, changeEncryptionSecret,
            clearEncryptionSecret, checkEncryptionSecret, moveDatabasesAndAddSuffix,
            initWebStore, saveToStore, getNCDatabasePath, createNCConnection,
            closeNCConnection, retrieveNCConnection, isNCConnection, isNCDatabase,
            isInConfigEncryption, isInConfigBiometricAuth, isDatabaseEncrypted, isAvailable: true};
    }

}