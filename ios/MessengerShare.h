#import <UIKit/UIKit.h>

#import <React/RCTBridgeModule.h>

@interface MessengerShare : NSObject <RCTBridgeModule>

- (void)shareSingle:(NSDictionary *)options reject:(RCTPromiseRejectBlock)reject resolve:(RCTPromiseResolveBlock)resolve;
@end
