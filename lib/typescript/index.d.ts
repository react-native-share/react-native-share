/// <reference types="react" />
import Overlay from './components/Overlay';
import Sheet from './components/Sheet';
import Button from './components/Button';
import ShareSheet from './components/ShareSheet';
import { Social, IsPackageInstalledResult, ActivityType, ShareAsset, ShareOpenResult, ShareOptions, ShareSingleOptions, ShareSingleResult } from './types';
declare const RNShare: {
    readonly Button: import("react").FC<import("./components/Button").ButtonProps>;
    readonly ShareSheet: import("react").FC<import("react").PropsWithChildren<import("./components/ShareSheet").ShareSheetProps>>;
    readonly Overlay: import("react").FC<import("react").PropsWithChildren<import("./components/Overlay").OverlayProps>>;
    readonly Sheet: import("react").FC<import("react").PropsWithChildren<import("./components/Sheet").SheetProps>>;
    readonly Social: {
        readonly FACEBOOK: string;
        readonly FACEBOOK_STORIES: string;
        readonly PAGESMANAGER: string;
        readonly TWITTER: string;
        readonly WHATSAPP: string;
        readonly WHATSAPPBUSINESS: string;
        readonly INSTAGRAM: string;
        readonly INSTAGRAM_STORIES: string;
        readonly GOOGLEPLUS: string;
        readonly EMAIL: string;
        readonly PINTEREST: string;
        readonly LINKEDIN: string;
        readonly SMS: string;
        readonly TELEGRAM: string;
        readonly MESSENGER: string;
        readonly SNAPCHAT: string;
        readonly VIBER: string;
        readonly DISCORD: string;
    };
    readonly open: (options: ShareOptions) => Promise<ShareOpenResult>;
    readonly shareSingle: (options: ShareSingleOptions) => Promise<ShareSingleResult>;
    readonly isPackageInstalled: (packageName: string) => Promise<IsPackageInstalledResult>;
};
export { Overlay, Sheet, Button, ShareSheet, ShareAsset, Social };
export type { ShareSingleOptions, ShareOptions, ActivityType, IsPackageInstalledResult };
export type { OverlayProps } from './components/Overlay';
export type { SheetProps } from './components/Sheet';
export type { ButtonProps } from './components/Button';
export type { ShareSheetProps } from './components/ShareSheet';
export default RNShare;
//# sourceMappingURL=index.d.ts.map