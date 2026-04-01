import * as React from 'react';
import { ViewStyle, StyleProp } from 'react-native';
export interface ShareSheetProps {
    visible: boolean;
    onCancel: () => void;
    style?: StyleProp<ViewStyle>;
    overlayStyle?: StyleProp<ViewStyle>;
}
declare const ShareSheet: React.FC<React.PropsWithChildren<ShareSheetProps>>;
export default ShareSheet;
//# sourceMappingURL=ShareSheet.d.ts.map