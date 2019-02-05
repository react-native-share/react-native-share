// @flow

import * as React from 'react';
import { Animated, StyleSheet } from 'react-native';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

const DEFAULT_ANIMATE_TIME = 300;
const styles = StyleSheet.create({
  fullOverlay: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    position: 'absolute',
  },
  emptyOverlay: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    position: 'absolute',
  },
});

type Props = {
  visible: boolean,
  onCancel: () => void,
  children: React.Node,
};

type State = {
  fadeAnim: Object,
  overlayStyle: ViewStyleProp,
};

class Overlay extends React.Component<Props, State> {
  state = {
    fadeAnim: new Animated.Value(0),
    overlayStyle: styles.emptyOverlay,
  };

  onAnimatedEnd() {
    if (!this.props.visible) {
      this.setState({ overlayStyle: styles.emptyOverlay });
    }
  }
  UNSAFE_componentWillReceiveProps(newProps: Props) {
    if (newProps.visible) {
      this.setState({ overlayStyle: styles.fullOverlay });
    }
    return Animated.timing(this.state.fadeAnim, {
      toValue: newProps.visible ? 1 : 0,
      duration: DEFAULT_ANIMATE_TIME,
    }).start(this.onAnimatedEnd.bind(this));
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
