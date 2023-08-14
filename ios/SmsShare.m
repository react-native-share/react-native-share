#import "SmsShare.h"
#import "RNShareUtils.h"


@implementation SmsShare


- (void)shareSingle:(NSDictionary *)options
    reject:(RCTPromiseRejectBlock)reject
    resolve:(RCTPromiseResolveBlock)resolve {

    if ([options objectForKey:@"message"] && [options objectForKey:@"message"] != [NSNull null]) {

        NSString *message = [RCTConvert NSString:options[@"message"]];
        NSString *recipient = [RCTConvert NSString:options[@"recipient"]];
        
        if (![MFMessageComposeViewController canSendText]) {
            NSString *errorMessage = @"Sms services is not available.";
            NSDictionary *userInfo = @{NSLocalizedFailureReasonErrorKey: NSLocalizedString(errorMessage, nil)};
            NSError *error = [NSError errorWithDomain:@"com.rnshare" code:1 userInfo:userInfo];
            reject(@"com.rnshare", errorMessage, error);
            return;
        }

        MFMessageComposeViewController *mc = [[MFMessageComposeViewController alloc] init];
        mc.messageComposeDelegate = self;

        NSMutableArray *recipients = [[NSMutableArray alloc] init];
        if (![recipient  isEqual: @""]) {
            [recipients addObject:recipient];
        }
        mc.recipients = recipients;
        mc.body = message;

        dispatch_async(dispatch_get_main_queue(), ^{
            UIViewController *ctrl = RCTPresentedViewController();
            [ctrl presentViewController:mc animated:YES completion:NULL];
            resolve(@[@true, @""]);
        });
    }
}

- (void)messageComposeViewController:(MFMessageComposeViewController *)controller
                 didFinishWithResult:(MessageComposeResult)result {
    dispatch_async(dispatch_get_main_queue(), ^{
        UIViewController *ctrl = RCTPresentedViewController();
        [ctrl dismissViewControllerAnimated:YES completion:NULL];
    });
}

@end
