import * as React from 'react';
import { Animated, StyleSheet } from 'react-native';
const DEFAULT_ANIMATE_TIME = 300;
const styles = StyleSheet.create({
  emptyOverlay: {
    backgroundColor: 'transparent',
    height: 0,
    position: 'absolute',
    width: 0
  },
  fullOverlay: {
    backgroundColor: 'transparent',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0
  }
});
const Overlay = ({
  visible,
  children
}) => {
  const [fadeAnim] = React.useState(new Animated.Value(0));
  const [overlayStyle, setOverlayStyle] = React.useState(styles.emptyOverlay);
  const onAnimatedEnd = React.useCallback(() => {
    if (!visible) {
      setOverlayStyle(styles.emptyOverlay);
    }
  }, [visible]);
  React.useEffect(() => {
    if (visible) {
      setOverlayStyle(styles.fullOverlay);
    }
    return Animated.timing(fadeAnim, {
      toValue: visible ? 1 : 0,
      duration: DEFAULT_ANIMATE_TIME,
      useNativeDriver: false
    }).start(onAnimatedEnd);
  }, [visible, fadeAnim, onAnimatedEnd]);
  return /*#__PURE__*/React.createElement(Animated.View, {
    style: [overlayStyle, {
      opacity: fadeAnim
    }]
  }, children);
};
export default Overlay;
//# sourceMappingURL=Overlay.js.map