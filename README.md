# react-native-share [![npm version](https://badge.fury.io/js/react-native-share.svg)](http://badge.fury.io/js/react-native-share)
Share Social , Sending Simple Data to Other Apps

## Getting started

### Mostly automatic install
1. `npm install rnpm --global`
2. `npm install react-native-share --save`
3. `rnpm link react-native-share`

### Manual install

#### iOS

1. `npm install react-native-share --save`
2. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
3. Go to `node_modules` ➜ `react-native-share` and add `RNShare.xcodeproj`
4. In XCode, in the project navigator, select your project. Add `libRNShare.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
5. Run your project (`Cmd+R`)

#### Android

1. `npm install react-native-share --save`
2. Open up `android/app/src/main/java/[...]/MainActivity.java
  - Add `import cl.json.RNSharePackage;` to the imports at the top of the file
  - Add `new RNSharePackage()` to the list returned by the `getPackages()` method
3. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-share'
  	project(':react-native-share').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-share/android')
  	```
4. Insert the following lines inside the dependencies block in `android/app/build.gradle`:

    	```
        compile project(':react-native-share')
    	```

#### Windows
[Read it!](https://github.com/ReactWindows/react-native)

1. `npm install react-native-share --save`
2. TODO


## Usage

```javascript
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import Share from 'react-native-share';

class Example extends Component {
  onShare() {
    Share.open({
      share_text: "Hola mundo",
      share_URL: "http://google.cl",
      title: "Share Link"
    },(e) => {
      console.log(e);
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        <TouchableHighlight onPress={this.onShare}>
          <Text style={styles.instructions}>
            Social Share
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Example', () => Example);
```

## how it looks:
![Demo Android](https://github.com/EstebanFuentealba/react-native-share/blob/master/assets/android.png)
![Demo iOS](https://github.com/EstebanFuentealba/react-native-share/blob/master/assets/ios.png)
