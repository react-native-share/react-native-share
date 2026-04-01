"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkAndroidPermissionsForUrls = checkAndroidPermissionsForUrls;
var _reactNative = require("react-native");
var _NativeRNShare = _interopRequireDefault(require("../codegenSpec/NativeRNShare"));
var _platform = require("./platform");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
async function checkAndroidPermissionsForUrls(urls) {
  // Reference: https://github.com/react-native-share/react-native-share/pull/871
  if ((await Promise.all(urls.map(url => _NativeRNShare.default.isBase64File(url)))).includes(true)) {
    await checkExternalStoragePermission();
  }
}
async function checkExternalStoragePermission() {
  const {
    WRITE_EXTERNAL_STORAGE
  } = _reactNative.PermissionsAndroid.PERMISSIONS;
  const granted = await _reactNative.PermissionsAndroid.check(WRITE_EXTERNAL_STORAGE);
  if (!granted) {
    if (!isAndroidVersionAtLeastKitKat()) {
      const result = await _reactNative.PermissionsAndroid.request(WRITE_EXTERNAL_STORAGE);
      if (result !== _reactNative.PermissionsAndroid.RESULTS.GRANTED) {
        throw new Error('Write Permission not available');
      }
    }
  }
}
function isAndroidVersionAtLeastKitKat() {
  return (0, _platform.getAndroidVersion)() >= 19;
}
//# sourceMappingURL=android.js.map