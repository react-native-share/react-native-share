import * as fs from 'fs';

import { ExportedConfig } from '@expo/config-plugins';
import { withBuildProperties } from 'expo-build-properties';

/**
 * Handles for edge case when LSApplicationQueriesSchemes is an object or undefined.
 */
const getIOSQuerySchemes = (config: ExportedConfig): string[] => {
  return Array.isArray(config.ios?.infoPlist?.LSApplicationQueriesSchemes)
    ? config.ios?.infoPlist?.LSApplicationQueriesSchemes ?? []
    : [];
};

/**
 * Currently there are noway to get manifest queries config directly
 * So we parse AndroidManifest.xml to get the queries packages.
 */
export function getManifestQueriesPackagesSync(manifestPath: string): string[] {
  if (!fs.existsSync(manifestPath)) return [];
  const xml = fs.readFileSync(manifestPath, 'utf8');
  const queriesSection = xml.match(/<queries>[\s\S]*?<\/queries>/);
  if (!queriesSection) return [];
  const matches = [...queriesSection[0].matchAll(/<package[^>]*android:name="([^"]+)"[^>]*\/>/g)];
  return matches.map((m) => m[1]);
}

export default (
  config: ExportedConfig,
  props: {
    enableBase64ShareAndroid?: boolean;
    android?: string[];
    ios?: string[];
  },
) => {
  let manifestPath = './android/app/src/main/AndroidManifest.xml';
  if (config.android?.publishManifestPath) {
    manifestPath = config.android.publishManifestPath;
  }
  const currentManifestQueries = getManifestQueriesPackagesSync(manifestPath);
  const updatedManifestQueries = (props.android ?? []).filter(
    (p) => !currentManifestQueries.includes(p),
  );

  const propConfig = {
    android: {},
  };

  /**
   * manifestQueries.package = [] would crashes the prebuild
   */
  if (updatedManifestQueries.length > 0) {
    propConfig.android = {
      manifestQueries: {
        package: updatedManifestQueries,
      },
    };
  }

  return withBuildProperties(
    {
      ...config,
      android: {
        ...config.android,
        ...(props.enableBase64ShareAndroid
          ? {
              permissions: [
                ...new Set([
                  ...(config.android?.permissions ?? []),
                  'android.permission.WRITE_EXTERNAL_STORAGE',
                ]),
              ],
            }
          : {}),
      },
      ios: {
        ...config.ios,
        infoPlist: {
          ...config.ios?.infoPlist,
          LSApplicationQueriesSchemes: [...getIOSQuerySchemes(config), ...(props?.ios ?? [])],
        },
      },
    },
    propConfig,
  );
};
