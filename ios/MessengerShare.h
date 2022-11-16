#import <UIKit/UIKit.h>

#import <React/RCTBridgeModule.h>

@interface MessengerShare : NSObject <RCTBridgeModule>

- (void)shareSingle:(NSDictionary *)options failureCallback:(RCTResponseErrorBlock)failureCallback successCallback:(RCTResponseSenderBlock)successCallback;
@end
