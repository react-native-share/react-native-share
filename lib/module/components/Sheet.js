import * as React from 'react';
import { Animated } from 'react-native';
const DEFAULT_BOTTOM = -300;
const DEFAULT_ANIMATE_TIME = 300;
const Sheet = ({
  visible,
  children
}) => {
  const [bottom] = React.useState(new Animated.Value(DEFAULT_BOTTOM));
  React.useEffect(() => {
    return Animated.timing(bottom, {
      toValue: visible ? 0 : DEFAULT_BOTTOM,
      duration: DEFAULT_ANIMATE_TIME,
      useNativeDriver: false
    }).start();
  }, [visible, bottom]);
  return /*#__PURE__*/React.createElement(Animated.View, {
    style: {
      bottom
    }
  }, children);
};
export default Sheet;
//# sourceMappingURL=Sheet.js.map