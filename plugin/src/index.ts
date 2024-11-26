import {
  withAndroidManifest,
  createRunOncePlugin,
  ExportedConfigWithProps,
  ExportedConfig,
} from '@expo/config-plugins';

// eslint-disable-next-line import/no-commonjs, @typescript-eslint/no-var-requires
const pkg = require('../../package.json');

/**
 * @type {import('./types').ManifestQueries}
 * what we are trying to add:
 * <queries>
    <package android:name="com.facebook.katana"/>
    <package android:name="com.instagram.android"/>
    <package android:name="com.twitter.android"/>
    <package android:name="com.zhiliaoapp.musically"/>
    <intent></intent>
      <action android:name="android.intent.action.VIEW"/>
      <category android:name="android.intent.category.BROWSABLE"/>
      <data android:scheme="https"/>
    </intent>
  </queries>
 */

/**
 * @param {import('@expo/config-plugins').ExportedConfig} config
 */
const withAndroidManifestService = (config: ExportedConfig, props: WithSocialShareProps) => {
  return withAndroidManifest(config, (config: ExportedConfigWithProps) => {
    config.modResults.manifest = {
      ...config.modResults.manifest,
      queries: {
        package: props?.android?.map((social) => ({
          $: {
            'android:name': social,
          },
        })),
        intent: [
          {
            action: {
              $: {
                'android:name': 'android.intent.action.VIEW',
              },
            },
            category: {
              $: {
                'android:name': 'android.intent.category.BROWSABLE',
              },
            },
            data: {
              $: {
                'android:scheme': 'https',
              },
            },
          },
        ],
      },
    };

    return config;
  });
};

const withInfoPlist = (config: ExportedConfig, props: WithSocialShareProps) => {
  return {
    ...config,
    ios: {
      ...config.ios,
      infoPlist: {
        ...config.ios?.infoPlist,
        LSApplicationQueriesSchemes: config.ios?.infoPlist?.LSApplicationQueriesSchemes
          ? [...config.ios.infoPlist.LSApplicationQueriesSchemes, ...props.ios]
          : props.ios,
      },
    },
  };
};

type WithSocialShareProps = {
  ios: string[];
  android: string[];
};

function withSocialShare(config: ExportedConfig, props: WithSocialShareProps) {
  config = withAndroidManifestService(config, props); // Android
  config = withInfoPlist(config, props); // iOS
  return config;
}

// eslint-disable-next-line import/no-commonjs
module.exports = createRunOncePlugin(withSocialShare, pkg.name, pkg.version);
