/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Alert
} from 'react-native';
import Share from 'react-native-share';
import images from './src/imageBase64';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  constructor(props: Props) {
    super(props);
    this.state = {
      result: '',
    };
  }

  getErrorString(error: any, defaultValue?: string): string {
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

  async onShareEmail() {
    try {
      const shareOptions = {
        title: 'Share file',
        social: Share.Social.EMAIL,
        failOnCancel: false,
        urls: [images.image1, images.image2],
      };
      const result = await Share.shareSingle(shareOptions);
      this.setState({ result: JSON.stringify(result, 0, 2) });
    } catch (e) {
      // Handle Error
      console.warn(e);
      this.setState({ result: 'error: '.concat(this.getErrorString(e)) });
    }
  }

  async onShare() {
    try {
      const shareOptions = {
        title: 'Share file',
        failOnCancel: false,
        urls: [images.image1, images.image2],
      };
      const result = await Share.open(shareOptions);
      this.setState({ result: JSON.stringify(result, 0, 2) });
    } catch (e) {
      // Handle Error
      console.warn(e);
      this.setState({ result: 'error: '.concat(this.getErrorString(e)) });
    }
  }

  async onShare2() {
    try {
      const shareOptions = {
        title: 'Share file',
        url: images.image1,
      };
      const result = await Share.open(shareOptions);
      this.setState({ result: JSON.stringify(result, 0, 2) });
    } catch (e) {
      // Handle Error
      this.setState({ result: 'error: '.concat(this.getErrorString(e)) });
    }
  }

  isPackageInstalled() {
    return Share.isPackageInstalled('com.xxx.xxx');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Button title="Share via Social: EMAIL" onPress={() => this.onShareEmail()}/>
        <Button title="Share 2 images" onPress={() => this.onShare()}/>
        <Button title="Share single image" onPress={() => this.onShare2()}/>
        <Button
          title="Check package installed"
          onPress={() =>
            this.isPackageInstalled().then(({ isInstalled }) => Alert.alert(`isInstalled = ${isInstalled}`))
          }
        />
        <Text style={{ marginTop: 20, fontSize: 20 }}>Result</Text>
        <Text style={styles.result}>{this.state.result}</Text>
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
  result: {
    fontSize: 14,
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
