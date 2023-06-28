export enum Social {
  Facebook = 'facebook',
  FacebookStories = 'facebookstories',
  Pagesmanager = 'pagesmanager',
  Twitter = 'twitter',
  Whatsapp = 'whatsapp',
  Whatsappbusiness = 'whatsappbusiness',
  Instagram = 'instagram',
  InstagramStories = 'instagramstories',
  Googleplus = 'googleplus',
  Email = 'email',
  Pinterest = 'pinterest',
  Linkedin = 'linkedin',
  Sms = 'sms',
  Telegram = 'telegram',
  Snapchat = 'snapchat',
  Messenger = 'messenger',
  Viber = 'viber',
}

export enum ShareAsset {
  BackgroundImage = 'shareBackgroundImage',
  BackgroundVideo = 'shareBackgroundVideo',
  StickerImage = 'shareStickerImage',
  BackgroundAndStickerImage = 'shareBackgroundAndStickerImage',
}

export interface LinkMetadata {
  originalUrl?: string;
  url?: string;
  title?: string;
  icon?: string;
  image?: string;
  remoteVideoUrl?: string;
  video?: string;
}

export interface ActivityItem {
  type: 'text' | 'url';
  content: string;
}

export interface ActivityItemSource {
  placeholderItem: ActivityItem;
  item: { [key in ActivityTypeItemSource]?: ActivityItem | null | undefined };
  subject?: { [key in ActivityTypeItemSource]?: string };
  dataTypeIdentifier?: { [key in ActivityTypeItemSource]?: string };
  thumbnailImage?: { [key in ActivityTypeItemSource]?: string };
  linkMetadata?: LinkMetadata;
}

interface BaseShareSingleOptions {
  appId?: string;
  urls?: string[];
  url?: string;
  type?: string;
  filename?: string;
  message?: string;
  title?: string;
  subject?: string;
  email?: string;
  recipient?: string;
  social: Exclude<Social, Social.FacebookStories | Social.InstagramStories>;
  forceDialog?: boolean;
}

interface BaseSocialStoriesShareSingleOptions extends Omit<BaseShareSingleOptions, 'social'> {
  backgroundImage?: string;
  stickerImage?: string;
  backgroundBottomColor?: string;
  backgroundTopColor?: string;
  attributionURL?: string;
  backgroundVideo?: string;
}

export interface InstagramStoriesShareSingleOptions extends BaseSocialStoriesShareSingleOptions {
  social: Social.InstagramStories;
  appId: string;
}

export interface FacebookStoriesShareSingleOptions extends BaseSocialStoriesShareSingleOptions {
  social: Social.FacebookStories;
  appId: string;
}

export type ShareSingleOptions =
  | BaseShareSingleOptions
  | InstagramStoriesShareSingleOptions
  | FacebookStoriesShareSingleOptions;

export interface ShareOptions {
  message?: string;
  title?: string;
  url?: string;
  urls?: string[];
  type?: string;
  subject?: string;
  email?: string;
  recipient?: string;
  excludedActivityTypes?: ActivityType[] | string[];
  failOnCancel?: boolean;
  showAppsToView?: boolean;
  filename?: string;
  filenames?: string[];
  saveToFiles?: boolean;
  activityItemSources?: ActivityItemSource[];
  isNewTask?: boolean;
}

export type ActivityType =
  | 'default'
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
  | 'markupAsPDF'; // iOS 11 or late

export type ActivityTypeItemSource = ActivityType | string;

export interface ShareSingleResult {
  message: string;
  success: boolean;
}

export interface ShareOpenResult extends ShareSingleResult {
  dismissedAction?: boolean;
}
export interface IsPackageInstalledResult {
  message: string;
  isInstalled: boolean;
}
