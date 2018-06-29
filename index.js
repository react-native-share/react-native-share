// @flow

import * as React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  NativeModules,
  Platform,
  ActionSheetIOS,
  PermissionsAndroid,
} from 'react-native';

import Overlay from './components/Overlay';
import Sheet from './components/Sheet';
import Button from './components/Button';

const styles = StyleSheet.create({
  actionSheetContainer: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 0,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  buttonContainer: {
    overflow: 'hidden',
    backgroundColor: 'white',
    paddingBottom: 5,
    paddingTop: 5,
  },
});

type Props = {
  visible: boolean,
  onCancel: () => void,
  children: React.Node,
};

class ShareSheet extends React.Component<Props> {
  backButtonHandler: () => boolean;

  componentDidMount() {
    this.backButtonHandler = this.backButtonHandler.bind(this);
    BackHandler.addEventListener('backPress', this.backButtonHandler);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('backPress', this.backButtonHandler);
  }

  backButtonHandler() {
    if (this.props.visible) {
      this.props.onCancel();
      return true;
    }
    return false;
  }
  render() {
    return (
      <Overlay visible={this.props.visible} {...this.props}>
        <View style={styles.actionSheetContainer}>
          <TouchableOpacity style={{ flex: 1 }} onPress={this.props.onCancel} />
          <Sheet visible={this.props.visible}>
            <View style={styles.buttonContainer}>{this.props.children}</View>
          </Sheet>
        </View>
      </Overlay>
    );
  }
}

type Options = {
  url: string,
  urls: Array<string>,
  type: string,
  message: string,
  title?: string,
  subject?: string,
  excludedActivityTypes?: string,
  failOnCancel?: boolean,
  showAppsToView?: boolean,
};
type OpenReturn = { app?: string, dismissedAction?: boolean };
type ShareSingleReturn = { message: string };

const requireAndAskPermissions = (options: Options): Promise<any> => {
  if ((options.url || options.urls) && Platform.OS === 'android') {
    return new Promise((resolve, reject) => {
      const urls = options.urls || [options.url];
      Promise.all(
        urls.map(url => {
          return new Promise((res, rej) => {
            NativeModules.RNShare.isBase64File(
              url,
              e => {
                rej(e);
              },
              isBase64 => {
                res(isBase64);
              },
            );
          });
        }),
      )
        .then(resultArr => {
          const requirePermission = resultArr.includes(true);
          if (!requirePermission) {
            return Promise.resolve(true);
          }
          return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        })
        .then(hasPermission => {
          if (hasPermission) {
            return Promise.resolve(PermissionsAndroid.RESULTS.GRANTED);
          }
          return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        })
        .then(result => {
          if (result === PermissionsAndroid.RESULTS.GRANTED) {
            return resolve();
          }
          return Promise.reject(new Error('Write Permission not available'));
        })
        .catch(e => reject(e));
    });
  }
  return Promise.resolve();
};

class RNShare {
  static open(options: Options): Promise<OpenReturn> {
    return new Promise((resolve, reject) => {
      requireAndAskPermissions(options)
        .then(() => {
          if (Platform.OS === 'ios') {
            if (options.urls) {
              // Handle for multiple file share
              NativeModules.RNShare.open(
                options,
                error => {
                  return reject({ error: error });
                },
                (success, activityType) => {
                  if (success) {
                    return resolve({
                      app: activityType,
                    });
                  } else if (options.failOnCancel === false) {
                    return resolve({
                      dismissedAction: true,
                    });
                  } else {
                    reject({ error: 'User did not share' });
                  }
                },
              );
            } else {
              // Handle for single file share
              ActionSheetIOS.showShareActionSheetWithOptions(
                options,
                error => {
                  return reject({ error: error });
                },
                (success, activityType) => {
                  if (success) {
                    return resolve({
                      app: activityType,
                    });
                  } else if (options.failOnCancel === false) {
                    return resolve({
                      dismissedAction: true,
                    });
                  } else {
                    reject({ error: 'User did not share' });
                  }
                },
              );
            }
          } else {
            NativeModules.RNShare.open(
              options,
              e => {
                return reject({ error: e });
              },
              e => {
                resolve({
                  message: e,
                });
              },
            );
          }
        })
        .catch(e => reject(e));
    });
  }

  static shareSingle(options: Options): Promise<ShareSingleReturn> {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      return new Promise((resolve, reject) => {
        requireAndAskPermissions(options)
          .then(() => {
            NativeModules.RNShare.shareSingle(
              options,
              e => {
                return reject({ error: e });
              },
              e => {
                return resolve({
                  message: e,
                });
              },
            );
          })
          .catch(e => reject(e));
      });
    } else {
      throw new Error('Not implemented');
    }
  }
}

module.exports = RNShare;
module.exports.Overlay = Overlay;
module.exports.Sheet = Sheet;
module.exports.Button = Button;
module.exports.ShareSheet = ShareSheet;
