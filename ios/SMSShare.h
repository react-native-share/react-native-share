#import <UIKit/UIKit.h>

#import <React/RCTBridgeModule.h>

@interface SMSShare : NSObject <RCTBridgeModule>

- (void)shareSingle:(NSDictionary *)options failureCallback:(RCTResponseErrorBlock)failureCallback successCallback:(RCTResponseSenderBlock)successCallback;

@end
