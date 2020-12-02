import { useCallback, useEffect } from 'react';
import { Capacitor, Plugins } from '@capacitor/core';
import { AvailableResult, notAvailable } from './util/models';
import { isFeatureAvailable, featureNotAvailableError } 
                                    from './util/feature-check';
import '@capacitor-community/sqlite';
import { SQLiteDBConnection,
         SQLiteConnection } from '@capacitor-community/sqlite';

/**
 * SQLite Hook Interface
 */
interface ISQLiteHook extends AvailableResult{
    /**
     * Echo a value
     * @param value
     * @returns Promise<{value: string}>
     * @since 1.0.0 refactor
     */
    echo(value: string): Promise<{value: string}>;
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
  
interface Result {
    result?: boolean;
    message?: string
}
    
/**
 * useSQLite Hook
 */
export function useSQLite(): ISQLiteHook {
    const { CapacitorSQLite } = Plugins;
    const platform = Capacitor.getPlatform();
    const sqlitePlugin: any = CapacitorSQLite;
    const mSQLite: SQLiteConnection = new SQLiteConnection(sqlitePlugin);
    let permissionsListener: any = null;

    const availableFeaturesN = {
        useSQLite: isFeatureAvailable('CapacitorSQLite', 'useSQLite')
    }
    const androidPermissions = async () => {
        try {
            await sqlitePlugin.requestPermissions();
            return { result: true };
        } catch (e) {
            console.log("Error requesting permissions " + e);
            return { result: false,
                message: "Error requesting permissions " + e};
        }   
    }
  
    if (!availableFeaturesN.useSQLite) {
        return {
            echo: featureNotAvailableError,
            createConnection: featureNotAvailableError,
            closeConnection: featureNotAvailableError,
            retrieveConnection: featureNotAvailableError,
            retrieveAllConnections: featureNotAvailableError,
            closeAllConnections: featureNotAvailableError,
            addUpgradeStatement: featureNotAvailableError,
            requestPermissions: featureNotAvailableError,
            ...notAvailable
        };
    }
    /**
     * Request Permissions
     */
    const requestPermissions = useCallback(async ():Promise<any> => {
        return new Promise(async (resolve) => {
            if(platform === "android") { 

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
    }, []);
    const echo = useCallback(async (value: string): Promise<any> => {
        const r = await mSQLite.echo(value);
        if(r) {
            if( typeof r.value != 'undefined') {
                return r;
            }
        } else {
            return {value: null};
        }
    }, []);
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
            if (typeof dbName === 'undefined') {
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
    }, []);
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
    }, []);
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
    }, []);
    /**
     * Retrieve all Connections to Databases
     * 
     */
    const retrieveAllConnections = useCallback(async () => {
            const r = await mSQLite.retrieveAllConnections();
            var ret: any = {};
            if(r) {
               return r;
            } 
            return null;  
    }, []);
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

    }, []);
    return { echo, createConnection, closeConnection, retrieveConnection,
            retrieveAllConnections, closeAllConnections,
            addUpgradeStatement, requestPermissions, isAvailable: true };
}
