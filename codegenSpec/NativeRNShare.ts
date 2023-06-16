import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
    readonly getConstants: () => {};
    open:(options:Object, failureCallback:() => void, successCallback:() => void) => void;
    shareSingle:(options:Object, failureCallback:() => void, successCallback:() => void) => void;
    isPackageInstalled:(packagename:string, failureCallback:() => void, successCallback:() => void) => void;
    isBase64File:(url:string, failureCallback:() => void, successCallback:() => void) => void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RNShare');