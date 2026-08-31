import * as React from 'react';
import { AccessibilityInfo, Animated, Easing } from 'react-native';

const DEFAULT_OFFSET = 300;
const DEFAULT_ANIMATE_TIME = 300;

export interface SheetProps {
  visible: boolean;
}

const Sheet: React.FC<React.PropsWithChildren<SheetProps>> = ({ visible, children }) => {
  const [offset] = React.useState(() => new Animated.Value(DEFAULT_OFFSET));
  const [reduceMotion, setReduceMotion] = React.useState(true);

  React.useEffect(() => {
    let initialQueryPending = true;
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', (enabled) => {
      initialQueryPending = false;
      setReduceMotion(enabled);
    });
    AccessibilityInfo.isReduceMotionEnabled()
      .then((enabled) => {
        if (initialQueryPending) setReduceMotion(enabled);
        return null;
      })
      .catch(() => {
        // Keep motion disabled if the platform preference cannot be read.
      });
    return () => {
      initialQueryPending = false;
      subscription.remove();
    };
  }, []);

  React.useEffect(() => {
    const animation = Animated.timing(offset, {
      toValue: visible ? 0 : DEFAULT_OFFSET,
      duration: reduceMotion ? 0 : DEFAULT_ANIMATE_TIME,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });
    animation.start();
    return () => animation.stop();
  }, [visible, offset, reduceMotion]);

  return (
    <Animated.View
      style={{ transform: [{ translateY: offset }] }}
      pointerEvents={visible ? 'auto' : 'none'}
      accessibilityElementsHidden={!visible}
      importantForAccessibility={visible ? 'auto' : 'no-hide-descendants'}
    >
      {children}
    </Animated.View>
  );
};

export default Sheet;
