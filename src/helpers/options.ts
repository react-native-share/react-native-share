import { ShareOptions, ShareSingleOptions } from '../types';
import { isIOS } from './platform';

export function normalizeShareOpenOptions({ ...options }: ShareOptions) {
  if (isIOS()) {
    // Backward compatibility with { Share } from react-native
    if (options.url && !options.urls) {
      options.urls = [options.url];
      delete options.url;

      // Concern: I could be wrong but there seems to be an implicit association between url and filename in the native code.
      // I don't understand object-c but it looks like we're using urls index to look up a filename. What happens if the length of urls doesn't match the length of filenames? Maybe we can throw an error.
      // Reference: https://github.com/react-native-share/react-native-share/pull/1396/files#diff-2d42a82ccc4ec42d9bfea630535ec2b757bd7a90b96d33d5d5433da17f4bdf79R208
      if (options.filename && !options.filenames) {
        options.filenames = [options.filename];
      }
    }
  }

  return options;
}

export function normalizeSingleShareOptions({ ...options }: ShareSingleOptions) {
  if (options.url) options.urls = [options.url];
  return options;
}
