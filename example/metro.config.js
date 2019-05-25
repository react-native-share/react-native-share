/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');
const blacklist = require('metro-config/src/defaults/blacklist');

const reactNativeShareRoot = path.resolve(__dirname, '..');
const exampleRoot = path.resolve(__dirname, '.');

module.exports = {
  projectRoot: path.resolve(__dirname, '.'),

  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  watchFolders: [path.resolve(__dirname, 'node_modules'), exampleRoot],
  resolver: {
    blacklistRE: blacklist([
      new RegExp(`${reactNativeShareRoot}/node_modules/react-native/.*`),
    ]),
  },
};
