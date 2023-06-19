import { Platform, PermissionsAndroid } from 'react-native';

import NativeRNShare from '../../codegenSpec/NativeRNShare';

import { ShareOptions } from '../types';

const ANDROID_KIT_KAT_SDK_VERSION = 19;
const androidPermissionRequestRequired =
  (typeof Platform.Version === 'string' ? parseInt(Platform.Version, 10) : Platform.Version) <
  ANDROID_KIT_KAT_SDK_VERSION;

const requireAndAskPermissions = async (
  options: Pick<ShareOptions, 'url' | 'urls'>,
): Promise<boolean | never> => {
  if ((options.url || options.urls) && Platform.OS === 'android') {
    const urls: string[] = options.urls || (options.url ? [options.url] : []);
    try {
      const resultArr = await Promise.all(
        urls.map(
          (url) =>
            new Promise((resolve, reject) => {
              NativeRNShare.isBase64File(url)
                .then((isBase64: boolean) => {
                  resolve(isBase64);
                })
                .catch((error: Error) => {
                  reject(error);
                });
            }),
        ),
      );

      const requirePermission = resultArr.includes(true);
      if (!requirePermission) {
        return Promise.resolve(true);
      }
      const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (hasPermission) {
        return Promise.resolve(true);
      }

      if (androidPermissionRequestRequired) {
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        if (result === PermissionsAndroid.RESULTS.GRANTED) {
          return Promise.resolve(true);
        }
        throw new Error('Write Permission not available');
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }
  return Promise.resolve(true);
};

export default requireAndAskPermissions;
