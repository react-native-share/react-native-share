"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = checkPermissions;
var _android = require("./android");
var _platform = require("./platform");
/** Check if the passed in options require platform permission. If an error isn't thrown, no permission is required */
async function checkPermissions({
  url,
  urls
}) {
  if ((0, _platform.isAndroid)()) {
    if (url || urls) {
      const normalizedUrls = urls ?? (url ? [url] : []);
      await (0, _android.checkAndroidPermissionsForUrls)(normalizedUrls);
    }
  }
}
//# sourceMappingURL=checkPermissions.js.map