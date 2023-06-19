import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
    readonly getConstants: () => {};
    open:(options:Object) => Promise<{success:boolean, message:string}>;
    shareSingle:(options:Object) => Promise<{success:boolean, message:string}>;
    isPackageInstalled:(packagename:string) => Promise<boolean>;
    isBase64File:(url:string) => Promise<boolean>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RNShare');