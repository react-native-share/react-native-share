import * as React from 'react';
import { Animated } from 'react-native';

const DEFAULT_BOTTOM = -300;
const DEFAULT_ANIMATE_TIME = 300;

export interface SheetProps {
  visible: boolean;
}

const Sheet: React.FC<React.PropsWithChildren<SheetProps>> = ({ visible, children }) => {
  const [bottom] = React.useState(new Animated.Value(DEFAULT_BOTTOM));

  React.useEffect(() => {
    return Animated.timing(bottom, {
      toValue: visible ? 0 : DEFAULT_BOTTOM,
      duration: DEFAULT_ANIMATE_TIME,
      useNativeDriver: false,
    }).start();
  }, [visible, bottom]);

  return <Animated.View style={{ bottom }}>{children}</Animated.View>;
};

export default Sheet;
