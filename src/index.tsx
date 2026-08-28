import NativeRNShare from './codegenSpec/NativeRNShare';

import Overlay from './components/Overlay';
import Sheet from './components/Sheet';
import Button from './components/Button';
import ShareSheet from './components/ShareSheet';
import checkPermissions from './helpers/checkPermissions';
import {
  Social,
  IsPackageInstalledResult,
  ActivityType,
  ShareAsset,
  ShareOpenResult,
  ShareOptions,
  ShareSingleOptions,
  ShareSingleResult,
} from './types';
import { isAndroid, isIOS } from './helpers/platform';
import { normalizeShareOpenOptions, normalizeSingleShareOptions } from './helpers/options';

const constants = NativeRNShare.getConstants();

const RNShare = {
  Button,
  ShareSheet,
  Overlay,
  Sheet,

  Social: {
    FACEBOOK: constants.FACEBOOK || Social.Facebook,
    FACEBOOK_STORIES: constants.FACEBOOKSTORIES || Social.FacebookStories,
    PAGESMANAGER: constants.PAGESMANAGER || Social.Pagesmanager,
    TWITTER: constants.TWITTER || Social.Twitter,
    WHATSAPP: constants.WHATSAPP || Social.Whatsapp,
    WHATSAPPBUSINESS: constants.WHATSAPPBUSINESS || Social.Whatsappbusiness,
    INSTAGRAM: constants.INSTAGRAM || Social.Instagram,
    INSTAGRAM_STORIES: constants.INSTAGRAMSTORIES || Social.InstagramStories,
    GOOGLEPLUS: constants.GOOGLEPLUS || Social.Googleplus,
    EMAIL: constants.EMAIL || Social.Email,
    PINTEREST: constants.PINTEREST || Social.Pinterest,
    LINKEDIN: constants.LINKEDIN || Social.Linkedin,
    SMS: constants.SMS || Social.Sms,
    TELEGRAM: constants.TELEGRAM || Social.Telegram,
    MESSENGER: constants.MESSENGER || Social.Messenger,
    SNAPCHAT: constants.SNAPCHAT || Social.Snapchat,
    VIBER: constants.VIBER || Social.Viber,
    DISCORD: constants.DISCORD || Social.Discord,
  },

  async open(options: ShareOptions) {
    await checkPermissions(options);

    options = normalizeShareOpenOptions(options);

    const result: ShareOpenResult = await NativeRNShare.open(options);

    if (!result.success) {
      if (options.failOnCancel) {
        throw new Error('User did not share');
      }

      const dismissedResult: ShareOpenResult = {
        dismissedAction: true,
        success: result.success,
        message: result.message,
      };
      return dismissedResult;
    }

    return result;
  },

  async shareSingle(options: ShareSingleOptions) {
    if (!isAndroid() && !isIOS()) throw new Error('Not implemented');

    if (options.social === RNShare.Social.INSTAGRAM_STORIES && !options.appId) {
      throw new Error('To share to Instagram Stories you need to provide appId');
    }

    await checkPermissions(options);

    options = normalizeSingleShareOptions(options);

    const { success, message } = await NativeRNShare.shareSingle(options);

    const result: ShareSingleResult = {
      success: Boolean(success),
      message,
    };

    return result;
  },

  async isPackageInstalled(packageName: string) {
    if (!isAndroid()) throw new Error('Not implemented');

    const isInstalled = await NativeRNShare.isPackageInstalled(packageName);

    const result: IsPackageInstalledResult = {
      isInstalled,
      message: 'Package is Installed',
    };

    return result;
  },
} as const;

export { Overlay, Sheet, Button, ShareSheet, ShareAsset, Social };
export type { ShareSingleOptions, ShareOptions, ActivityType, IsPackageInstalledResult };
export type { OverlayProps } from './components/Overlay';
export type { SheetProps } from './components/Sheet';
export type { ButtonProps } from './components/Button';
export type { ShareSheetProps } from './components/ShareSheet';
export default RNShare;
