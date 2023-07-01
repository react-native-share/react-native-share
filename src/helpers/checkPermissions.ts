import { ShareOptions } from '../types';
import { checkAndroidPermissionsForUrls } from './android';
import { isAndroid } from './platform';

/** Check if the passed in options require platform permission. If an error isn't thrown, no permission is required */
export default async function checkPermissions({ url, urls }: Pick<ShareOptions, 'url' | 'urls'>) {
  if (isAndroid()) {
    if (url || urls) {
      const normalizedUrls = urls ?? (url ? [url] : []);
      await checkAndroidPermissionsForUrls(normalizedUrls);
    }
  }
}
