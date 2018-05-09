import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Image} from 'react-native';

const styles = StyleSheet.create({
  buttonText: {
    color: '#2c2c2c',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold',
    textAlignVertical: 'center'
  },
  button: {
    height: 50,
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row'
  },
  icon: {
    width: 28,
    height: 28,
    marginLeft: 10,
    marginRight: 30
  }
});

export default ({buttonStyle, onPress, iconSrc, textStyle, children}) =>
  <TouchableOpacity
    activeOpacity={0.5}
    style={[styles.button, buttonStyle]}
    onPress={onPress}>
    <Image style={styles.icon} source={iconSrc} />
    <Text style={[styles.buttonText, textStyle]}>
      {children}
    </Text>
  </TouchableOpacity>;
