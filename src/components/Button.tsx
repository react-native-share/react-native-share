import * as React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

export interface ButtonProps {
  onPress: () => void;
  iconSrc: ImageSourcePropType;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  buttonStyle,
  onPress,
  iconSrc,
  textStyle,
  children,
}: ButtonProps) => (
  <TouchableOpacity activeOpacity={0.5} style={[styles.button, buttonStyle]} onPress={onPress}>
    <Image style={styles.icon} source={iconSrc} />
    <Text style={[styles.buttonText, textStyle]}>{children}</Text>
  </TouchableOpacity>
);

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    flexDirection: 'row',
    height: 50,
    padding: 10,
  },
  buttonText: {
    color: '#2c2c2c',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  icon: {
    height: 28,
    marginLeft: 10,
    marginRight: 30,
    width: 28,
  },
});
