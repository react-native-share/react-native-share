import { NativeModules, Platform } from 'react-native';

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
    FACEBOOK: NativeModules.RNShare.FACEBOOK || Social.Facebook,
    FACEBOOK_STORIES: NativeModules.RNShare.FACEBOOKSTORIES || Social.FacebookStories,
    PAGESMANAGER: NativeModules.RNShare.PAGESMANAGER || Social.Pagesmanager,
    TWITTER: NativeModules.RNShare.TWITTER || Social.Twitter,
    WHATSAPP: NativeModules.RNShare.WHATSAPP || Social.Whatsapp,
    WHATSAPPBUSINESS: NativeModules.RNShare.WHATSAPPBUSINESS || Social.Whatsappbusiness,
    INSTAGRAM: NativeModules.RNShare.INSTAGRAM || Social.Instagram,
    INSTAGRAM_STORIES: NativeModules.RNShare.INSTAGRAMSTORIES || Social.InstagramStories,
    GOOGLEPLUS: NativeModules.RNShare.GOOGLEPLUS || Social.Googleplus,
    EMAIL: NativeModules.RNShare.EMAIL || Social.Email,
    PINTEREST: NativeModules.RNShare.PINTEREST || Social.Pinterest,
    LINKEDIN: NativeModules.RNShare.LINKEDIN || Social.Linkedin,
    SMS: NativeModules.RNShare.SMS || Social.Sms,
    TELEGRAM: NativeModules.RNShare.TELEGRAM || Social.Telegram,
    MESSENGER: NativeModules.RNShare.MESSENGER || Social.Messenger,
    SNAPCHAT: NativeModules.RNShare.SNAPCHAT || Social.Snapchat,
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
              delete options.filename;
            }
          }

          NativeModules.RNShare.open(
            options,
            (error) => {
              return reject({ error });
            },
            (success, message) => {
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
            },
          );
        })
        .catch((e: unknown) => reject(e));
    });
  },

  shareSingle(options: ShareSingleOptions): Promise<ShareSingleResult | never> {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      return new Promise((resolve, reject) => {
        requireAndAskPermissions(options)
          .then(() => {
            NativeModules.RNShare.shareSingle(
              options,
              (error) => {
                return reject({ error });
              },
              (success, message) => {
                return resolve({
                  success,
                  message,
                });
              },
            );
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
        NativeModules.RNShare.isPackageInstalled(
          packageName,
          (error) => {
            return reject({ error });
          },
          (isInstalled) => {
            return resolve({
              isInstalled,
              message: 'Package is Installed',
            });
          },
        );
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
