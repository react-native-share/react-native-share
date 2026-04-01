"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _Overlay = _interopRequireDefault(require("./Overlay"));
var _Sheet = _interopRequireDefault(require("./Sheet"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ShareSheet = ({
  style = {},
  overlayStyle = {},
  visible,
  onCancel,
  children
}) => {
  const backButtonHandler = React.useCallback(() => {
    if (visible) {
      onCancel();
      return true;
    }
    return false;
  }, [visible, onCancel]);
  React.useEffect(() => {
    const subscription = _reactNative.BackHandler.addEventListener('hardwareBackPress', backButtonHandler);
    return () => {
      subscription.remove();
    };
  }, [backButtonHandler]);
  return /*#__PURE__*/React.createElement(_Overlay.default, {
    visible: visible
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.actionSheetContainer, overlayStyle]
  }, /*#__PURE__*/React.createElement(_reactNative.TouchableOpacity, {
    style: styles.button,
    onPress: onCancel
  }), /*#__PURE__*/React.createElement(_Sheet.default, {
    visible: visible
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.buttonContainer, style]
  }, children))));
};
const styles = _reactNative.StyleSheet.create({
  actionSheetContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 0,
    paddingTop: 10
  },
  buttonContainer: {
    backgroundColor: 'white',
    overflow: 'hidden',
    paddingBottom: 5,
    paddingTop: 5
  },
  button: {
    flex: 1
  }
});
var _default = exports.default = ShareSheet;
//# sourceMappingURL=ShareSheet.js.map