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
  cancelAccessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
  overlayStyle?: StyleProp<ViewStyle>;
}

const ShareSheet: React.FC<React.PropsWithChildren<ShareSheetProps>> = ({
  style = {},
  overlayStyle = {},
  visible,
  onCancel,
  cancelAccessibilityLabel = 'Cancel sharing',
  children,
}) => {
  React.useEffect(() => {
    if (!visible) return;
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      onCancel();
      return true;
    });
    return () => {
      subscription.remove();
    };
  }, [visible, onCancel]);

  return (
    <Overlay visible={visible}>
      <View style={[styles.actionSheetContainer, overlayStyle]} onAccessibilityEscape={onCancel}>
        <TouchableOpacity
          style={styles.button}
          onPress={onCancel}
          accessibilityRole="button"
          accessibilityLabel={cancelAccessibilityLabel}
        />
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
