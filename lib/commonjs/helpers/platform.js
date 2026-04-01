"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAndroidVersion = getAndroidVersion;
exports.isAndroid = isAndroid;
exports.isIOS = isIOS;
var _reactNative = require("react-native");
function isIOS() {
  return 'ios' === _reactNative.Platform.OS;
}
function isAndroid() {
  return 'android' === _reactNative.Platform.OS;
}
function getAndroidVersion() {
  const version = _reactNative.Platform.Version;
  return typeof version === 'string' ? parseInt(version, 10) : version;
}
//# sourceMappingURL=platform.js.map