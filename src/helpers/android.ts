import { PermissionsAndroid } from 'react-native';

import NativeRNShare from '../../codegenSpec/NativeRNShare';
import { getAndroidVersion } from './platform';

export async function checkAndroidPermissionsForUrls(urls: string[]) {
  // Reference: https://github.com/react-native-share/react-native-share/pull/871
  const hasBase64File = (await Promise.all(urls.map(NativeRNShare.isBase64File))).includes(true);
  if (hasBase64File) await checkExternalStoragePermission();
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
    } else {
      // Concern: What should we do in this situation? Is this even possible?
    }
  }
}

function isAndroidVersionAtLeastKitKat() {
  return getAndroidVersion() >= 19;
}
