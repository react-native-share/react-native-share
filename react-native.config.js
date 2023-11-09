module.exports = {
  dependencies: {
    'react-native-share': {
      root: __dirname,
    },
  },
  project: {
    android: {
      sourceDir: './example/android',
    },
    ios: {
      sourceDir: './example/ios',
    },
  },
};
