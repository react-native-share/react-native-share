import * as React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  TextStyle,
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native';

const styles = StyleSheet.create({
  buttonText: {
    color: '#2c2c2c',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },
  button: {
    height: 50,
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
  },
  icon: {
    width: 28,
    height: 28,
    marginLeft: 10,
    marginRight: 30,
  },
});

type Props = {
  buttonStyle?: StyleProp<ViewStyle>;
  onPress: (event?: GestureResponderEvent) => void;
  iconSrc: ImageSourcePropType;
  textStyle?: StyleProp<TextStyle>;
};

const Button: React.FC<Props> = ({ buttonStyle, onPress, iconSrc, textStyle, children }) => {
  return (
    <TouchableOpacity activeOpacity={0.5} style={[styles.button, buttonStyle]} onPress={onPress}>
      <Image style={styles.icon} source={iconSrc} />
      <Text style={[styles.buttonText, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;
