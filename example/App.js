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
  ScrollView,
  SafeAreaView,
} from 'react-native';

import Share from 'react-native-share';

import images from './images/imagesBase64';
import pdfBase64 from './images/pdfBase64';
import {video} from './videos/videoBase64';

const App = () => {
  const [packageSearch, setPackageSearch] = useState<string>('');
  const [recipient, setRecipient] = useState<string>('');
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
   * Basic share with url & message
   */
  const shareUrlWithMessage = async () => {
    const shareOptions = {
      title: 'Share file',
      message: 'Simple share with message',
      url: 'https://google.com',
    };

    try {
      const ShareResponse = await Share.open(shareOptions);
      console.log('Result =>', ShareResponse);
      setResult(JSON.stringify(ShareResponse, null, 2));
    } catch (error) {
      console.log('Error =>', error);
      setResult('error: '.concat(getErrorString(error)));
    }
  };

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
      console.log('Result =>', ShareResponse);
      setResult(JSON.stringify(ShareResponse, null, 2));
    } catch (error) {
      console.log('Error =>', error);
      setResult('error: '.concat(getErrorString(error)));
    }
  };

  /**
   * This function share an image passed using the
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
      console.log('Result =>', ShareResponse);
      setResult(JSON.stringify(ShareResponse, null, 2));
    } catch (error) {
      console.log('Error =>', error);
      setResult('error: '.concat(getErrorString(error)));
    }
  };

  const shareEmailImages = async () => {
    const shareOptions = {
      message: 'Share.singleShare',
      email: 'email@example.com',
      social: Share.Social.EMAIL,
      failOnCancel: false,
      urls: [images.image1, images.image2],
    };

    try {
      const ShareResponse = await Share.shareSingle(shareOptions);
      console.log('Response =>', ShareResponse);
      setResult(JSON.stringify(ShareResponse, null, 2));
    } catch (error) {
      console.log('Error =>', error);
      setResult('error: '.concat(getErrorString(error)));
    }
  };

  /**
   * This function share an image passed using the
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
      console.log('Result =>', ShareResponse);
      setResult(JSON.stringify(ShareResponse, null, 2));
    } catch (error) {
      console.log('Error =>', error);
      setResult('error: '.concat(getErrorString(error)));
    }
  };

  /**
   * This function shares PDF and PNG files to
   * the Files app that you send as the urls param
   */
  const shareToFiles = async () => {
    const shareOptions = {
      title: 'Share file',
      failOnCancel: false,
      saveToFiles: true,
      urls: [images.image1, images.pdf1], // base64 with mimeType or path to local file
    };

    // If you want, you can use a try catch, to parse
    // the share response. If the user cancels, etc.
    try {
      const ShareResponse = await Share.open(shareOptions);
      console.log('Result =>', ShareResponse);
      setResult(JSON.stringify(ShareResponse, null, 2));
    } catch (error) {
      console.log('Error =>', error);
      setResult('error: '.concat(getErrorString(error)));
    }
  };

  const shareVideoToInstagram = async () => {
    const shareOptions = {
      title: 'Share video to instagram',
      type: 'video/mp4',
      url: video,
      social: Share.Social.INSTAGRAM,
    };

    try {
      const ShareResponse = await Share.shareSingle(shareOptions);
      setResult(JSON.stringify(ShareResponse, null, 2));
    } catch (error) {
      console.log('Error =>', error);
      setResult('error: '.concat(getErrorString(error)));
    }
  };

  const shareImageToInstagram = async () => {
    const shareOptions = {
      title: 'Share image to instagram',
      type: 'image/jpeg',
      url: images.image1,
      social: Share.Social.INSTAGRAM,
    };

    try {
      const ShareResponse = await Share.shareSingle(shareOptions);
      setResult(JSON.stringify(ShareResponse, null, 2));
    } catch (error) {
      console.log('Error =>', error);
      setResult('error: '.concat(getErrorString(error)));
    }
  };

  const shareToInstagramDirect = async () => {
    const shareOptions = {
      message: encodeURI(
        'Checkout the great search engine: https://google.com',
      ),
      social: Share.Social.INSTAGRAM,
      type: 'text/plain',
    };

    try {
      const ShareResponse = await Share.shareSingle(shareOptions);
      setResult(JSON.stringify(ShareResponse, null, 2));
    } catch (error) {
      console.log('Error =>', error);
      setResult('error: '.concat(getErrorString(error)));
    }
  };

  const shareToInstagramStory = async () => {
    const shareOptions = {
      title: 'Share image to instastory',
      backgroundImage: images.image1,
      social: Share.Social.INSTAGRAM_STORIES,
      appId: '219376304', //instagram appId
    };

    try {
      const ShareResponse = await Share.shareSingle(shareOptions);
      console.log('Response =>', ShareResponse);
      setResult(JSON.stringify(ShareResponse, null, 2));
    } catch (error) {
      console.log('Error =>', error);
      setResult('error: '.concat(getErrorString(error)));
    }
  };

  const shareToFacebookStory = async () => {
    const shareOptions = {
      title: 'Share image to fbstory',
      backgroundImage: images.image1,
      social: Share.Social.FACEBOOK_STORIES,
      appId: '219376304', //facebook appId
    };

    try {
      const ShareResponse = await Share.shareSingle(shareOptions);
      console.log('Response =>', ShareResponse);
      setResult(JSON.stringify(ShareResponse, null, 2));
    } catch (error) {
      console.log('Error =>', error);
      setResult('error: '.concat(getErrorString(error)));
    }
  };

  const shareSms = async () => {
    const shareOptions = {
      title: '',
      social: Share.Social.SMS,
      recipient,
      message: 'Example SMS',
    };

    try {
      const ShareResponse = await Share.shareSingle(shareOptions);
      console.log('Response =>', ShareResponse);
      setResult(JSON.stringify(ShareResponse, null, 2));
    } catch (error) {
      console.log('Error =>', error);
      setResult('error: '.concat(getErrorString(error)));
    }
  };

  const shareToTelegram = async () => {
    const shareOptions = {
      message: 'Example Telegram',
      url: 'https://google.com',
      social: Share.Social.TELEGRAM,
    };

    try {
      const ShareResponse = await Share.shareSingle(shareOptions);
      console.log('Response =>', ShareResponse);
      setResult(JSON.stringify(ShareResponse, null, 2));
    } catch (error) {
      console.log('Error =>', error);
      setResult('error: '.concat(getErrorString(error)));
    }
  };

  const shareToGooglePlus = async () => {
    const shareOptions = {
      message: 'Example Google Plus',
      url: 'https://google.com',
      social: Share.Social.GOOGLEPLUS,
    };

    try {
      const ShareResponse = await Share.shareSingle(shareOptions);
      console.log('Response =>', ShareResponse);
      setResult(JSON.stringify(ShareResponse, null, 2));
    } catch (error) {
      console.log('Error =>', error);
      setResult('error: '.concat(getErrorString(error)));
    }
  };

  const shareToWhatsApp = async () => {
    const shareOptions = {
      message: 'Example WhatsApp',
      url: 'https://google.com',
      social: Share.Social.WHATSAPP,
    };

    try {
      const ShareResponse = await Share.shareSingle(shareOptions);
      console.log('Response =>', ShareResponse);
      setResult(JSON.stringify(ShareResponse, null, 2));
    } catch (error) {
      console.log('Error =>', error);
      setResult('error: '.concat(getErrorString(error)));
    }
  };

  const shareToDiscord = async () => {
    const shareOptions = {
      message: 'Example Discord',
      url: 'https://google.com',
      social: Share.Social.DISCORD,
    };

    try {
      const ShareResponse = await Share.shareSingle(shareOptions);
      console.log('Response =>', ShareResponse);
      setResult(JSON.stringify(ShareResponse, null, 2));
    } catch (error) {
      console.log('Error =>', error);
      setResult('error: '.concat(getErrorString(error)));
    }
  };

  const sharePdfBase64 = async () => {
    const shareOptions = {
      title: '',
      url: pdfBase64,
    };

    try {
      const ShareResponse = await Share.open(shareOptions);
      console.log('Result =>', ShareResponse);
      setResult(JSON.stringify(ShareResponse, null, 2));
    } catch (error) {
      console.log('sharePdfBase64 Error =>', error);
      setResult('error: '.concat(getErrorString(error)));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.welcome}>
          Welcome to React Native Share Example!
        </Text>
        <View style={styles.button}>
          <Button onPress={shareUrlWithMessage} title="Share Simple Url" />
        </View>
        <View style={styles.button}>
          <Button onPress={shareMultipleImages} title="Share Multiple Images" />
        </View>
        <View style={styles.button}>
          <Button onPress={shareSingleImage} title="Share Single Image" />
        </View>
        <View style={styles.withInputContainer}>
          <TextInput
            placeholder="Recipient"
            onChangeText={setRecipient}
            value={recipient}
            style={styles.textInput}
            keyboardType="number-pad"
          />
          <View>
            <Button onPress={shareSms} title="Share via SMS" />
          </View>
        </View>
        <View style={styles.button}>
          <Button onPress={shareEmailImage} title="Share Social: Email" />
        </View>
        <View style={styles.button}>
          <Button onPress={shareVideoToInstagram} title="Share Video to IG" />
        </View>
        <View style={styles.button}>
          <Button onPress={shareImageToInstagram} title="Share Image to IG" />
        </View>
        <View style={styles.button}>
          <Button onPress={shareToInstagramStory} title="Share to IG Story" />
        </View>
        <View style={styles.button}>
          <Button onPress={shareToInstagramDirect} title="Share to IG Direct" />
        </View>
        <View style={styles.button}>
          <Button onPress={shareToFacebookStory} title="Share to FB Story" />
        </View>
        <View style={styles.button}>
          <Button onPress={shareToTelegram} title="Share to Telegram" />
        </View>
        <View style={styles.button}>
          <Button onPress={shareToGooglePlus} title="Share to Google Plus" />
        </View>
        <View style={styles.button}>
          <Button onPress={shareToWhatsApp} title="Share to WhatsApp" />
        </View>
        <View style={styles.button}>
          <Button onPress={shareToDiscord} title="Share to Discord" />
        </View>
        <View style={styles.button}>
          <Button onPress={shareEmailImages} title="Share to Email" />
        </View>
        {Platform.OS === 'ios' && (
          <View style={styles.button}>
            <Button onPress={shareToFiles} title="Share To Files" />
          </View>
        )}
        {Platform.OS === 'android' && (
          <>
            <View style={styles.button}>
              <Button onPress={sharePdfBase64} title="Share Base64'd PDF url" />
            </View>
            <View style={styles.withInputContainer}>
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
          </>
        )}
        <Text style={styles.resultTitle}>Result</Text>
        <Text style={styles.result}>{result}</Text>
      </ScrollView>
    </SafeAreaView>
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
  resultTitle: {
    marginTop: 20,
    fontSize: 20,
  },
  result: {
    fontSize: 14,
    margin: 10,
  },
  optionsRow: {
    justifyContent: 'space-between',
    width: '80%',
  },
  withInputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default App;
