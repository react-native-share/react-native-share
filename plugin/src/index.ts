import { ExportedConfig, withAndroidManifest } from '@expo/config-plugins';

export default (
  config: ExportedConfig,
  props: {
    enableBase64ShareAndroid?: boolean;
    android?: string[];
    ios?: string[];
  } = {},
): ExportedConfig => {
  const currentSchemes = config.ios?.infoPlist?.LSApplicationQueriesSchemes;

  return withAndroidManifest(
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
          LSApplicationQueriesSchemes: [
            ...new Set([
              ...(Array.isArray(currentSchemes) ? currentSchemes : []),
              ...(props.ios ?? []),
            ]),
          ],
        },
      },
    },
    (modConfig) => {
      if (!props.android?.length) return modConfig;

      const queries = (modConfig.modResults.manifest.queries ??= []);
      const packages = new Set(
        queries.flatMap((query) => (query.package ?? []).map((item) => item.$['android:name'])),
      );
      if (!queries.length) queries.push({});

      for (const packageName of props.android) {
        if (!packages.has(packageName)) {
          (queries[0].package ??= []).push({
            $: { 'android:name': packageName },
          });
          packages.add(packageName);
        }
      }
      return modConfig;
    },
  );
};
