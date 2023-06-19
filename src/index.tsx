import { Platform } from 'react-native';

import NativeRNShare from '../codegenSpec/NativeRNShare';

import Overlay from './components/Overlay';
import Sheet from './components/Sheet';
import Button from './components/Button';
import ShareSheet from './components/ShareSheet';
import requireAndAskPermissions from './helpers/requireAndAskPermissions';
import {
  Social,
  IsPackageInstalledResult,
  ActivityType,
  ShareOpenResult,
  ShareAsset,
  ShareOptions,
  ShareSingleOptions,
  ShareSingleResult,
} from './types';

const RNShare = {
  Button,
  ShareSheet,
  Overlay,
  Sheet,

  Social: {
    FACEBOOK: NativeRNShare.getConstants().FACEBOOK || Social.Facebook,
    FACEBOOK_STORIES: NativeRNShare.getConstants().FACEBOOKSTORIES || Social.FacebookStories,
    PAGESMANAGER: NativeRNShare.getConstants().PAGESMANAGER || Social.Pagesmanager,
    TWITTER: NativeRNShare.getConstants().TWITTER || Social.Twitter,
    WHATSAPP: NativeRNShare.getConstants().WHATSAPP || Social.Whatsapp,
    WHATSAPPBUSINESS: NativeRNShare.getConstants().WHATSAPPBUSINESS || Social.Whatsappbusiness,
    INSTAGRAM: NativeRNShare.getConstants().INSTAGRAM || Social.Instagram,
    INSTAGRAM_STORIES: NativeRNShare.getConstants().INSTAGRAMSTORIES || Social.InstagramStories,
    GOOGLEPLUS: NativeRNShare.getConstants().GOOGLEPLUS || Social.Googleplus,
    EMAIL: NativeRNShare.getConstants().EMAIL || Social.Email,
    PINTEREST: NativeRNShare.getConstants().PINTEREST || Social.Pinterest,
    LINKEDIN: NativeRNShare.getConstants().LINKEDIN || Social.Linkedin,
    SMS: NativeRNShare.getConstants().SMS || Social.Sms,
    TELEGRAM: NativeRNShare.getConstants().TELEGRAM || Social.Telegram,
    MESSENGER: NativeRNShare.getConstants().MESSENGER || Social.Messenger,
    SNAPCHAT: NativeRNShare.getConstants().SNAPCHAT || Social.Snapchat,
    VIBER: NativeRNShare.getConstants().VIBER || Social.Viber,
  },

  open(options: ShareOptions): Promise<ShareOpenResult | never> {
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
            }
          }
          NativeRNShare.open(options).then((ret: { success: boolean; message: string }) => {
            if (ret.success) {
              return resolve({
                success: ret.success,
                message: ret.message,
              });
            } else if (options.failOnCancel === false) {
              return resolve({
                dismissedAction: true,
                success: ret.success,
                message: ret.message,
              });
            } else {
              reject(new Error('User did not share'));
            }
          });
        })
        .catch((e: unknown) => reject(e));
    });
  },

  shareSingle(options: ShareSingleOptions): Promise<ShareSingleResult | never> {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      return new Promise((resolve, reject) => {
        requireAndAskPermissions(options)
          .then(() => {
            if (options.url) {
              options.urls = [options.url];
            }

            if (options.social === RNShare.Social.INSTAGRAM_STORIES && !options.appId) {
              return reject({
                success: false,
                message: 'Instagram Story share requires an appId based on Meta policy.',
              });
            }
            NativeRNShare.shareSingle(options)
              .then((ret: { success: boolean; message: string }) => {
                return resolve({
                  success: Boolean(ret.success),
                  message: ret.message,
                });
              })
              .catch((e: unknown) => reject(e));
          })
          .catch((e: unknown) => reject(e));
      });
    } else {
      throw new Error('Not implemented');
    }
  },

  isPackageInstalled(packageName: string): Promise<IsPackageInstalledResult | never> {
    if (Platform.OS === 'android') {
      return new Promise((resolve, reject) => {
        NativeRNShare.isPackageInstalled(packageName)
          .then((isInstalled: boolean) => {
            return resolve({
              isInstalled,
              message: 'Package is Installed',
            });
          })
          .catch((e: unknown) => reject(e));
      });
    } else {
      throw new Error('Not implemented');
    }
  },
} as const;

export { Overlay, Sheet, Button, ShareSheet, ShareAsset, Social };
export type { ShareSingleOptions, ShareOptions, ActivityType, IsPackageInstalledResult };
export type { OverlayProps } from './components/Overlay';
export type { SheetProps } from './components/Sheet';
export type { ButtonProps } from './components/Button';
export type { ShareSheetProps } from './components/ShareSheet';
export default RNShare;
