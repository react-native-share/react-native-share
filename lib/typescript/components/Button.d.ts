import * as React from 'react';
import { ImageSourcePropType, StyleProp, TextStyle, ViewStyle } from 'react-native';
export interface ButtonProps {
    onPress: () => void;
    iconSrc: ImageSourcePropType;
    buttonStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    children: React.ReactNode;
}
declare const Button: React.FC<ButtonProps>;
export default Button;
//# sourceMappingURL=Button.d.ts.map