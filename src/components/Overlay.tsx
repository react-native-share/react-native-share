import * as React from 'react';
import { Animated, Easing, StyleProp, StyleSheet, ViewStyle } from 'react-native';

const DEFAULT_ANIMATE_TIME = 300;
const styles = StyleSheet.create({
  emptyOverlay: {
    backgroundColor: 'transparent',
    height: 0,
    position: 'absolute',
    width: 0,
  },
  fullOverlay: {
    backgroundColor: 'transparent',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

export interface OverlayProps {
  visible: boolean;
}

const Overlay: React.FC<React.PropsWithChildren<OverlayProps>> = ({ visible, children }) => {
  const [fadeAnim] = React.useState(() => new Animated.Value(0));
  const [overlayStyle, setOverlayStyle] = React.useState<StyleProp<ViewStyle>>(styles.emptyOverlay);

  React.useEffect(() => {
    if (visible) {
      setOverlayStyle(styles.fullOverlay);
    }
    let active = true;
    const animation = Animated.timing(fadeAnim, {
      toValue: visible ? 1 : 0,
      duration: DEFAULT_ANIMATE_TIME,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });
    animation.start(({ finished }) => {
      if (active && finished && !visible) setOverlayStyle(styles.emptyOverlay);
    });
    return () => {
      active = false;
      animation.stop();
    };
  }, [visible, fadeAnim]);

  return (
    <Animated.View
      style={[overlayStyle, { opacity: fadeAnim }]}
      pointerEvents={visible ? 'auto' : 'none'}
      accessibilityElementsHidden={!visible}
      importantForAccessibility={visible ? 'auto' : 'no-hide-descendants'}
      accessibilityViewIsModal={visible}
    >
      {children}
    </Animated.View>
  );
};

export default Overlay;
