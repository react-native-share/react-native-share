module.exports = {
  extends: ['satya164'],

  rules: {
    'react-native/no-color-literals': 'off',

    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'all',
        useTabs: false,
        printWidth: 100,
      },
    ],
  },

  globals: {
    __DEV__: true,
  },
};
