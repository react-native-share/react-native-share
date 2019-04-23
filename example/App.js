import React, { Component } from 'react';

import { Alert, Button, Platform, TextInput, StyleSheet, Text, View } from 'react-native';

import Share from 'react-native-share';

import images from './images/imagesBase64';

export default class App extends Component {
  state = {
    packageSearch: '',
  };

  /**
   * You can use the method isPackageInstalled to find
   * if a package is insalled. It returns a { isInstalled, message }
   * only works on Android :/
   */
  checkIfPackageIsInstalled = async () => {
    const { packageSearch } = this.state;

    const { isInstalled } = await Share.isPackageInstalled(packageSearch);

    Alert.alert(`Package: ${packageSearch}`, `${isInstalled ? 'Installed' : 'Not Installed'}`);
  };

  setPackageSearch = packageSearch => this.setState({ packageSearch });

  /**
   * This functions share multiple images that
   * you send as the urls param
   */
  shareMultipleImages = async () => {
    const shareOptions = {
      title: 'Share file',
      urls: [images.image1, images.image2],
    };

    // If you want, you can use a try catch, to parse
    // the share response. If the user cancels, etc.
    try {
      const ShareResponse = await Share.open(shareOptions);
    } catch (error) {
      console.log('Error =>', error);
    }
  };

  /**
   * This functions share a image passed using the
   * url param
   */
  shareSingleImage = async () => {
    const shareOptions = {
      title: 'Share file',
      url: images.image1,
    };

    try {
      const ShareResponse = await Share.open(shareOptions);
    } catch (error) {
      console.log('Error =>', error);
    }
  };

  render() {
    const { packageSearch } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native Share Example!</Text>
        <View style={styles.optionsRow}>
          <View style={styles.button}>
            <Button onPress={this.shareMultipleImages} title="Share Multiple Images" />
          </View>
          <View style={styles.button}>
            <Button onPress={this.shareSingleImage} title="Share Single Image" />
          </View>
          {Platform.OS === 'android' && (
          <View style={styles.searchPackageContainer}>
            <TextInput
              placeholder="Search for a Package"
              onChangeText={this.setPackageSearch}
              value={packageSearch}
              style={styles.textInput}
            />
            <View>
              <Button onPress={this.checkIfPackageIsInstalled} title="Check Package" />
            </View>
          </View>
          )
          }
        </View>
      </View>
    );
  }
}

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
  optionsRow: {
    justifyContent: 'space-between',
  },
  searchPackageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
