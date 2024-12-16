import { ExportedConfig } from '@expo/config-plugins';
import { withBuildProperties } from 'expo-build-properties';

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
                ...(config.android?.permissions ?? []),
                'android.permission.WRITE_EXTERNAL_STORAGE',
              ],
            }
          : {}),
      },
      ios: {
        ...config.ios,
        infoPlist: {
          ...config.ios?.infoPlist,
          LSApplicationQueriesSchemes: [
            ...(config.ios?.infoPlist?.LSApplicationQueriesSchemes ?? []),
            ...(props.ios ?? []),
          ],
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
