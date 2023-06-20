import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  readonly getConstants: () => {
    FACEBOOK?: string;
    FACEBOOKSTORIES?: string;
    TWITTER?: string;
    GOOGLEPLUS?: string;
    WHATSAPP?: string;
    INSTAGRAM?: string;
    INSTAGRAMSTORIES?: string;
    TELEGRAM?: string;
    EMAIL?: string;
    MESSENGER?: string;
    VIBER?: string;
    PAGESMANAGER?: string;
    WHATSAPPBUSINESS?: string;
    PINTEREST?: string;
    LINKEDIN?: string;
    SNAPCHAT?: string;
    SHARE_BACKGROUND_IMAGE?: string;
    SHARE_BACKGROUND_VIDEO?: string;
    SHARE_STICKER_IMAGE?: string;
    SHARE_BACKGROUND_AND_STICKER_IMAGE?: string;
    SMS?: string;
    GENERIC?: string;
  };
  open: (options: Object) => Promise<{ success: boolean; message: string }>;
  shareSingle: (options: Object) => Promise<{ success: boolean; message: string }>;
  isPackageInstalled: (packagename: string) => Promise<boolean>;
  isBase64File: (url: string) => Promise<boolean>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RNShare');
