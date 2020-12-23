/*
 *
 * @format
 * @flow
 *
 */

import * as React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  NativeModules,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

import Overlay from './components/Overlay';
import Sheet from './components/Sheet';
import Button from './components/Button';

const ANDROID_KIT_KAT_SDK_VERSION = 19;
const androidPermissionRequestRequired =
  parseInt(Platform.Version, 10) < ANDROID_KIT_KAT_SDK_VERSION;

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
  style?: ViewStyleProp,
  overlayStyle?: ViewStyleProp,
};

const shareSheetStyle = { flex: 1 };

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
    const { style = {}, overlayStyle = {}, ...props } = this.props;
    return (
      <Overlay visible={this.props.visible} {...props}>
        <View style={[styles.actionSheetContainer, overlayStyle]}>
          <TouchableOpacity style={shareSheetStyle} onPress={this.props.onCancel} />
          <Sheet visible={this.props.visible}>
            <View style={[styles.buttonContainer, style]}>{this.props.children}</View>
          </Sheet>
        </View>
      </Overlay>
    );
  }
}

type Options = {
  url?: string,
  urls?: Array<string>,
  filename?: string,
  filenames?: Array<string>,
  type?: string,
  message?: string,
  title?: string,
  subject?: string,
  recipient?: string,
  excludedActivityTypes?: string,
  failOnCancel?: boolean,
  showAppsToView?: boolean,
  saveToFiles?: boolean,
  appId: string,
};
type MultipleOptions = {
  url?: string,
  urls?: Array<string>,
  filename?: string,
  filenames?: Array<string>,
  type?: string,
  message?: string,
  title?: string,
  subject?: string,
  activityItemSources?: Array<ActivityItemSource>,
  excludedActivityTypes?: string,
  failOnCancel?: boolean,
  showAppsToView?: boolean,
  saveToFiles?: boolean,
};

type ActivityType =
  | 'addToReadingList'
  | 'airDrop'
  | 'assignToContact'
  | 'copyToPasteBoard'
  | 'mail'
  | 'message'
  | 'openInIBooks' // iOS 9 or later
  | 'postToFacebook'
  | 'postToFlickr'
  | 'postToTencentWeibo'
  | 'postToTwitter'
  | 'postToVimeo'
  | 'postToWeibo'
  | 'print'
  | 'saveToCameraRoll'
  | 'markupAsPDF'; // iOS 11 or later

type ActivityItem = { type: 'text' | 'url', content: string };

type LinkMetadata = {
  originalUrl?: string,
  url?: string,
  title?: string,
  icon?: string,
  image?: string,
  remoteVideoUrl?: string,
  video?: string,
};

type ActivityItemSource = {
  placeholderItem: ActivityItem,
  item: { [ActivityType | string]: ?ActivityItem },
  subject?: { [ActivityType | string]: string },
  dataTypeIdentifier?: { [ActivityType | string]: string },
  thumbnailImage?: { [ActivityType | string]: string },
  linkMetadata?: LinkMetadata,
};

type OpenReturn = { app?: string, dismissedAction?: boolean };
type ShareSingleReturn = { message: string, isInstalled?: boolean };

const requireAndAskPermissions = async (options: Options | MultipleOptions): Promise<any> => {
  if ((options.url || options.urls) && Platform.OS === 'android') {
    const urls: Array<string> = options.urls || (options.url ? [options.url] : []);
    try {
      const resultArr = await Promise.all(
        urls.map(
          (url) =>
            new Promise((res, rej) => {
              NativeModules.RNShare.isBase64File(
                url,
                (e) => {
                  rej(e);
                },
                (isBase64) => {
                  res(isBase64);
                },
              );
            }),
        ),
      );

      const requirePermission = resultArr.includes(true);
      if (!requirePermission) {
        return Promise.resolve(true);
      }
      const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (hasPermission) {
        return Promise.resolve(true);
      }

      if (androidPermissionRequestRequired) {
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        if (result === PermissionsAndroid.RESULTS.GRANTED) {
          return Promise.resolve();
        }
        throw new Error('Write Permission not available');
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }
  return Promise.resolve(true);
};

class RNShare {
  static Button: any;
  static ShareSheet: RNShare.ShareSheet;
  static Overlay: any;
  static Sheet: any;
  static Social = {
    FACEBOOK: NativeModules.RNShare.FACEBOOK || 'facebook',
    FACEBOOK_STORIES: NativeModules.RNShare.FACEBOOK_STORIES || 'facebookstories',
    PAGESMANAGER: NativeModules.RNShare.PAGESMANAGER || 'pagesmanager',
    TWITTER: NativeModules.RNShare.TWITTER || 'twitter',
    WHATSAPP: NativeModules.RNShare.WHATSAPP || 'whatsapp',
    INSTAGRAM: NativeModules.RNShare.INSTAGRAM || 'instagram',
    INSTAGRAM_STORIES: NativeModules.RNShare.INSTAGRAM_STORIES || 'instagramstories',
    GOOGLEPLUS: NativeModules.RNShare.GOOGLEPLUS || 'googleplus',
    EMAIL: NativeModules.RNShare.EMAIL || 'email',
    PINTEREST: NativeModules.RNShare.PINTEREST || 'pinterest',
    LINKEDIN: NativeModules.RNShare.LINKEDIN || 'linkedin',
    SMS: NativeModules.RNShare.SMS || 'sms',
  };

  static InstagramStories = {
    SHARE_BACKGROUND_IMAGE: NativeModules.RNShare.SHARE_BACKGROUND_IMAGE || 'shareBackgroundImage',
    SHARE_BACKGROUND_VIDEO: NativeModules.RNShare.SHARE_BACKGROUND_VIDEO || 'shareBackgroundVideo',
    SHARE_STICKER_IMAGE: NativeModules.RNShare.SHARE_STICKER_IMAGE || 'shareStickerImage',
    SHARE_BACKGROUND_AND_STICKER_IMAGE:
      NativeModules.RNShare.SHARE_BACKGROUND_AND_STICKER_IMAGE || 'shareBackgroundAndStickerImage',
  };

  static FacebookStories = {
    SHARE_BACKGROUND_IMAGE: NativeModules.RNShare.SHARE_BACKGROUND_IMAGE || 'shareBackgroundImage',
    SHARE_STICKER_IMAGE: NativeModules.RNShare.SHARE_STICKER_IMAGE || 'shareStickerImage',
    SHARE_BACKGROUND_AND_STICKER_IMAGE:
      NativeModules.RNShare.SHARE_BACKGROUND_AND_STICKER_IMAGE || 'shareBackgroundAndStickerImage',
  };

  static open(options: Options | MultipleOptions): Promise<OpenReturn> {
    return new Promise((resolve, reject) => {
      requireAndAskPermissions(options)
        .then(() => {
          if (Platform.OS === 'ios' && options.url && !options.urls) {
            // Backward compatibility with { Share } from react-native
            const url = options.url;
            delete options.url;

            options.urls = [url];

            if (options.filename && !options.filenames) {
              options.filenames = [options.filename];
              delete options.filename;
            }
          }

          NativeModules.RNShare.open(
            options,
            (e) => {
              return reject({ error: e });
            },
            (success, activityType) => {
              if (success) {
                return resolve({
                  app: activityType,
                  message: activityType,
                });
              } else if (options.failOnCancel === false) {
                return resolve({
                  dismissedAction: true,
                });
              } else {
                reject(new Error('User did not share'));
              }
            },
          );
        })
        .catch((e) => reject(e));
    });
  }

  static shareSingle(options: Options): Promise<ShareSingleReturn> {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      return new Promise((resolve, reject) => {
        requireAndAskPermissions(options)
          .then(() => {
            NativeModules.RNShare.shareSingle(
              options,
              (e) => {
                return reject({ error: e });
              },
              (e, activityType) => {
                return resolve({
                  message: e,
                  app: activityType,
                });
              },
            );
          })
          .catch((e) => reject(e));
      });
    } else {
      throw new Error('Not implemented');
    }
  }

  static isPackageInstalled(packageName: string): Promise<ShareSingleReturn> {
    if (Platform.OS === 'android') {
      return new Promise((resolve, reject) => {
        NativeModules.RNShare.isPackageInstalled(
          packageName,
          (e) => {
            return reject({ error: e });
          },
          (isInstalled) => {
            return resolve({
              isInstalled: isInstalled,
              message: 'Package is Installed',
            });
          },
        );
      });
    } else {
      throw new Error('Not implemented');
    }
  }
}

export { Overlay, Sheet, Button, ShareSheet };
export default RNShare;
