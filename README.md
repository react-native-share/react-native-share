# react-native-share [![CircleCI](https://circleci.com/gh/react-native-community/react-native-share/tree/master.svg?style=svg&circle-token=0c6860240abba4e16bd07df0ea805a72b67b8d41)](https://circleci.com/gh/react-native-community/react-native-share/tree/master) [![npm version](https://badge.fury.io/js/react-native-share.svg)](http://badge.fury.io/js/react-native-share)
React Native Share, a simple tool for share message and file to other apps.

# Sponsors
---
If you use this library on your commercial/personal projects, you can help us by funding the work on specific issues that you choose by using IssueHunt.io!

This gives you the power to prioritize our work and support the project contributors. Moreover it'll guarantee the project will be updated and maintained in the long run.

[![issuehunt-image](https://issuehunt.io/static/embed/issuehunt-button-v1.svg)](https://issuehunt.io/repos/43406976)


# Getting started
---

### If you are using `react-native` >= 0.60.0 please use `react-native-share` >= 2.0.0

## Automatic Way
---
``` 
yarn add react-native-share
```

or if you're using npm
``` 
npm install react-native-share --save
```
---

#### Important:
Linking is not needed anymore. ``react-native@0.60.0+`` supports dependencies auto linking.
For iOS you also need additional step to install auto linked Pods (Cocoapods should be installed):
``` 
cd ios && pod install && cd ../
```
___

### If you are using `react-native` <= 0.59.10 please use `react-native-share` <= 1.2.1:
If you are having any problems with this library, or need to use >= 2.0.0 please refer to: [jetifier](https://github.com/mikehardy/jetifier#to-reverse-jetify--convert-node_modules-dependencies-to-support-libraries).

After installing jetifier, runs a ```npx jetify -r``` and test if this works by running a ```react-native run-android```.
## Automatic Way

---
``` 
yarn add react-native-share
react-native link react-native-share
```

or if you're using npm
``` 
npm install react-native-share --save
react-native link react-native-share
```
---

We recommend using the releases from npm, however you can use the master branch if you need any feature that is not available on NPM. By doing this you will be able to use unreleased features, but the module may be less stable. 
**yarn**: 
``` 
yarn add react-native-share@git+https://git@github.com/react-native-community/react-native-share.git
```



## Manual install

### iOS Install


1. `yarn add react-native-share`
2. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
3. Go to `node_modules` ➜ `react-native-share` ➜ `ios` and add `RNShare.xcodeproj`
4. In XCode, in the project navigator, select your project. Add `libRNShare.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
5. In XCode, in the project navigator, select your project. Add `Social.framework` and `MessageUI.framework` to your project's `General` ➜ `Linked Frameworks and Libraries`
6. In iOS 9 or higher, You should add app list that you will share.
If you want to share Whatsapp and Mailto, you should write `LSApplicationQueriesSchemes` in info.plist  
    ```xml
    <key>LSApplicationQueriesSchemes</key>
    <array>
      <string>whatsapp</string>
      <string>mailto</string>
    </array>
    ```
7. (Optional) Also following lines allows users to save photos, add them in `info.plist`
    ```xml
    <key>NSPhotoLibraryAddUsageDescription</key>
    <string>$(PRODUCT_NAME) wants to save photos</string>
    ```
8. Run your project (`Cmd+R`)

### iOS Install(using Pods)


If you wish, you can use [cocopoads](https://cocoapods.org/) to use react-native-share.

You just need to add to your Podfile the react-native-share dependency.

```ruby
  # React-Native-Share pod
  pod 'RNShare', :path => '../node_modules/react-native-share'
```

After that, just run a `pod install` or `pod udpate` to get up and running with react-native-share. 

Then run a `react-native link react-native-share`, and doing the steps 6 and 7.

You can also see our example to see how you need to setup your podfile.

Btw, We also recommend reading this (amazing article)[https://shift.infinite.red/beginner-s-guide-to-using-cocoapods-with-react-native-46cb4d372995] about how pods and rn work together. =D


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
      compile project(':react-native-share')
    ```
5. **(Optional)** [Follow this for implementing Provider](#adding-your-implementation-of-fileprovider)

### Windows Install


[Read it! :D](https://github.com/ReactWindows/react-native)

1. `yarn add react-native-share`
2. In Visual Studio add the `RNShare.sln` in `node_modules/react-native-share/windows/RNShare.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using Cl.Json.RNShare;` to the usings at the top of the file
  - Add `new RNSharePackage()` to the `List<IReactPackage>` returned by the `Packages` method



# Methods
---

### open(options)

Open Simple share dialog

Returns a promise that fulfills or rejects as soon as user successfully open the share action sheet or cancelled/failed to do so. As a result you might need to further handle the rejection while necessary. e.g.

*For share multiple files, you must using option urls instead of url to share multiple files/images/docs.
Example could be found in Example folder


```jsx
  Share.open(options)
    .then((res) => { console.log(res) })
    .catch((err) => { err && console.log(err); });
```

Supported options:

| Name  | Type     | Description |
| :---- | :------: | :--- |
| url | string   | URL you want to share (only support base64 string in iOS & Android ). |
| urls | Array[string]   | array of base64 string you want to share (only support iOS & Android). |
| type | string   | File mime type (optional) |
| message | string   |  |
| title | string   |  (optional) |
| subject | string   | (optional) |
| excludedActivityTypes | string   | (optional) |
| failOnCancel | boolean | (defaults to true) Specifies whether promise should reject if user cancels share dialog (optional) |
| showAppsToView | boolean | (optional) only android|

#### Url format when sharing a file

***Share base 64 file

When share a base 64 file, please follow the format below:
```
url: "data:<data_type>/<file_extension>;base64,<base64_data>"
```

***Share file directly

When share a local file directly, please follow the format below:
```
url: "file://<file_path>",
```

---
### shareSingle(options) (in iOS & Android)

Open share dialog with specific application

*This returns a promise too.*

Supported options:

| Name  | Type     | Description |
| :---- | :------: | :--- |
| url | string   | URL you want to share |
| type | string   | File mime type (optional) |
| message | string   |  |
| title | string   |  (optional) |
| subject | string   | (optional) |
| social | string   | supported social apps: [List](#static-values-for-social)  |
| forceDialog | boolean | (optional) only android. Avoid showing dialog with buttons Just Once / Always. Useful for Instagram to always ask user if share as Story or Feed |

***NOTE: If both `message` and `url` are provided, `url` will be concatenated to the end of `message` to form the body of the message. If only one is provided it will be used***

---
### isPackageInstalled(<app>) (in Android)
It's a method that checks if an app (package) is installed on Android. 
It returns a promise with `isInstalled`. e.g.

Checking if Instagram is installed on Android.
```jsx
Share.isPackageInstalled('com.instagram.android')
  .then(({ isInstalled }) => console.log(isInstalled))
```

***NOTE: in iOS you can use `Linking.canOpenURL(url)`***

---
## Static Values for social

These can be assessed using Share.Social property
For eg.
```javascript
import Share from 'react-native-share';

const shareOptions = {
    title: 'Share via',
    message: 'some message',
    url: 'some share url',
    social: Share.Social.WHATSAPP
};
Share.shareSingle(shareOptions);
```

| Name  | Android     | iOS | Windows |
| :---- | :------: | :--- | :---
| **FACEBOOK** | yes   | yes | no |
| **PAGESMANAGER** | yes   | no | no |
| **WHATSAPP** | yes   | yes | no |
| **INSTAGRAM** | yes   | yes | no |
| **GOOGLEPLUS** | yes   | yes | no |
| **EMAIL** | yes   | yes | no |
| **PINTEREST** | yes   | no | no |
| **SMS** | yes   | no | no |
| **SNAPCHAT** | yes   | no | no |
| **MESSENGER** | yes   | no | no |
| **LINKEDIN** | yes   | no | no |

#### How it looks:

|          | Android  | IOS      | Windows  |
| -------- | -------- | -------- | -------- |
| Simple Share | ![Demo Android](/assets/android-250x.png)   | ![Demo iOS](/assets/ios-250x.png)   | ![Demo Windows](/assets/windows-250x.png) |
| UI Component   | ![Demo Android UI Component](/assets/android-component-250x.gif)   | ![Demo Android UI Component](/assets/ios-component-250x.gif) |  TODO |

---
# Troubleshooting
---
#### Share Remote PDF File with Gmail & WhatsApp (iOS)

When sharing a pdf file with base64, there are two current problems.

1. On WhatsApp base64 wont be recognized => nothing to share
2. In the GmailApp the file extension is wrong (.dat).

Therefore we use this "workaround" in order to handle pdf sharing for iOS Apps to mentioned Apps

1. Install react-native-fetch-blob
2. Set a specific path in the RNFetchBlob configurations
3. Download the PDF file to temp device storage
4. Share the response's path() of the donwloaded file directly

Code:

```jsx
static sharePDFWithIOS(fileUrl, type) {
  let filePath = null;
  let file_url_length = fileUrl.length;
  const configOptions = {
    fileCache: true,
    path:
      DIRS.DocumentDir + (type === 'application/pdf' ? '/SomeFileName.pdf' : '/SomeFileName.png') // no difference when using jpeg / jpg / png /
  };
  RNFetchBlob.config(configOptions)
    .fetch('GET', fileUrl)
    .then(async resp => {
      filePath = resp.path();
      let options = {
        type: type,
        url: filePath // (Platform.OS === 'android' ? 'file://' + filePath)
      };
      await Share.open(options);
      // remove the image or pdf from device's storage
      await RNFS.unlink(filePath);
    });
}
```

Nothing to do on Android. You can share the pdf file with base64

```jsx
static sharePDFWithAndroid(fileUrl, type) {
  let filePath = null;
  let file_url_length = fileUrl.length;
  const configOptions = { fileCache: true };
  RNFetchBlob.config(configOptions)
    .fetch('GET', fileUrl)
    .then(resp => {
      filePath = resp.path();
      return resp.readFile('base64');
    })
    .then(async base64Data => {
      base64Data = `data:${type};base64,` + base64Data;
      await Share.open({ url: base64Data });
      // remove the image or pdf from device's storage
      await RNFS.unlink(filePath);
    });
}
```

#### Adding your implementation of FileProvider

[Android guide](https://developer.android.com/training/secure-file-sharing/setup-sharing.html).
   
- `applicationId` should be defined in the `defaultConfig` section in your `android/app/build.gradle`:

- File: `android/app/build.gradle`

    ```
    defaultConfig {
        applicationId "com.yourcompany.yourappname"
        ...
    }
    ```
    
- Add this `<provider>` section to your `AndroidManifest.xml`

    File: `AndroidManifest.xml`
    ```xml
    <application>
        <provider
            android:name="androidx.core.content.FileProvider"
            android:authorities="${applicationId}.provider"
            android:grantUriPermissions="true"
            android:exported="false">
            <meta-data
                android:name="android.support.FILE_PROVIDER_PATHS"
                android:resource="@xml/filepaths" />
        </provider>
    </application>
    ```

- Create a `filepaths.xml` under this directory:
`android/app/src/main/res/xml`. 

    In this file, add the following contents:
    
    File: `android/app/src/main/res/filepaths.xml`
    ```xml
    <?xml version="1.0" encoding="utf-8"?>
    <paths xmlns:android="http://schemas.android.com/apk/res/android">
      <external-path name="myexternalimages" path="Download/" />
    </paths>
    ```

- Edit your `MainApplication.java` class to add `implements ShareApplication` and `getFileProviderAuthority`
- The `getFileProviderAuthority` function returns the `android:authorities` value added in the `AndroidManifest.xml` file
- `applicationId` is defined in the `defaultConfig` section of your `android/app/build.gradle` and referenced using `BuildConfig.APPLICATION_ID`

    ```java
    import cl.json.ShareApplication
    public class MainApplication extends Application implements ShareApplication, ReactApplication {
    
         @Override
         public String getFileProviderAuthority() {
                return BuildConfig.APPLICATION_ID + ".provider";
         }

         // ...Your own code

    }
    ```
