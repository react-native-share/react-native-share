//@import UIKit;

#if __has_include(<React/RCTBridgeModule.h>)
#import <React/RCTBridgeModule.h>
#elif __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import "React/RCTBridgeModule.h"
#endif

#if RCT_NEW_ARCH_ENABLED
#import <RNShareSpec/RNShareSpec.h>
#endif

@interface RNShare : NSObject <RCTBridgeModule, UIDocumentPickerDelegate>
@end

#if RCT_NEW_ARCH_ENABLED
@interface RNShare () <NativeRNShareSpec, UIDocumentPickerDelegate>
@end
#endif
