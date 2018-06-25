import React from 'react';
import {Animated} from 'react-native';

const DEFAULT_BOTTOM = -300;
const DEFAULT_ANIMATE_TIME = 300;

export default class extends React.Component {
  state = {
    bottom: new Animated.Value(DEFAULT_BOTTOM)
  };

  componentWillReceiveProps(newProps) {
    return Animated.timing(this.state.bottom, {
      toValue: newProps.visible ? 0 : DEFAULT_BOTTOM,
      duration: DEFAULT_ANIMATE_TIME
    }).start();
  }

  render() {
    return (
      <Animated.View style={{bottom: this.state.bottom}}>
        {this.props.children}
      </Animated.View>
    );
  }
}
