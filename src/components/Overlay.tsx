import * as React from 'react';
import { Animated, StyleProp, StyleSheet, ViewStyle } from 'react-native';

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

interface State {
  fadeAnim: Animated.Value;
  overlayStyle: StyleProp<ViewStyle>;
}

class Overlay extends React.Component<OverlayProps, State> {
  state = {
    fadeAnim: new Animated.Value(0),
    overlayStyle: styles.emptyOverlay,
  };

  UNSAFE_componentWillReceiveProps(newProps: OverlayProps) {
    if (newProps.visible) {
      this.setState({ overlayStyle: styles.fullOverlay });
    }
    return Animated.timing(this.state.fadeAnim, {
      toValue: newProps.visible ? 1 : 0,
      duration: DEFAULT_ANIMATE_TIME,
      useNativeDriver: false,
    }).start(this.onAnimatedEnd.bind(this));
  }

  onAnimatedEnd() {
    if (!this.props.visible) {
      this.setState({ overlayStyle: styles.emptyOverlay });
    }
  }

  render() {
    return (
      <Animated.View style={[this.state.overlayStyle, { opacity: this.state.fadeAnim }]}>
        {this.props.children}
      </Animated.View>
    );
  }
}

export default Overlay;
