/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect, useRef, useState} from 'react';
import {
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
  const [busy, setBusy] = useState(false);
  const mounted = useRef(true);
  const running = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  async function runAction(operation) {
    if (!mounted.current || running.current) return;
    running.current = true;
    setBusy(true);
    setResult('Working…');
    try {
      const response = await operation();
      if (mounted.current) setResult(JSON.stringify(response, null, 2));
    } catch (error) {
      if (mounted.current) setResult('error: '.concat(getErrorString(error)));
    } finally {
      running.current = false;
      if (mounted.current) setBusy(false);
    }
  }

  /**
   * You can use the method isPackageInstalled to find if a package is installed.
   * It returns an object { isInstalled, message }.
   * Only works on Android.
   */
  const checkIfPackageIsInstalled = async () => {
    await runAction(async () => {
      const packageName = packageSearch.trim();
      if (!packageName) throw new Error('Enter a package name');
      const {isInstalled} = await Share.isPackageInstalled(packageName);
      return {packageName, isInstalled};
    });
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

    await runAction(() => Share.open(shareOptions));
  };

  /**
   * Share url with activityItemSources for custom link metadata
   */
  const shareUrlWithMetadata = async () => {
    const url = 'https://github.com/react-native-share/react-native-share';
    const shareOptions = {
      url,
      activityItemSources: [
        {
          placeholderItem: {type: 'url', content: url},
          item: {default: {type: 'url', content: url}},
          linkMetadata: {title: 'A Custom Share Title'},
        },
      ],
      failOnCancel: false,
    };

    await runAction(() => Share.open(shareOptions));
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
    await runAction(() => Share.open(shareOptions));
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

    await runAction(() => Share.open(shareOptions));
  };

  const shareEmailImages = async () => {
    const shareOptions = {
      message: 'Share.singleShare',
      email: 'email@example.com',
      social: Share.Social.EMAIL,
      failOnCancel: false,
      urls: [images.image1, images.image2],
    };

    await runAction(() => Share.shareSingle(shareOptions));
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

    await runAction(() => Share.open(shareOptions));
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
    await runAction(() => Share.open(shareOptions));
  };

  const shareVideoToInstagram = async () => {
    const shareOptions = {
      title: 'Share video to instagram',
      type: 'video/mp4',
      url: video,
      social: Share.Social.INSTAGRAM,
    };

    await runAction(() => Share.shareSingle(shareOptions));
  };

  const shareImageToInstagram = async () => {
    const shareOptions = {
      title: 'Share image to instagram',
      type: 'image/jpeg',
      url: images.image1,
      social: Share.Social.INSTAGRAM,
    };

    await runAction(() => Share.shareSingle(shareOptions));
  };

  const shareToInstagramDirect = async () => {
    const shareOptions = {
      message: 'Checkout the great search engine: https://google.com',
      social: Share.Social.INSTAGRAM,
      type: 'text/plain',
    };

    await runAction(() => Share.shareSingle(shareOptions));
  };

  const shareToInstagramStory = async () => {
    const shareOptions = {
      title: 'Share image to instastory',
      backgroundImage: images.image1,
      social: Share.Social.INSTAGRAM_STORIES,
      appId: '219376304', //instagram appId
    };

    await runAction(() => Share.shareSingle(shareOptions));
  };

  const shareToFacebookStory = async () => {
    const shareOptions = {
      title: 'Share image to fbstory',
      backgroundImage: images.image1,
      social: Share.Social.FACEBOOK_STORIES,
      appId: '219376304', //facebook appId
    };

    await runAction(() => Share.shareSingle(shareOptions));
  };

  const shareSms = async () => {
    const shareOptions = {
      title: '',
      social: Share.Social.SMS,
      recipient,
      message: 'Example SMS',
    };

    await runAction(() => Share.shareSingle(shareOptions));
  };

  const shareToTelegram = async () => {
    const shareOptions = {
      message: 'Example Telegram',
      url: 'https://google.com',
      social: Share.Social.TELEGRAM,
    };

    await runAction(() => Share.shareSingle(shareOptions));
  };

  const shareToTwitter = async () => {
    const shareOptions = {
      message: 'Example Twitter',
      url: 'https://google.com',
      social: Share.Social.TWITTER,
    };

    await runAction(() => Share.shareSingle(shareOptions));
  };

  const shareToGooglePlus = async () => {
    const shareOptions = {
      message: 'Example Google Plus',
      url: 'https://google.com',
      social: Share.Social.GOOGLEPLUS,
    };

    await runAction(() => Share.shareSingle(shareOptions));
  };

  const shareToWhatsApp = async () => {
    const shareOptions = {
      message: 'Example WhatsApp',
      url: 'https://google.com',
      social: Share.Social.WHATSAPP,
    };

    await runAction(() => Share.shareSingle(shareOptions));
  };

  const shareToDiscord = async () => {
    const shareOptions = {
      message: 'Example Discord',
      url: 'https://google.com',
      social: Share.Social.DISCORD,
    };

    await runAction(() => Share.shareSingle(shareOptions));
  };

  const sharePdfBase64 = async () => {
    const shareOptions = {
      title: '',
      url: pdfBase64,
    };

    await runAction(() => Share.open(shareOptions));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.welcome}>
          Welcome to React Native Share Example!
        </Text>
        <View style={styles.button}>
          <Button
            disabled={busy}
            onPress={shareUrlWithMessage}
            title="Share Simple Url"
          />
        </View>
        <View style={styles.button}>
          <Button
            disabled={busy}
            onPress={shareUrlWithMetadata}
            title="Share Url with Metadata"
          />
        </View>
        <View style={styles.button}>
          <Button
            disabled={busy}
            onPress={shareMultipleImages}
            title="Share Multiple Images"
          />
        </View>
        <View style={styles.button}>
          <Button
            disabled={busy}
            onPress={shareSingleImage}
            title="Share Single Image"
          />
        </View>
        <View style={styles.withInputContainer}>
          <TextInput
            editable={!busy}
            placeholder="Recipient"
            accessibilityLabel="SMS recipient"
            onChangeText={setRecipient}
            value={recipient}
            style={styles.textInput}
            keyboardType="phone-pad"
          />
          <View>
            <Button disabled={busy} onPress={shareSms} title="Share via SMS" />
          </View>
        </View>
        <View style={styles.button}>
          <Button
            disabled={busy}
            onPress={shareEmailImage}
            title="Share Social: Email"
          />
        </View>
        <View style={styles.button}>
          <Button
            disabled={busy}
            onPress={shareVideoToInstagram}
            title="Share Video to IG"
          />
        </View>
        <View style={styles.button}>
          <Button
            disabled={busy}
            onPress={shareImageToInstagram}
            title="Share Image to IG"
          />
        </View>
        <View style={styles.button}>
          <Button
            disabled={busy}
            onPress={shareToInstagramStory}
            title="Share to IG Story"
          />
        </View>
        <View style={styles.button}>
          <Button
            disabled={busy}
            onPress={shareToInstagramDirect}
            title="Share to IG Direct"
          />
        </View>
        <View style={styles.button}>
          <Button
            disabled={busy}
            onPress={shareToFacebookStory}
            title="Share to FB Story"
          />
        </View>
        <View style={styles.button}>
          <Button
            disabled={busy}
            onPress={shareToTelegram}
            title="Share to Telegram"
          />
        </View>
        <View style={styles.button}>
          <Button
            disabled={busy}
            onPress={shareToTwitter}
            title="Share to Twitter"
          />
        </View>
        <View style={styles.button}>
          <Button
            disabled={busy}
            onPress={shareToGooglePlus}
            title="Share to Google Plus"
          />
        </View>
        <View style={styles.button}>
          <Button
            disabled={busy}
            onPress={shareToWhatsApp}
            title="Share to WhatsApp"
          />
        </View>
        <View style={styles.button}>
          <Button
            disabled={busy}
            onPress={shareToDiscord}
            title="Share to Discord"
          />
        </View>
        <View style={styles.button}>
          <Button
            disabled={busy}
            onPress={shareEmailImages}
            title="Share to Email"
          />
        </View>
        {Platform.OS === 'ios' && (
          <View style={styles.button}>
            <Button
              disabled={busy}
              onPress={shareToFiles}
              title="Share To Files"
            />
          </View>
        )}
        {Platform.OS === 'android' && (
          <>
            <View style={styles.button}>
              <Button
                disabled={busy}
                onPress={sharePdfBase64}
                title="Share Base64'd PDF url"
              />
            </View>
            <View style={styles.withInputContainer}>
              <TextInput
                editable={!busy}
                placeholder="Search for a Package"
                accessibilityLabel="Android package name"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={setPackageSearch}
                value={packageSearch}
                style={styles.textInput}
              />
              <View>
                <Button
                  disabled={busy}
                  onPress={checkIfPackageIsInstalled}
                  title="Check Package"
                />
              </View>
            </View>
          </>
        )}
        <Text style={styles.resultTitle}>Result</Text>
        <Text style={styles.result} accessibilityLiveRegion="polite">
          {result}
        </Text>
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
  withInputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default App;
