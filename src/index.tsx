import NativeRNShare from '../codegenSpec/NativeRNShare';

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
