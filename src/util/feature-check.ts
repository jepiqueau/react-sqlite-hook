import { Capacitor } from '@capacitor/core';
import { FeatureNotAvailableError } from './models';

const allTrue = {
  web: true,
  ios: true,
  android: true,
  electron: true
}

const featureMap = {
    CapacitorDataStorageSqlite: {
    useStorageSQLite: allTrue,    
  }
}

export function isFeatureAvailable<
  T extends typeof featureMap,
  PluginKeys extends keyof NonNullable<T>,
  FeatureKeys extends keyof NonNullable<NonNullable<T>[PluginKeys]>>
  (plugin: PluginKeys, method: FeatureKeys): boolean {
    if(Capacitor.isPluginAvailable(plugin as string) && !!(featureMap as any)[plugin][method][Capacitor.platform!]) {
      return true;
    }
    return false;
}

export function featureNotAvailableError(): any {
  throw new FeatureNotAvailableError()
}