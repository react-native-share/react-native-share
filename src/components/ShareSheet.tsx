import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, BackHandler } from 'react-native';
import type { ViewStyle, StyleProp } from 'react-native';

import Overlay from './Overlay';
import Sheet from './Sheet';

export interface ShareSheetProps {
  visible: boolean;
  onCancel: () => void;
  children: React.ReactChildren;
  style?: StyleProp<ViewStyle>;
  overlayStyle?: StyleProp<ViewStyle>;
}

class ShareSheet extends React.Component<ShareSheetProps> {
  componentDidMount() {
    this.backButtonHandler = this.backButtonHandler.bind(this);
    BackHandler.addEventListener('hardwareBackPress', this.backButtonHandler);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backButtonHandler);
  }

  backButtonHandler(): boolean {
    if (this.props.visible) {
      this.props.onCancel();
      return true;
    }
    return false;
  }

  render() {
    const { style = {}, overlayStyle = {}, ...props } = this.props;

    return (
      <Overlay {...props}>
        <View style={[styles.actionSheetContainer, overlayStyle]}>
          <TouchableOpacity style={styles.button} onPress={this.props.onCancel} />
          <Sheet visible={this.props.visible}>
            <View style={[styles.buttonContainer, style]}>{this.props.children}</View>
          </Sheet>
        </View>
      </Overlay>
    );
  }
}

export default ShareSheet;

const styles = StyleSheet.create({
  actionSheetContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 0,
    paddingTop: 10,
  },
  buttonContainer: {
    backgroundColor: 'white',
    overflow: 'hidden',
    paddingBottom: 5,
    paddingTop: 5,
  },
  button: {
    flex: 1,
  },
});
