"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const DEFAULT_ANIMATE_TIME = 300;
const styles = _reactNative.StyleSheet.create({
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
  const [fadeAnim] = React.useState(new _reactNative.Animated.Value(0));
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
    return _reactNative.Animated.timing(fadeAnim, {
      toValue: visible ? 1 : 0,
      duration: DEFAULT_ANIMATE_TIME,
      useNativeDriver: false
    }).start(onAnimatedEnd);
  }, [visible, fadeAnim, onAnimatedEnd]);
  return /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    style: [overlayStyle, {
      opacity: fadeAnim
    }]
  }, children);
};
var _default = exports.default = Overlay;
//# sourceMappingURL=Overlay.js.map