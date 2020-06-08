---
id: install
title: Installing
---

## Install

If you are using `react-native >= 0.60` you just need to do a simple:

```shell
yarn add react-native-share
```

Or if are using npm:


```shell
npm i react-native-share --save
```

After that, we need to install the dependencies to use the project on iOS(you can skip this part, if you are using this on Android).

Now run a simple: `npx pod-install` or `cd ios && pod install`. After that, you should be able to use the library on both Platforms, iOS and Android. 

Also, to use this library on iOS you will need:

* XCode 11 or higher
* iOS 13 SDK or higher

After that, you will see that the library is now available at your `node_modules`.

## Manual Linking

If the auto-linking doesn't work for any reason, you can still run a:

```shell
react-native link react-native-share
```

## Manual Install

TODO

## Older versions

If you need to use a older version of `react-native < 0.60`, then you will need to run a:

```shell
yarn add react-native-share@version
```

Or with npm:

```shell
npm i react-native-share@version --save
```

You can look at all versions, that we published [here](https://github.com/react-native-community/react-native-share/releases).


## react-native 0.59.10 

If you can't update your project to the most recent version of both react-native and react-native-share, please use `1.2.1`. Alternatively you can use [jetifier](https://github.com/mikehardy/jetifier#to-reverse-jetify--convert-node_modules-dependencies-to-support-libraries) running a ```npx jetify -r```.

<!-- Write about Getting started, showing how: link, using Share.open. -->
