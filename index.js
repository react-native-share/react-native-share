import ReactNative, {
    Platform,
    ActionSheetIOS,
    NativeModules
} from "react-native";

const RNShare = function (options) {
  return new Promise((resolve, reject) => {
    if (Platform.OS === "ios") {
      ActionSheetIOS.showShareActionSheetWithOptions(options, (error) => {
        return reject({ error: error });
      }, (success, activityType) => {
        if(success) {
          return resolve({
            app: activityType
          });
        } else {
          reject({ error: "User did not share" });
        }
      });
    } else {
      NativeModules.RNShare.open(options,(e) => {
        return reject({ error: e });
      });
    }
  });

}
module.exports = RNShare;
