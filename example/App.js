/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState} from 'react';

import {
  Alert,
  Button,
  Platform,
  TextInput,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// eslint-disable-next-line import/default
import Share from 'react-native-share';

import images from './images/imagesBase64';

const App = () => {
  // eslint-disable-next-line no-undef
  const [packageSearch, setPackageSearch] = useState<string>('');
  // eslint-disable-next-line no-undef
  const [result, setResult] = useState<string>('');

  /**
   * You can use the method isPackageInstalled to find if a package is installed.
   * It returns an object { isInstalled, message }.
   * Only works on Android.
   */
  const checkIfPackageIsInstalled = async () => {
    const {isInstalled} = await Share.isPackageInstalled(packageSearch);

    Alert.alert(
      `Package: ${packageSearch}`,
      `${isInstalled ? 'Installed' : 'Not Installed'}`,
    );
  };

  function getErrorString(error, defaultValue) {
    let e = defaultValue || 'Something went wrong. Please try again';
    if (typeof error === 'string') {
      e = error;
    } else if (error && error.message) {
      e = error.message;
    } else if (error && error.props) {
      e = error.props;
    }
    return e;
  }

  /**
   * This functions share multiple images that
   * you send as the urls param
   */
  const shareMultipleImages = async () => {
    const shareOptions = {
      title: 'Share file',
      failOnCancel: false,
      urls: [images.image1, images.image2],
    };

    // If you want, you can use a try catch, to parse
    // the share response. If the user cancels, etc.
    try {
      const ShareResponse = await Share.open(shareOptions);
      setResult(JSON.stringify(ShareResponse, null, 2));
    } catch (error) {
      console.log('Error =>', error);
      setResult('error: '.concat(getErrorString(error)));
    }
  };

  /**
   * This functions share a image passed using the
   * url param
   */
  const shareEmailImage = async () => {
    const shareOptions = {
      title: 'Share file',
      email: 'email@example.com',
      social: Share.Social.EMAIL,
      failOnCancel: false,
      urls: [images.image1, images.image2],
    };

    try {
      const ShareResponse = await Share.open(shareOptions);
      setResult(JSON.stringify(ShareResponse, null, 2));
    } catch (error) {
      console.log('Error =>', error);
      setResult('error: '.concat(getErrorString(error)));
    }
  };

  /**
   * This functions share a image passed using the
   * url param
   */
  const shareSingleImage = async () => {
    const shareOptions = {
      title: 'Share file',
      url: images.image1,
      failOnCancel: false,
    };

    try {
      const ShareResponse = await Share.open(shareOptions);
      setResult(JSON.stringify(ShareResponse, null, 2));
    } catch (error) {
      console.log('Error =>', error);
      setResult('error: '.concat(getErrorString(error)));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to React Native Share Example!</Text>
      <View style={styles.optionsRow}>
        <View style={styles.button}>
          <Button onPress={shareMultipleImages} title="Share Multiple Images" />
        </View>
        <View style={styles.button}>
          <Button onPress={shareSingleImage} title="Share Single Image" />
        </View>
        <View style={styles.button}>
          <Button onPress={shareEmailImage} title="Share Social: Email" />
        </View>
        {Platform.OS === 'android' && (
          <View style={styles.searchPackageContainer}>
            <TextInput
              placeholder="Search for a Package"
              onChangeText={setPackageSearch}
              value={packageSearch}
              style={styles.textInput}
            />
            <View>
              <Button
                onPress={checkIfPackageIsInstalled}
                title="Check Package"
              />
            </View>
          </View>
        )}
        <Text style={{marginTop: 20, fontSize: 20}}>Result</Text>
        <Text style={styles.result}>{result}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textInput: {
    borderBottomColor: '#151313',
    borderBottomWidth: 1,
    marginRight: 10,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  result: {
    fontSize: 14,
    margin: 10,
  },
  optionsRow: {
    justifyContent: 'space-between',
  },
  searchPackageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default App;
