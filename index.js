import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackAndroid,
  NativeModules,
  Platform,
  ActionSheetIOS,
  Clipboard,
  ToastAndroid
} from 'react-native';

import Overlay from './components/Overlay';
import Sheet from './components/Sheet';
import Button from './components/Button';

const styles = StyleSheet.create({
    actionSheetContainer: {
      flex: 1,
      paddingTop: 10,
      paddingBottom: 0,
      justifyContent: "flex-end",
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    buttonContainer: {
      overflow: 'hidden',
      backgroundColor: 'white',
      paddingBottom: 5,
      paddingTop: 5
    }
});

class RNShare {
  static open(options) {
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
          console.log("RNSHARE ERROR ", e)
          return reject({ error: e });
        },(e) => {
          console.log("RNSHARE OK")
          resolve({
            message: e
          });
        });
      }
    });
  }
  static shareSingle(options){
    console.log(options);
    return new Promise((resolve, reject) => {
      NativeModules.RNShare.shareSingle(options);
    });
  }
}
/*
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
        console.log("RNSHARE ERROR ", e)
        return reject({ error: e });
      },(e) => {
        console.log("RNSHARE OK")
        resolve({
          message: e
        });
      });
    }
  });
}
*/
class ShareSheet extends React.Component {
  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress',() => {
      if (this.props.visible) {
        this.props.onCancel();
        return true;
      }
      return false;
    });
  }
  render(){
    return (
      <Overlay visible={this.props.visible} {...this.props}>
        <View style={styles.actionSheetContainer}>
          <TouchableOpacity
              style={{flex:1}}
              onPress={this.props.onCancel}>

          </TouchableOpacity>
          <Sheet visible={this.props.visible}>
            <View style={styles.buttonContainer}>
              <Button
                iconSrc={require("./assets/ic_share_twitter.png")}
                onPress={()=>{
                  this.props.onCancel();
                  setTimeout(() => {
                    RNShare.shareSingle(Object.assign(this.props.options, {
                      "social": "twitter"
                    }));
                  },200);
                }}>Twitter</Button>
              <Button
                iconSrc={require("./assets/ic_share_facebook.png")}
                onPress={()=>{
                  this.props.onCancel();
                  setTimeout(() => {
                    RNShare.shareSingle(Object.assign(this.props.options, {
                      "social" : "facebook"
                    }));
                  },200);
                }}>Facebook</Button>
              <Button
                iconSrc={require("./assets/ic_share_whatsapp.png")}
                onPress={()=>{
                  this.props.onCancel();
                  setTimeout(() => {
                    RNShare(Object.assign(this.props.options, {
                      package: "com.whatsapp",
                      notFoundPackagePlaystore: "market://details?id=com.whatsapp",
                      notFoundPackageAppstore: "https://itunes.apple.com/us/app/whatsapp-messenger/id310633997"
                    } ))
                  },200);
                }}>Whatsapp</Button>
              <Button
                iconSrc={require("./assets/ic_share_google.png")}
                onPress={()=>{
                  this.props.onCancel();
                  setTimeout(() => {
                    RNShare(Object.assign(this.props.options, {
                      package: "com.google.android.apps.plus",
                      notFoundPackage: "https://plus.google.com/share?url={url}"
                    } ))
                  },200);
                }}>Google +</Button>
              <Button
                iconSrc={require("./assets/ic_share_correo.png")}
                onPress={()=>{
                  this.props.onCancel();
                  setTimeout(() => {
                    RNShare(Object.assign(this.props.options, {
                      package: "com.google.android.gm"
                    } ))
                  },200);
                }}>Email</Button>

              <Button
                iconSrc={require("./assets/ic_share_copiar_link.png")}
                onPress={()=>{
                  this.props.onCancel();
                  setTimeout(() => {
                    if(typeof this.props.options["url"] !== undefined) {
                      Clipboard.setString(this.props.options.url);
                      ToastAndroid.show('Link copiado al portapapeles', ToastAndroid.SHORT);
                    }
                  },200);
                }}>Copy Link</Button>
                {}
              <Button iconSrc={require("./assets/ic_share_mas.png")}
                onPress={()=>{
                  this.props.onCancel();
                  setTimeout(() => {
                    RNShare.open(this.props.options)
                  },200);
                }}>More</Button>
            </View>
          </Sheet>

        </View>
      </Overlay>
    )
  }
}


module.exports = RNShare;
module.exports.ShareSheet = ShareSheet;
