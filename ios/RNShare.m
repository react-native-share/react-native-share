#import <MessageUI/MessageUI.h>
#import "RNShare.h"
#import "RCTConvert.h"
#import "RCTLog.h"
#import "RCTUtils.h"
#import "RCTBridge.h"
#import "RCTUIManager.h"
#import "GenericShare.h"
#import "WhatsAppShare.h"
#import "GooglePlusShare.h"
#import "EmailShare.h"

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
            GenericShare *shareCtl = [[GenericShare alloc] init];
            [shareCtl shareSingle:options failureCallback: failureCallback successCallback: successCallback serviceType: SLServiceTypeFacebook];
        } else if([social isEqualToString:@"twitter"]) {
            NSLog(@"TRY OPEN Twitter");
            GenericShare *shareCtl = [[GenericShare alloc] init];
            [shareCtl shareSingle:options failureCallback: failureCallback successCallback: successCallback serviceType: SLServiceTypeTwitter];
        } else if([social isEqualToString:@"googleplus"]) {
            NSLog(@"TRY OPEN google plus");
            GooglePlusShare *shareCtl = [[GooglePlusShare alloc] init];
            [shareCtl shareSingle:options failureCallback: failureCallback successCallback: successCallback];
        } else if([social isEqualToString:@"whatsapp"]) {
            NSLog(@"TRY OPEN whatsapp");
            
            WhatsAppShare *shareCtl = [[WhatsAppShare alloc] init];
            [shareCtl shareSingle:options failureCallback: failureCallback successCallback: successCallback];
        } else if([social isEqualToString:@"email"]) {
            NSLog(@"TRY OPEN email");
            EmailShare *shareCtl = [[EmailShare alloc] init];
            [shareCtl shareSingle:options failureCallback: failureCallback successCallback: successCallback];
        }
    } else {
        RCTLogError(@"No exists social key");
        return;
    }
}

@end
