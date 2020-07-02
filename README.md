# react-native-share [![CircleCI](https://circleci.com/gh/react-native-community/react-native-share/tree/master.svg?style=svg&circle-token=0c6860240abba4e16bd07df0ea805a72b67b8d41)](https://circleci.com/gh/react-native-community/react-native-share/tree/master) [![npm version](https://badge.fury.io/js/react-native-share.svg)](http://badge.fury.io/js/react-native-share) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
React Native Share, a simple tool for share message and file to other apps.

# Sponsors
---
If you use this library on your commercial/personal projects, you can help us by funding the work on specific issues that you choose by using IssueHunt.io!

This gives you the power to prioritize our work and support the project contributors. Moreover it'll guarantee the project will be updated and maintained in the long run.

[![issuehunt-image](https://issuehunt.io/static/embed/issuehunt-button-v1.svg)](https://issuehunt.io/repos/43406976)


# Getting started
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

Then simply import:

```js
  import Share from "react-native-share";

  Share.open(options)
    .then((res) => { console.log(res) })
    .catch((err) => { err && console.log(err); });
```

Supported options:

| Name  | Type     | Description |
| :---- | :------: | :--- |
| url | string   | URL you want to share (only support base64 string in iOS & Android). |
| urls | Array[string]   | array of base64 string you want to share (only support iOS & Android). |
| type | string   | File mime type (optional) |
| message | string   |  |
| title | string   |  (optional) |
| subject | string   | (optional) |
| email | string   | Email of addressee (optional) |
| excludedActivityTypes | string   | (optional) |
| failOnCancel | boolean | (defaults to true) Specifies whether promise should reject if user cancels share dialog (optional) |
| showAppsToView | boolean | (optional) only android|
| filename | string | only support base64 string in Android|
| saveToFiles | boolean | Open only `Files` app (optional, supports only urls (base64 string or path), requires iOS 11 or later)|
| filenames | Array[string] | array of filename for base64 urls array in Android|
| activityItemSources | Array[Object] | (optional) Array of activity item sources (iOS only). Each items should conform to [ActivityItemSource](#activityitemsource) type. See [below](#provide-data-to-share-by-using-activityitemsources-in-ios). |

#### Url format when sharing a file

***Share base 64 file***

When share a base 64 file, please follow the format below:
```
url: "data:<data_type>/<file_extension>;base64,<base64_data>"
```

***Share file directly***

When share a local file directly, please follow the format below:
```
url: "file://<file_path>",
```

#### Provide data to share by using activityItemSources (in iOS)

In order to share different data according to activities or to customize the share sheet, you can provide the data by using `activityItemSources` .

See [here](https://developer.apple.com/documentation/uikit/uiactivityitemsource) for more information about UIActivityItemSource.

##### Example

```jsx
import { Platform } from 'react-native';
import Share from 'react-native-share';

const url = 'https://awesome.contents.com/';
const title = 'Awesome Contents';
const message = 'Please check this out.';
const icon = 'data:<data_type>/<file_extension>;base64,<base64_data>';
const options = Platform.select({
  ios: {
    activityItemSources: [
      { // For sharing url with custom title.
        placeholderItem: { type: 'url', content: url },
        item: {
          default: { type: 'url', content: url },
        },
        subject: {
          default: title,
        },
        linkMetadata: { originalUrl: url, url, title },
      },
      { // For sharing text.
        placeholderItem: { type: 'text', content: message },
        item: {
          default: { type: 'text', content: message },
          message: null, // Specify no text to share via Messages app.
        },
        linkMetadata: { // For showing app icon on share preview.
           title: message
        },
      },
      { // For using custom icon instead of default text icon at share preview when sharing with message.
        placeholderItem: {
          type: 'url',
          content: icon
        },
        item: {
          default: {
            type: 'text',
            content: `${message} ${url}`
          },
        },
        linkMetadata: {
           title: message,
           icon: icon
        }
      },
    ],
  },
  default: {
    title,
    subject: title,
    message: `${message} ${url}`,
  },
});

Share.open(options);
```

##### ActivityItemSource

| Name | Type | Description |
| :--- | :--: | :---------- |
| placeholderItem | Object | An object to use as a placeholder for the actual data. This should comform to [ActivityItem](#activityitem) type. |
| item | Object | An object that contains the final data object to be acted on for each [activity types](#activitytype). This should be `{ [ActivityType]: ?ActivityItem }` . |
| subject | Object | (optional) An object that contains a string to use as the contents of the subject field for each [activity types](#activitytype).  This should be `{ [ActivityType]: string }` . |
| dataTypeIdentifier | Object | (optional) An object that contains the UTI for the item for each [activity types](#activitytype). This should be `{ [ActivityType]: string }` . See [here](https://developer.apple.com/library/archive/documentation/FileManagement/Conceptual/understanding_utis/understand_utis_intro/understand_utis_intro.html) for more information. |
| thumbnailImage | Object | (optional) An object that contains the URL to the image to use as a preview for the item for each [activity types](#activitytype). This should be `{ [ActivityType]: string }` . The URL should begin with `data:` and contain the data as base 64 encoded string. |
| linkMetadata | Object | (optional) An object that contains the metadata about a URL, including its title, icon, images, and video. See [LinkMetadata](#linkmetadata). |

##### ActivityType

- `addToReadingList`
- `airDrop`
- `assignToContact`
- `copyToPasteBoard`
- `mail`
- `message`
- `openInIBooks` (iOS 9+)
- `postToFacebook`
- `postToFlickr`
- `postToTencentWeibo`
- `postToTwitter`
- `postToVimeo`
- `postToWeibo`
- `print`
- `saveToCameraRoll`
- `markupAsPDF` (iOS 11+)

Also you can use `default` in order to specify default behavior.

##### ActivityItem

| Name | Type | Description |
| :--- | :--: | :---------- |
| type | `text` \| `url` | Type of the content. |
| content | string | Text or URL to share. You can specify image with URL that begins with `data` and contains the data as base 64 encoded string. |

##### LinkMetadata

| Name | Type | Description |
| :--- | :--: | :---------- |
| originalUrl | string | (optional) The original URL of the metadata request. |
| url | string | (optional) The URL that returns the metadata, taking server-side redirects into account. |
| title | string | (optional) A representative title for the URL. |
| icon | string | (optional) A URL of the file corresponding to a representative icon for the URL. |
| image | string | (optional) A URL of the file corresponding to a representative image for the URL. |
| remoteVideoUrl | string | (optional) A remote URL corresponding to a representative video for the URL. |
| video | string | (optional) A URL of the file corresponding to a representative video for the URL. |


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
| email | string   | Email of addressee (optional) |
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
    social: Share.Social.WHATSAPP,
    whatsAppNumber: "9199999999",  // country code + phone number
    filename: 'test' , // only for base64 file in Android
};
Share.shareSingle(shareOptions);
```

| Name  | Android     | iOS | Windows |
| :---- | :------: | :--- | :---
| **FACEBOOK** | yes   | yes | no |
| **FACEBOOK_STORIES** | no   | yes | no |
| **PAGESMANAGER** | yes   | no | no |
| **WHATSAPP** | yes   | yes | no |
| **INSTAGRAM** | yes   | yes | no |
| **INSTAGRAM_STORIES** | no   | yes | no |
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

#### Language Support (iOS)

On iOS, share component reads language value from CFBundleDevelopmentRegion at Info.plist file. By changing CFBundleDevelopmentRegion value you can change default language for component.

```XML
<key>CFBundleDevelopmentRegion</key>
<string>en</string>
```
For supporting multi language, you can add CFBundleAllowMixedLocalizations key to Info.plist.

```XML
<key>CFBundleAllowMixedLocalizations</key>
<string>true</string>
```

#### LinkPresentation.h file not found

1. Check iOS SDK version running this command: `xcodebuild -showsdks`
2. If your SDK is 12 or lower you need to update to Xcode 11 with iOS SDK 13
3. Build the app with Xcode 11 and everything works ok

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
#### Static Values for Instagram Stories

These can be assessed using Share.Social property
For eg.
```javascript
import Share from 'react-native-share';

const shareOptions = {
    method: Share.InstagramStories.SHARE_BACKGROUND_AND_STICKER_IMAGE,
    backgroundImage: 'http://urlto.png',
    stickerImage: 'data:image/png;base64,<imageInBase64>', //or you can use "data:" link
    backgroundBottomColor: '#fefefe',
    backgroundTopColor: '#906df4',
    attributionURL: 'http://deep-link-to-app', //in beta
    social: Share.Social.INSTAGRAM_STORIES
};
Share.shareSingle(shareOptions);
```

Supported options for INSTAGRAM_STORIES:

| Name  | Type     | Description |
| :---- | :------: | :--- |
| backgroundImage | string   | URL you want to share |
| stickerImage | string   | URL you want to share |
| method | string   | [List](#instagram-stories-method-list) |
| backgroundBottomColor | string   |  (optional) default #837DF4 |
| backgroundTopColor | string   | (optional) default #906df4 |
| attributionURL | string   | (optional) facebook beta-test |
| backgroundVideo | File   | URI you want to share |

#### Instagram stories method list
| Name  | Required options    |
| :---- | :------: |
| **SHARE_BACKGROUND_IMAGE** | backgroundImage   |
| **SHARE_BACKGROUND_VIDEO** | backgroundVideo   |
| **SHARE_STICKER_IMAGE** | stickerImage   |
| **SHARE_BACKGROUND_AND_STICKER_IMAGE** | backgroundImage, stickerImage   |

### Static Values for Facebook Stories
These can be assessed using Share.Social property
For eg.
```javascript
import Share from 'react-native-share';

const shareOptions = {
    method: Share.FacebookStories.SHARE_BACKGROUND_AND_STICKER_IMAGE,
    backgroundImage: 'http://urlto.png', // url or an base64 string
    stickerImage: 'data:image/png;base64,<imageInBase64>', //or you can use "data:" url
    backgroundBottomColor: '#fefefe',
    backgroundTopColor: '#906df4',
    attributionURL: 'http://deep-link-to-app', //in beta
    appId: '219376304', //facebook appId
    social: Share.Social.FACEBOOK_STORIES
};
Share.shareSingle(shareOptions);
```

Supported options for FACEBOOK_STORIES:

| Name  | Type     | Description |
| :---- | :------: | :--- |
| appId | string   | (required) facebook appId |
| backgroundImage | string   | URL you want to share |
| stickerImage | string   | URL you want to share |
| method | string   | [List](#instagram-stories-method-list) |
| backgroundBottomColor | string   |  (optional) default #837DF4 |
| backgroundTopColor | string   | (optional) default #906df4 |
| attributionURL | string   | (optional) facebook beta-test |

Which you do something similar to this:


![example-ios](website/static/img/assets-docs/ios-readme-example.gif)

# Documentation

If you are using a older version of `react-native` or `react-native-share`, having any problem or want to know how use `Share.open` and other functions, please refer to our new [docs](https://react-native-community.github.io/react-native-share) and help us improve that. ❤️
