#import <MessageUI/MessageUI.h>
#import "RNShare.h"
#import "RCTConvert.h"
#import "RCTLog.h"
#import "RCTUtils.h"
#import "RCTBridge.h"
#import "RCTUIManager.h"
#import "FacebookShare.h"

@implementation RNShare
- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(shareSingle:(NSDictionary *)options
                  failureCallback:(RCTResponseErrorBlock)failureCallback
                  successCallback:(RCTResponseSenderBlock)successCallback)
{
    
    NSString *social = [RCTConvert NSString:options[@"social"]];
    if (social) {
        NSLog(social);
        if([social isEqualToString:@"facebook"]) {
            NSLog(@"TRY OPEN FACEBOOK");
            FacebookShare *fbCtl = [FacebookShare new];
            [fbCtl shareSingle:options failureCallback: failureCallback successCallback: successCallback];
        }
    } else {
        RCTLogError(@"No exists social key");
        return;
    }
}

@end
