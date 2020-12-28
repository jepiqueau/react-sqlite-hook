import { useCallback, useMemo } from 'react';
import { Capacitor, Plugins } from '@capacitor/core';
import { AvailableResult, notAvailable } from './util/models';
import { isFeatureAvailable, featureNotAvailableError } 
                                    from './util/feature-check';
import '@capacitor-community/sqlite';
import { SQLiteDBConnection,
         SQLiteConnection, capSQLiteChanges } from '@capacitor-community/sqlite';

export { SQLiteDBConnection }
/**
 * SQLite Hook Interface
 */
interface SQLiteHook extends  AvailableResult {
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
     * Add an Upgrade Statement to Update Database Version
     * @param dbName database name
     * @param upgrade upgrade statement
     * @returns Promise<Result>
     * @since 1.0.0 refactor
     */
    addUpgradeStatement(dbName: string, upgrade: VersionUpgrade)
                                                    :Promise<Result>;
    /**
     * Create a connection to a database
     * @param database
     * @param encrypted
     * @param mode
     * @param version
     * @returns Promise<SQLiteDBConnection | Result | null>
     * @since 1.0.0 refactor
     */
    createConnection(
        database: string,
        encrypted?: boolean,
        mode?: string,
        version?: number,
    ): Promise<SQLiteDBConnection | Result | null>;
    /**
     * Retrieve an existing database connection
     * @param database
     * @returns Promise<SQLiteDBConnection | Result | null>
     * @since 1.0.0 refactor
     */
    retrieveConnection(
        database: string,
    ): Promise<SQLiteDBConnection | Result | null>;
    /**
     * Retrieve all database connections
     * @returns Promise<capSQLiteResult>
     * @since 1.0.0 refactor
     */
    retrieveAllConnections(): Promise<any | null>;
    /**
     * Close a database connection
     * @param database
     * @returns Promise<Result>
     * @since 1.0.0 refactor
     */
    closeConnection(database: string): Promise<Result>;
    /**
     * Close all database connections
     * @returns Promise<Result>
     * @since 1.0.0 refactor
     */
    closeAllConnections(): Promise<Result>;
    /**
     * Import a database From a JSON
     * @param jsonstring string
     * @returns Promise<Changes>
     * @since 2.9.0 refactor
     */
    importFromJson(jsonstring: string): Promise<capSQLiteChanges>;
    /**
     * Check the validity of a JSON Object
     * @param jsonstring string
     * @returns Promise<Result>
     * @since 2.9.0 refactor
     */
    isJsonValid(jsonstring: string): Promise<Result>;

    /**
     * Request Permissions
     * @returns Promise<Result>
     * @since 1.0.0 refactor
     */
    requestPermissions(): Promise<Result>;
}

interface MySet {
    statement?: string;
    values?: any[];
}

interface VersionUpgrade {
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
export const useSQLite = (): SQLiteHook  => {

    const { CapacitorSQLite } = Plugins;
    const platform = Capacitor.getPlatform();
    const sqlitePlugin: any = CapacitorSQLite;
    const mSQLite = useMemo(() => {
        return new SQLiteConnection(sqlitePlugin);
    },[sqlitePlugin])


    const availableFeaturesN = {
        useSQLite: isFeatureAvailable('CapacitorSQLite', 'useSQLite')
    }

    /**
     * Request Permissions
     */
    const requestPermissions = useCallback(async ():Promise<any> => {
        return new Promise(async (resolve) => {
            console.log("$$$$ platform " + platform)
            if(platform === "android") { 
                const androidPermissions = async () => {
                    console.log("$$$$ going to ask for permissions " + platform)
                    try {
                        await sqlitePlugin.requestPermissions();
                        return { result: true };
                    } catch (e) {
                        console.log("Error requesting permissions " + e);
                        return { result: false,
                            message: "Error requesting permissions " + e};
                    }   
                }
                let permissionsListener: any = null;
                permissionsListener = sqlitePlugin.addListener(
                        'androidPermissionsRequest',async (e: any) => {
                    if(e.permissionGranted === 0) {
                        permissionsListener.remove();
                        resolve({result: false, message:
                            "Error Permissions not granted"});
                    } else {
                        permissionsListener.remove();
                        resolve({result: true});
                    }
                });
                await androidPermissions();
            } else {
                resolve({result: false, message:
                    "Error Permissions not required for this platform"});
            }
        });
    }, [platform, sqlitePlugin]);

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
                : Promise<SQLiteDBConnection| Result | null> => {
        if (dbName == null || dbName.length === 0) {
        return { result: false,
        message: 'Must provide a database name'};
        } 
        const mDatabase: string = dbName;
        const mVersion: number = version ? version : 1;
        const mEncrypted: boolean = encrypted ? encrypted : false;
        const mMode: string = mode ? mode : "no-encryption";
        const r = await mSQLite.createConnection(
                        mDatabase, mEncrypted, mMode, mVersion);

        if(r) {
            return r;
        }
        return null;
    }, [mSQLite]);
    /**
     * Close the Connection to the Database
     * @param dbName string
     */
    const closeConnection = useCallback(async (dbName: string) => {
        if(dbName.length > 0) {
            const r = await mSQLite.closeConnection(dbName);
            if(r) {
                if( typeof r.result != 'undefined') {
                    return r;
                }
            } 
            return {result: false, message: "Error in closeConnection"};  
        }
        return {result: false, message: "Must provide a database name"};
    }, [mSQLite]);
    /**
     * Retrieve a Connection to the Database
     * @param dbName string
     */
    const retrieveConnection = useCallback(async (dbName: string) => {
        if(dbName.length > 0) {
            const r = await mSQLite.retrieveConnection(dbName);
            if(r) {
                return r;
            } 
            return null;  
        }
        return {result: false, message: "Must provide a database name"};
    }, [mSQLite]);
    /**
     * Retrieve all Connections to Databases
     * 
     */
    const retrieveAllConnections = useCallback(async () => {
            const r = await mSQLite.retrieveAllConnections();
            if(r) {
                return r;
            } 
            return null;  
    }, [mSQLite]);
    /**
     * Close All Connections to Databases
     * @param dbName string
     */
    const closeAllConnections = useCallback(async () => {
            const r = await mSQLite.closeAllConnections();
            if(r) {
                if( typeof r.result != 'undefined') {
                    return r;
                }
            } 
            return {result: false, message: "Error in closeConnection"};  
    }, [mSQLite]);
    /**
     * Import from Json 
     * @param jsonstring string
     */
    const importFromJson = useCallback(async (jsonstring: string) => {
        const r = await mSQLite.importFromJson(jsonstring);
        if(r) {
            if( typeof r.changes != 'undefined') {
                return r;
            }
        } 
        return {changes: {changes: -1, lastId: -1}, message: "Error in importFromJson"};  

    }, [mSQLite]);
    /**
     * IIs Json Valid
     * @param jsonstring string
     */
    const isJsonValid = useCallback(async (jsonstring: string) => {
        const r = await mSQLite.isJsonValid(jsonstring);
        if(r) {
            if( typeof r.result != 'undefined') {
                return r;
            }
        } 
        return {result: false, message: "Error in isJsonValid"};  

    }, [mSQLite]);
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
            const r = await mSQLite
                .addUpgradeStatement(dbName, upgrade.fromVersion,
                                    upgrade.toVersion, upgrade.statement,
                                    upgrade.set)
            if(r) {
                if( typeof r.result != 'undefined') {
                    return r;
                }
            } 
            return {result: false,
                    message:"addUpgradeStatement failed"};
        } else {
            return {result: false,
                    message:"Must provide a database name"};
        }
    }, [mSQLite]);


    if (!availableFeaturesN.useSQLite) {
        return {
            echo: featureNotAvailableError,
            getPlatform: featureNotAvailableError,
            createConnection: featureNotAvailableError,
            closeConnection: featureNotAvailableError,
            retrieveConnection: featureNotAvailableError,
            retrieveAllConnections: featureNotAvailableError,
            closeAllConnections: featureNotAvailableError,
            addUpgradeStatement: featureNotAvailableError,
            importFromJson: featureNotAvailableError,
            isJsonValid: featureNotAvailableError,
            requestPermissions: featureNotAvailableError,
            ...notAvailable
        };
    } else {
        return {echo, getPlatform, createConnection, closeConnection,
            retrieveConnection, retrieveAllConnections, closeAllConnections,
            addUpgradeStatement, importFromJson, isJsonValid,
            requestPermissions, isAvailable: true};
    }

}