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

export default (
  config: ExportedConfig,
  props: {
    enableBase64ShareAndroid?: boolean;
    android?: string[];
    ios?: string[];
  },
) => {
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
    {
      android: {
        manifestQueries: {
          package: props.android ?? [],
        },
      },
    },
  );
};
