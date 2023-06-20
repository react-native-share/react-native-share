# react-native-share [![react-native-share](https://circleci.com/gh/react-native-share/react-native-share.svg?style=svg)](https://app.circleci.com/pipelines/github/react-native-share/react-native-share) [![npm version](https://badge.fury.io/js/react-native-share.svg)](http://badge.fury.io/js/react-native-share) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

React Native Share, is a simple tool for sharing messages and files with other apps.

# Sponsors

---

If you use this library on your commercial/personal projects, you can help us by funding the work on specific issues that you choose by using IssueHunt.io!

This gives you the power to prioritize our work and support the project contributors. Moreover, it'll guarantee the project will be updated and maintained in the long run.

[![issuehunt-image](https://issuehunt.io/static/embed/issuehunt-button-v1.svg)](https://issuehunt.io/repos/43406976)

# Getting started 🚀

---

If you are using `react-native >= 0.7X` and/or the new arch you just need to do a simple:

```shell
yarn add react-native-share
```

Or if are using npm:

```shell
npm i react-native-share --save
```

After that, we need to install the dependencies to use the project on iOS(you can skip this part if you are using this on Android).

Now run a simple: `npx pod-install` or `cd ios && pod install`. After that, you should be able to use the library on both Platforms, iOS and Android.

Then simply import:

```js
import Share from 'react-native-share';

Share.open(options)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    err && console.log(err);
  });
```

Which you do something similar to this:

![example-ios](website/static/img/assets-docs/ios-readme-example.gif)

# Documentation

If you are using a older version of `react-native` or `react-native-share`, having any problem or want to know how use `Share.open` and other functions, please refer to our new [docs](https://react-native-share.github.io/react-native-share) and help us improve that.🚀
