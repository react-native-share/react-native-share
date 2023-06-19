import 'react-native';

import { ShareAsset, ShareSingleOptions, ShareOptions, Social } from '../types';

declare module 'react-native' {
  export interface RNShare {
    FACEBOOK: Social.Facebook;
    FACEBOOKSTORIES: Social.FacebookStories;
    PAGESMANAGER: Social.Pagesmanager;
    TWITTER: Social.Twitter;
    WHATSAPP: Social.Whatsapp;
    WHATSAPPBUSINESS: Social.Whatsappbusiness;
    INSTAGRAM: Social.Instagram;
    INSTAGRAMSTORIES: Social.InstagramStories;
    GOOGLEPLUS: Social.Googleplus;
    EMAIL: Social.Email;
    PINTEREST: Social.Pinterest;
    LINKEDIN: Social.Linkedin;
    SMS: Social.Sms;
    TELEGRAM: Social.Telegram;
    SNAPCHAT: Social.Snapchat;
    MESSENGER: Social.Messenger;
    VIBER: Social.Viber;

    SHARE_BACKGROUND_IMAGE: ShareAsset.BackgroundImage;
    SHARE_BACKGROUND_VIDEO: ShareAsset.BackgroundVideo;
    SHARE_STICKER_IMAGE: ShareAsset.StickerImage;
    SHARE_BACKGROUND_AND_STICKER_IMAGE: ShareAsset.BackgroundAndStickerImage;

    open(
      options: ShareOptions
    ): Promise<{success: boolean, message: string}>;

    shareSingle(
      options: ShareSingleOptions
    ): Promise<{success: boolean, message: string}>;

    isPackageInstalled(
      packageName: string
    ): Promise<boolean>;

    isBase64File(
      url: string
    ): Promise<boolean>;
  }

  interface NativeModulesStatic {
    RNShare: RNShare;
  }
}
