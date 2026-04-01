import { isIOS } from './platform';
export function normalizeShareOpenOptions({
  ...options
}) {
  if (isIOS()) {
    // Backward compatibility with { Share } from react-native
    if (options.url && !options.urls) {
      options.urls = [options.url];
      delete options.url;

      // Reference: https://github.com/react-native-share/react-native-share/pull/1396/files#diff-2d42a82ccc4ec42d9bfea630535ec2b757bd7a90b96d33d5d5433da17f4bdf79R208
      if (options.filename && !options.filenames) {
        options.filenames = [options.filename];
      }
    }
  }
  options.failOnCancel = options.failOnCancel ?? true;
  return options;
}
export function normalizeSingleShareOptions({
  ...options
}) {
  if (options.url) options.urls = [options.url];
  return options;
}
//# sourceMappingURL=options.js.map