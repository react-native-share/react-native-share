import { Platform } from 'react-native';

export function isIOS() {
  return 'ios' === Platform.OS;
}

export function isAndroid() {
  return 'android' === Platform.OS;
}

export function getAndroidVersion() {
  const version = Platform.Version;
  return typeof version === 'string' ? parseInt(version, 10) : version;
}
