import { Platform } from 'react-native';

import NativeRNShare from "../codegenSpec/NativeRNShare";

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
    FACEBOOK: NativeRNShare.FACEBOOK || Social.Facebook,
    FACEBOOK_STORIES: NativeRNShare.FACEBOOKSTORIES || Social.FacebookStories,
    PAGESMANAGER: NativeRNShare.PAGESMANAGER || Social.Pagesmanager,
    TWITTER: NativeRNShare.TWITTER || Social.Twitter,
    WHATSAPP: NativeRNShare.WHATSAPP || Social.Whatsapp,
    WHATSAPPBUSINESS: NativeRNShare.WHATSAPPBUSINESS || Social.Whatsappbusiness,
    INSTAGRAM: NativeRNShare.INSTAGRAM || Social.Instagram,
    INSTAGRAM_STORIES: NativeRNShare.INSTAGRAMSTORIES || Social.InstagramStories,
    GOOGLEPLUS: NativeRNShare.GOOGLEPLUS || Social.Googleplus,
    EMAIL: NativeRNShare.EMAIL || Social.Email,
    PINTEREST: NativeRNShare.PINTEREST || Social.Pinterest,
    LINKEDIN: NativeRNShare.LINKEDIN || Social.Linkedin,
    SMS: NativeRNShare.SMS || Social.Sms,
    TELEGRAM: NativeRNShare.TELEGRAM || Social.Telegram,
    MESSENGER: NativeRNShare.MESSENGER || Social.Messenger,
    SNAPCHAT: NativeRNShare.SNAPCHAT || Social.Snapchat,
    VIBER: NativeRNShare.VIBER || Social.Viber,
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
          NativeRNShare.open(options)
            .then(({success, message})=>{
              if (success) {
                return resolve({
                  success,
                  message,
                });
              } else if (options.failOnCancel === false) {
                return resolve({
                  dismissedAction: true,
                  success,
                  message,
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
              .then(({success, message}) => {
                return resolve({
                  success: Boolean(success),
                  message,
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
          .then((isInstalled)=>{
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
