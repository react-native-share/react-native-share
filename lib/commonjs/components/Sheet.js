"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const DEFAULT_BOTTOM = -300;
const DEFAULT_ANIMATE_TIME = 300;
const Sheet = ({
  visible,
  children
}) => {
  const [bottom] = React.useState(new _reactNative.Animated.Value(DEFAULT_BOTTOM));
  React.useEffect(() => {
    return _reactNative.Animated.timing(bottom, {
      toValue: visible ? 0 : DEFAULT_BOTTOM,
      duration: DEFAULT_ANIMATE_TIME,
      useNativeDriver: false
    }).start();
  }, [visible, bottom]);
  return /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    style: {
      bottom
    }
  }, children);
};
var _default = exports.default = Sheet;
//# sourceMappingURL=Sheet.js.map