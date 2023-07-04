import { PermissionsAndroid } from 'react-native';

import NativeRNShare from '../../codegenSpec/NativeRNShare';
import { getAndroidVersion } from './platform';

export async function checkAndroidPermissionsForUrls(urls: string[]) {
  // Reference: https://github.com/react-native-share/react-native-share/pull/871
  if ((await Promise.all(urls.map((url) => NativeRNShare.isBase64File(url)))).includes(true)) {
    await checkExternalStoragePermission();
  }
}

async function checkExternalStoragePermission() {
  const { WRITE_EXTERNAL_STORAGE } = PermissionsAndroid.PERMISSIONS;

  const granted = await PermissionsAndroid.check(WRITE_EXTERNAL_STORAGE);

  if (!granted) {
    if (!isAndroidVersionAtLeastKitKat()) {
      const result = await PermissionsAndroid.request(WRITE_EXTERNAL_STORAGE);
      if (result !== PermissionsAndroid.RESULTS.GRANTED) {
        throw new Error('Write Permission not available');
      }
    }
  }
}

function isAndroidVersionAtLeastKitKat() {
  return getAndroidVersion() >= 19;
}
