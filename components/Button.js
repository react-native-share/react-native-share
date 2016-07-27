import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';

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

export default class Button extends React.Component {
  render() {
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            style={[styles.button, this.props.buttonStyle]}
            onPress={this.props.onPress}>
            <Image style={styles.icon} source={this.props.iconSrc} />
            <Text style={[styles.buttonText, this.props.textStyle]}>
                {this.props.children}
            </Text>
        </TouchableOpacity>
    );
  }
};
