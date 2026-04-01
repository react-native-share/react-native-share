"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Button = ({
  buttonStyle,
  onPress,
  iconSrc,
  textStyle,
  children
}) => /*#__PURE__*/React.createElement(_reactNative.TouchableOpacity, {
  activeOpacity: 0.5,
  style: [styles.button, buttonStyle],
  onPress: onPress
}, /*#__PURE__*/React.createElement(_reactNative.Image, {
  style: styles.icon,
  source: iconSrc
}), /*#__PURE__*/React.createElement(_reactNative.Text, {
  style: [styles.buttonText, textStyle]
}, children));
var _default = exports.default = Button;
const styles = _reactNative.StyleSheet.create({
  button: {
    backgroundColor: 'white',
    flexDirection: 'row',
    height: 50,
    padding: 10
  },
  buttonText: {
    color: '#2c2c2c',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    textAlignVertical: 'center'
  },
  icon: {
    height: 28,
    marginLeft: 10,
    marginRight: 30,
    width: 28
  }
});
//# sourceMappingURL=Button.js.map