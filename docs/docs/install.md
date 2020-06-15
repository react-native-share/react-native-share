---
id: install
title: Installing
---

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

### iOS Install

1. `yarn add react-native-share`
2. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
3. Go to `node_modules` ➜ `react-native-share` ➜ `ios` and add `RNShare.xcodeproj`
4. In XCode, in the project navigator, select your project. Add `libRNShare.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
5. In XCode, in the project navigator, select your project. Add `Social.framework` and `MessageUI.framework` to your project's `General` ➜ `Linked Frameworks and Libraries`
6. Run your project (`Cmd+R`)

### Android Install

1. `yarn add react-native-share`
2. Open up `android/app/src/main/java/[...]/MainApplication.java`
    - Add `import cl.json.RNSharePackage;` and `import cl.json.ShareApplication;` to the imports at the top of the file
    - Add `new RNSharePackage()` to the list returned by the `getPackages()` method

3. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-share'
  	project(':react-native-share').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-share/android')
  	```
4. Insert the following lines inside the dependencies block in
   `android/app/build.gradle`:

    ```
      implementation project(':react-native-share')
    ```
5. **(Optional)** [Follow this for implementing Provider](#adding-your-implementation-of-fileprovider) ## FIXME

### Windows Install

[Read it! :D](https://github.com/ReactWindows/react-native)

1. `yarn add react-native-share`
2. In Visual Studio add the `RNShare.sln` in `node_modules/react-native-share/windows/RNShare.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using Cl.Json.RNShare;` to the usings at the top of the file
  - Add `new RNSharePackage()` to the `List<IReactPackage>` returned by the `Packages` method



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
