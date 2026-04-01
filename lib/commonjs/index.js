"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Button", {
  enumerable: true,
  get: function () {
    return _Button.default;
  }
});
Object.defineProperty(exports, "Overlay", {
  enumerable: true,
  get: function () {
    return _Overlay.default;
  }
});
Object.defineProperty(exports, "ShareAsset", {
  enumerable: true,
  get: function () {
    return _types.ShareAsset;
  }
});
Object.defineProperty(exports, "ShareSheet", {
  enumerable: true,
  get: function () {
    return _ShareSheet.default;
  }
});
Object.defineProperty(exports, "Sheet", {
  enumerable: true,
  get: function () {
    return _Sheet.default;
  }
});
Object.defineProperty(exports, "Social", {
  enumerable: true,
  get: function () {
    return _types.Social;
  }
});
exports.default = void 0;
var _NativeRNShare = _interopRequireDefault(require("./codegenSpec/NativeRNShare"));
var _Overlay = _interopRequireDefault(require("./components/Overlay"));
var _Sheet = _interopRequireDefault(require("./components/Sheet"));
var _Button = _interopRequireDefault(require("./components/Button"));
var _ShareSheet = _interopRequireDefault(require("./components/ShareSheet"));
var _checkPermissions = _interopRequireDefault(require("./helpers/checkPermissions"));
var _types = require("./types");
var _platform = require("./helpers/platform");
var _options = require("./helpers/options");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const RNShare = {
  Button: _Button.default,
  ShareSheet: _ShareSheet.default,
  Overlay: _Overlay.default,
  Sheet: _Sheet.default,
  Social: {
    FACEBOOK: _NativeRNShare.default.getConstants().FACEBOOK || _types.Social.Facebook,
    FACEBOOK_STORIES: _NativeRNShare.default.getConstants().FACEBOOKSTORIES || _types.Social.FacebookStories,
    PAGESMANAGER: _NativeRNShare.default.getConstants().PAGESMANAGER || _types.Social.Pagesmanager,
    TWITTER: _NativeRNShare.default.getConstants().TWITTER || _types.Social.Twitter,
    WHATSAPP: _NativeRNShare.default.getConstants().WHATSAPP || _types.Social.Whatsapp,
    WHATSAPPBUSINESS: _NativeRNShare.default.getConstants().WHATSAPPBUSINESS || _types.Social.Whatsappbusiness,
    INSTAGRAM: _NativeRNShare.default.getConstants().INSTAGRAM || _types.Social.Instagram,
    INSTAGRAM_STORIES: _NativeRNShare.default.getConstants().INSTAGRAMSTORIES || _types.Social.InstagramStories,
    GOOGLEPLUS: _NativeRNShare.default.getConstants().GOOGLEPLUS || _types.Social.Googleplus,
    EMAIL: _NativeRNShare.default.getConstants().EMAIL || _types.Social.Email,
    PINTEREST: _NativeRNShare.default.getConstants().PINTEREST || _types.Social.Pinterest,
    LINKEDIN: _NativeRNShare.default.getConstants().LINKEDIN || _types.Social.Linkedin,
    SMS: _NativeRNShare.default.getConstants().SMS || _types.Social.Sms,
    TELEGRAM: _NativeRNShare.default.getConstants().TELEGRAM || _types.Social.Telegram,
    MESSENGER: _NativeRNShare.default.getConstants().MESSENGER || _types.Social.Messenger,
    SNAPCHAT: _NativeRNShare.default.getConstants().SNAPCHAT || _types.Social.Snapchat,
    VIBER: _NativeRNShare.default.getConstants().VIBER || _types.Social.Viber,
    DISCORD: _NativeRNShare.default.getConstants().DISCORD || _types.Social.Discord
  },
  async open(options) {
    await (0, _checkPermissions.default)(options);
    options = (0, _options.normalizeShareOpenOptions)(options);
    const result = await _NativeRNShare.default.open(options);
    if (!result.success) {
      if (options.failOnCancel) {
        throw new Error('User did not share');
      }
      const dismissedResult = {
        dismissedAction: true,
        success: result.success,
        message: result.message
      };
      return dismissedResult;
    }
    return result;
  },
  async shareSingle(options) {
    if (!(0, _platform.isAndroid)() && !(0, _platform.isIOS)()) throw new Error('Not implemented');
    if (options.social === RNShare.Social.INSTAGRAM_STORIES && !options.appId) {
      throw new Error('To share to Instagram Stories you need to provide appId');
    }
    await (0, _checkPermissions.default)(options);
    options = (0, _options.normalizeSingleShareOptions)(options);
    const {
      success,
      message
    } = await _NativeRNShare.default.shareSingle(options);
    const result = {
      success: Boolean(success),
      message
    };
    return result;
  },
  async isPackageInstalled(packageName) {
    if (!(0, _platform.isAndroid)()) throw new Error('Not implemented');
    const isInstalled = await _NativeRNShare.default.isPackageInstalled(packageName);
    const result = {
      isInstalled,
      message: 'Package is Installed'
    };
    return result;
  }
};
var _default = exports.default = RNShare;
//# sourceMappingURL=index.js.map