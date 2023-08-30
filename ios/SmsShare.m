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
        
        NSURL *URL = [RCTConvert NSURL:options[@"url"]];
        if (URL) {
            BOOL isDataScheme = [URL.scheme.lowercaseString isEqualToString:@"data"];
    
            // Only handling data scheme urls here. To handle the case of URL.isFileURL
            // one could add a case similar to the process in EmailShare.m
            if (isDataScheme) {
                NSError *error;
                NSData *data = [NSData dataWithContentsOfURL:URL
                                                     options:(NSDataReadingOptions)0
                                                       error:&error];
                if (!data) {
                    reject(@"com.rnshare", @"No data", error);
                    return;
                }
    
                NSURL *filePath = [RNShareUtils getPathFromBase64:URL.absoluteString with:data fileName:@"file"];
                if (filePath) {
                    // public.image typeIdentifier works for both images and files
                    [mc addAttachmentData:data typeIdentifier:@"public.image" filename:filePath.absoluteString];
                }
            } else {
                // if not a file, just append URL to message
                NSString *urlString = [RCTConvert NSString:options[@"url"]];
                message = [message stringByAppendingString: [@" " stringByAppendingString:  urlString]];
                [mc setBody:message];
            }
        }


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
