import * as React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  NativeModules,
  Platform,
  PermissionsAndroid,
  ViewStyle,
  StyleProp,
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
  visible: boolean;
  onCancel: () => void;
  style?: StyleProp<ViewStyle>;
  overlayStyle?: StyleProp<ViewStyle>;
};

const shareSheetStyle = { flex: 1 };

class ShareSheet extends React.Component<Props> {
  componentDidMount() {
    this.backButtonHandler = this.backButtonHandler.bind(this);
    // @ts-ignore is this on purpose or maybe wrong?
    BackHandler.addEventListener('backPress', this.backButtonHandler);
  }

  componentWillUnmount() {
    // @ts-ignore is this on purpose or maybe wrong?
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
    const { style = {}, overlayStyle = {}, visible, ...props } = this.props;
    return (
      <Overlay {...props} visible={visible}>
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
  url?: string;
  urls?: Array<string>;
  filename?: string;
  filenames?: Array<string>;
  type?: string;
  message?: string;
  title?: string;
  subject?: string;
  recipient?: string;
  excludedActivityTypes?: string;
  failOnCancel?: boolean;
  showAppsToView?: boolean;
  saveToFiles?: boolean;
  appId: string;
};
type MultipleOptions = {
  url?: string;
  urls?: Array<string>;
  filename?: string;
  filenames?: Array<string>;
  type?: string;
  message?: string;
  title?: string;
  subject?: string;
  activityItemSources?: Array<ActivityItemSource>;
  excludedActivityTypes?: string;
  failOnCancel?: boolean;
  showAppsToView?: boolean;
  saveToFiles?: boolean;
};

enum ActivityType {
  addToReadingList = 'addToReadingList',
  airDrop = 'airDrop',
  assignToContact = 'assignToContact',
  copyToPasteBoard = 'copyToPasteBoard',
  mail = 'mail',
  message = 'message',
  openInIBooks = 'openInIBooks',
  postToFacebook = 'postToFacebook',
  postToFlickr = 'postToFlickr',
  postToTencentWeibo = 'postToTencentWeibo',
  postToTwitter = 'postToTwitter',
  postToVimeo = 'postToVimeo',
  postToWeibo = 'postToWeibo',
  print = 'print',
  saveToCameraRoll = 'saveToCameraRoll',
  markupAsPDF = 'markupAsPDF',
}
interface IActivityType {
  addToReadingList: string;
  airDrop: string;
  assignToContact: string;
  copyToPasteBoard: string;
  mail: string;
  message: string;
  openInIBooks: string;
  postToFacebook: string;
  postToFlickr: string;
  postToTencentWeibo: string;
  postToTwitter: string;
  postToVimeo: string;
  postToWeibo: string;
  print: string;
  saveToCameraRoll: string;
  markupAsPDF: string;
}

type ActivityItem = { type: 'text' | 'url'; content: string };

type LinkMetadata = {
  originalUrl?: string;
  url?: string;
  title?: string;
  icon?: string;
  image?: string;
  remoteVideoUrl?: string;
  video?: string;
};

type ActivityItemSource = {
  placeholderItem: ActivityItem;
  item: { markupAsPDF: ActivityItem } | { [key: string]: ActivityItem };
  subject?: Partial<IActivityType> | { [key: string]: string };
  dataTypeIdentifier?: Partial<IActivityType> | { [key: string]: string };
  thumbnailImage?: Partial<IActivityType> | { [key: string]: string };
  linkMetadata?: LinkMetadata;
};

type OpenReturn = { app?: string; dismissedAction?: boolean };
type AppMessageReturn = { app: ActivityType; message: ActivityType };
type ShareSingleReturn = { message: string; isInstalled?: boolean };

const requireAndAskPermissions = async (options: Options | MultipleOptions) => {
  if ((options.url || options.urls) && Platform.OS === 'android') {
    const urls: Array<string> = options.urls || (options.url ? [options.url] : []);
    try {
      const resultArr = await Promise.all(
        urls.map(
          (url) =>
            new Promise((res, rej) => {
              NativeModules.RNShare.isBase64File(
                url,
                (e: unknown) => {
                  rej(e);
                },
                (isBase64: boolean) => {
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
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (result === PermissionsAndroid.RESULTS.GRANTED) {
        return Promise.resolve(true);
      }
      throw new Error('Write Permission not available');
    } catch (e) {
      return Promise.reject(e);
    }
  }
  return Promise.resolve(true);
};

enum Social {
  facebook = 'facebook',
  facebookStories = 'facebook-stories',
  pagesmanager = 'pagesmanager',
  twitter = 'twitter',
  whatsapp = 'whatsapp',
  instagram = 'instagram',
  instagramstories = 'instagramstories',
  googleplus = 'googleplus',
  email = 'email',
  pinterest = 'pinterest',
  linkedin = 'linkedin',
  sms = 'sms',
}

class RNShare {
  static Button: typeof Button;
  static ShareSheet: ShareSheet;
  static Overlay: Overlay;
  static Sheet: Sheet;
  static Social = {
    FACEBOOK: NativeModules.RNShare.FACEBOOK || Social.facebook,
    FACEBOOK_STORIES: NativeModules.RNShare.FACEBOOK_STORIES || Social.facebookStories,
    PAGESMANAGER: NativeModules.RNShare.PAGESMANAGER || Social.pagesmanager,
    TWITTER: NativeModules.RNShare.TWITTER || Social.twitter,
    WHATSAPP: NativeModules.RNShare.WHATSAPP || Social.whatsapp,
    INSTAGRAM: NativeModules.RNShare.INSTAGRAM || Social.instagram,
    INSTAGRAM_STORIES: NativeModules.RNShare.INSTAGRAM_STORIES || Social.instagramstories,
    GOOGLEPLUS: NativeModules.RNShare.GOOGLEPLUS || Social.googleplus,
    EMAIL: NativeModules.RNShare.EMAIL || Social.email,
    PINTEREST: NativeModules.RNShare.PINTEREST || Social.pinterest,
    LINKEDIN: NativeModules.RNShare.LINKEDIN || Social.linkedin,
    SMS: NativeModules.RNShare.SMS || Social.sms,
  };

  static InstagramStories = {
    SHARE_BACKGROUND_IMAGE: NativeModules.RNShare.SHARE_BACKGROUND_IMAGE || 'shareBackgroundImage',
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

  static open(options: Options | MultipleOptions): Promise<OpenReturn | AppMessageReturn> {
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
            (e: unknown) => {
              return reject({ error: e });
            },
            (success: boolean, activityType: ActivityType) => {
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
        .catch((e: unknown) => reject(e));
    });
  }

  static shareSingle(options: Options): Promise<ShareSingleReturn | AppMessageReturn> {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      return new Promise((resolve, reject) => {
        requireAndAskPermissions(options)
          .then(() => {
            NativeModules.RNShare.shareSingle(
              options,
              (e: unknown) => {
                return reject({ error: e });
              },
              (e: Error, activityType: ActivityType) => {
                return resolve({
                  /**
                   * Types here are really strange, it suggests returning
                   * e or e.message (where we assume we receive an Error and not unkown)
                   * are both wrong, because in other places message is ActivityType
                   */
                  // @ts-ignore need info
                  message: e.message,
                  app: activityType,
                });
              },
            );
          })
          .catch((e: unknown) => reject(e));
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
          (e: unknown) => {
            return reject({ error: e });
          },
          (isInstalled: boolean) => {
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
