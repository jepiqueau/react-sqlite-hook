import { useCallback, useMemo, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { AvailableResult, notAvailable } from './util/models';
import { isFeatureAvailable, featureNotAvailableError } 
                                    from './util/feature-check';
import { CapacitorSQLite, SQLiteDBConnection, SQLiteConnection,
         capSQLiteChanges, capSQLiteValues } from '@capacitor-community/sqlite';

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
     * @param upgrade upgrade statement
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
     * @returns Promise<SQLiteDBConnection>
     * @since 2.0.0 refactor
     */
    createConnection(
        database: string,
        encrypted?: boolean,
        mode?: string,
        version?: number,
    ): Promise<SQLiteDBConnection>;
    /**
     * Retrieve an existing database connection
     * @param database
     * @returns Promise<SQLiteDBConnection>
     * @since 2.0.0
     */
    retrieveConnection(database: string,): Promise<SQLiteDBConnection>;
    /**
     * Retrieve all database connections
     * @returns Promise<Map<string, SQLiteDBConnection>>
     * @since 2.0.0
     */
    retrieveAllConnections(): Promise<Map<string, SQLiteDBConnection>>;
    /**
     * Close a database connection
     * @param database
     * @returns Promise<void>
     * @since 2.0.0 
     */
    closeConnection(database: string): Promise<void>;
    /**
     * Close all database connections
     * @returns Promise<void>
     * @since 2.0.0
     */
    closeAllConnections(): Promise<void>;
    /**
     * Check if database connection exists
     * @param database
     * @returns Promise<Result>
     * @since 2.0.0
     */
    isConnection(database: string): Promise<Result>;
    /**
     * Check if database exists
     * @param database
     * @returns Promise<Result>
     * @since 2.0.0
     */
    isDatabase(database: string): Promise<Result>;
    /**
     * Get the database list
     * @returns Promise<capSQLiteValues>
     * @since 1.0.1 refactor
     */
    getDatabaseList(): Promise<capSQLiteValues>;
    /**
     * Add SQLIte Suffix to existing databases
     * @param folderPath
     * @returns Promise<void>
     * @since 2.0.0
     */
    addSQLiteSuffix(folderPath?: string): Promise<void>
    /**
     * Delete Old Cordova databases
     * @param folderPath
     * @returns Promise<void>
     * @since 2.0.0
     */
    deleteOldDatabases(folderPath?: string): Promise<void>;
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
     * @returns Promise<void>
     * @since 2.0.0
     */
    copyFromAssets(): Promise<void>;
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

}

export interface MySet {
    statement?: string;
    values?: any[];
}

export interface VersionUpgrade {
    fromVersion: number;
    toVersion: number;
    statement: string;
    set?: MySet[]; 
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

    useEffect(() => {
        // init Listeners
        let importListener: any = null;
        let exportListener: any = null;    
        if(platform != "electron") {   
            if( onProgress ) { 
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
                if(importListener) importListener.remove();
                if(exportListener) exportListener.remove();
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
     * @param _encrypted boolean optional 
     * @param _mode string optional
     * @param version number optional
     */  
    const createConnection = useCallback(async (dbName: string,
        encrypted?: boolean,
        mode?: string,
        version?: number)
                : Promise<SQLiteDBConnection> => {
        if (dbName == null || dbName.length === 0) {
            return Promise.reject(new Error('Must provide a database name'));
        } 
        const mDatabase: string = dbName;
        const mVersion: number = version ? version : 1;
        const mEncrypted: boolean = encrypted ? encrypted : false;
        const mMode: string = mode ? mode : "no-encryption";
        try {
            const r = await mSQLite.createConnection(
                mDatabase, mEncrypted, mMode, mVersion);
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
     */
    const closeConnection = useCallback(async (dbName: string): Promise<void> => {
        if(dbName.length > 0) {
            try {
                await mSQLite.closeConnection(dbName);
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
     */
     const isConnection = useCallback(async (dbName: string): Promise<Result> => {
        if(dbName.length > 0) {
            try {
                const r = await mSQLite.isConnection(dbName);
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
     * Add SQLIte Suffix to existing databases
     * @param folderPath
     */
    const addSQLiteSuffix = useCallback(async (folderPath?: string): Promise<void> => {
        const path: string = folderPath ? folderPath : "default"
        try {
            await mSQLite.addSQLiteSuffix(path);
            return Promise.resolve();
        } catch(err) {
            return Promise.reject(err);
        }

    }, [mSQLite]);
    /**
     * Delete Old Cordova databases
     * @param folderPath
     */
    const deleteOldDatabases = useCallback(async (folderPath?: string): Promise<void> => {
        const path: string = folderPath ? folderPath : "default"
        try {
            await mSQLite.deleteOldDatabases(path);
            return Promise.resolve();
        } catch(err) {
            return Promise.reject(err);
        }
    }, [mSQLite]);

    /**
     * Retrieve a Connection to the Database
     * @param dbName string
     */
    const retrieveConnection = useCallback(async (dbName: string): Promise<SQLiteDBConnection> => {
        if(dbName.length > 0) {
            try {
                const r = await mSQLite.retrieveConnection(dbName);
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
        if(upgrade.fromVersion === null || upgrade.toVersion === null
            || upgrade.statement === null) {
                let msg = "Must provide an upgrade statement with ";
                msg += "fromVersion & toVersion & statement"
                return Promise.reject(msg);
            }

        if(dbName.length > 0) {
            try {
                await mSQLite
                .addUpgradeStatement(dbName, upgrade.fromVersion,
                                    upgrade.toVersion, upgrade.statement,
                                    upgrade.set);
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
    const copyFromAssets = useCallback(async () : Promise<void> => {
        try {
            await mSQLite.copyFromAssets();
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
            isConnection: featureNotAvailableError,
            isDatabase: featureNotAvailableError,
            getDatabaseList: featureNotAvailableError,
            addSQLiteSuffix: featureNotAvailableError,
            deleteOldDatabases: featureNotAvailableError,
            checkConnectionsConsistency: featureNotAvailableError, 
            isSecretStored: featureNotAvailableError,
            setEncryptionSecret: featureNotAvailableError,
            changeEncryptionSecret: featureNotAvailableError,             
            ...notAvailable
        };
    } else {
        return {echo, getPlatform, getCapacitorSQLite, createConnection, closeConnection,
            retrieveConnection, retrieveAllConnections, closeAllConnections,
            addUpgradeStatement, importFromJson, isJsonValid, copyFromAssets,
            isConnection, isDatabase, getDatabaseList, addSQLiteSuffix,
            deleteOldDatabases, checkConnectionsConsistency, 
            isSecretStored, setEncryptionSecret, changeEncryptionSecret,
            initWebStore, saveToStore, isAvailable: true};
    }

}