module.exports = {
  dependencies: {
    'react-native-share': {
      root: __dirname,
    },
  },
  project: {
    android: {
      sourceDir: './Example/android',
    },
    ios: {
      project: './Example/ios/Example.xcodeproj',
    },
  },
};
