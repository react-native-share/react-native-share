import { ShareOptions } from '../types';
/** Check if the passed in options require platform permission. If an error isn't thrown, no permission is required */
export default function checkPermissions({ url, urls }: Pick<ShareOptions, 'url' | 'urls'>): Promise<void>;
//# sourceMappingURL=checkPermissions.d.ts.map