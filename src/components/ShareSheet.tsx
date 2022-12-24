import * as React from 'react';
import {
  View,
  TouchableOpacity,
  BackHandler,
  ViewStyle,
  StyleProp,
  StyleSheet,
} from 'react-native';

import Overlay from './Overlay';
import Sheet from './Sheet';

export interface ShareSheetProps {
  visible: boolean;
  onCancel: () => void;
  style?: StyleProp<ViewStyle>;
  overlayStyle?: StyleProp<ViewStyle>;
}

const ShareSheet: React.FC<React.PropsWithChildren<ShareSheetProps>> = ({
  style = {},
  overlayStyle = {},
  visible,
  onCancel,
  children,
}) => {
  const backButtonHandler = React.useCallback(() => {
    if (visible) {
      onCancel();
      return true;
    }
    return false;
  }, [visible, onCancel]);

  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backButtonHandler);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backButtonHandler);
    };
  }, [backButtonHandler]);

  return (
    <Overlay visible={visible}>
      <View style={[styles.actionSheetContainer, overlayStyle]}>
        <TouchableOpacity style={styles.button} onPress={onCancel} />
        <Sheet visible={visible}>
          <View style={[styles.buttonContainer, style]}>{children}</View>
        </Sheet>
      </View>
    </Overlay>
  );
};

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

export default ShareSheet;
