import * as React from 'react';
import { View, TouchableOpacity, BackHandler, StyleSheet } from 'react-native';
import Overlay from './Overlay';
import Sheet from './Sheet';
const ShareSheet = ({
  style = {},
  overlayStyle = {},
  visible,
  onCancel,
  children
}) => {
  const backButtonHandler = React.useCallback(() => {
    if (visible) {
      onCancel();
      return true;
    }
    return false;
  }, [visible, onCancel]);
  React.useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', backButtonHandler);
    return () => {
      subscription.remove();
    };
  }, [backButtonHandler]);
  return /*#__PURE__*/React.createElement(Overlay, {
    visible: visible
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.actionSheetContainer, overlayStyle]
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: styles.button,
    onPress: onCancel
  }), /*#__PURE__*/React.createElement(Sheet, {
    visible: visible
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.buttonContainer, style]
  }, children))));
};
const styles = StyleSheet.create({
  actionSheetContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 0,
    paddingTop: 10
  },
  buttonContainer: {
    backgroundColor: 'white',
    overflow: 'hidden',
    paddingBottom: 5,
    paddingTop: 5
  },
  button: {
    flex: 1
  }
});
export default ShareSheet;
//# sourceMappingURL=ShareSheet.js.map