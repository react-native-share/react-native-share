import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
const Button = ({
  buttonStyle,
  onPress,
  iconSrc,
  textStyle,
  children
}) => /*#__PURE__*/React.createElement(TouchableOpacity, {
  activeOpacity: 0.5,
  style: [styles.button, buttonStyle],
  onPress: onPress
}, /*#__PURE__*/React.createElement(Image, {
  style: styles.icon,
  source: iconSrc
}), /*#__PURE__*/React.createElement(Text, {
  style: [styles.buttonText, textStyle]
}, children));
export default Button;
const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    flexDirection: 'row',
    height: 50,
    padding: 10
  },
  buttonText: {
    color: '#2c2c2c',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    textAlignVertical: 'center'
  },
  icon: {
    height: 28,
    marginLeft: 10,
    marginRight: 30,
    width: 28
  }
});
//# sourceMappingURL=Button.js.map