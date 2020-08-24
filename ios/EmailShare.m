//
//  EmailShare.m
//  RNShare
//
//  Created by Diseño Uno BBCL on 23-07-16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "EmailShare.h"


@implementation EmailShare
- (void)shareSingle:(NSDictionary *)options
    failureCallback:(RCTResponseErrorBlock)failureCallback
    successCallback:(RCTResponseSenderBlock)successCallback {

    NSLog(@"Try open view");

    if ([options objectForKey:@"message"] && [options objectForKey:@"message"] != [NSNull null]) {

        NSString *subject = @"";
        NSString *message = @"";
        NSString *email = @"";
        
        if (![MFMailComposeViewController canSendMail]) {
            NSLog(@"Mail services are not available.");
            NSString *errorMessage = @"Mail services are not available.";
            NSDictionary *userInfo = @{NSLocalizedFailureReasonErrorKey: NSLocalizedString(errorMessage, nil)};
            NSError *error = [NSError errorWithDomain:@"com.rnshare" code:1 userInfo:userInfo];
            failureCallback(error);
           return;
        }
        
        MFMailComposeViewController *mc = [[MFMailComposeViewController alloc] init];
        
        mc.mailComposeDelegate = self;

        if ([options objectForKey:@"email"] && [options objectForKey:@"email"] != [NSNull null]) {
            email = [RCTConvert NSString:options[@"email"]];
        }

        if ([options objectForKey:@"subject"] && [options objectForKey:@"subject"] != [NSNull null]) {
            subject = [RCTConvert NSString:options[@"subject"]];
        }

        message = [RCTConvert NSString:options[@"message"]];
        
        [mc setToRecipients:@[email]];
        [mc setSubject:subject];
        [mc setMessageBody:message isHTML:NO];
        
        if ([options objectForKey:@"url"] && [options objectForKey:@"url"] != [NSNull null]) {
            
            NSURL *URL = [RCTConvert NSURL:options[@"url"]];
            
            if (URL) {
                if (URL.fileURL || [URL.scheme.lowercaseString isEqualToString:@"data"]) {
                    NSError *error;
                    NSData *data = [NSData dataWithContentsOfURL:URL
                                                         options:(NSDataReadingOptions)0
                                                           error:&error];
                    if (!data) {
                        failureCallback(error);
                        return;
                    }
                    
                    NSString *mime = @"application/octet-stream";
                    NSString *filename = @"file";
                    
                    if([options objectForKey:@"type"]){
                        mime = [RCTConvert NSString:options[@"type"]];
                    }
                    
                    if([options objectForKey:@"filename"]){
                        filename = [RCTConvert NSString:options[@"filename"]];
                    }
                    else if(URL.fileURL){
                        NSArray *parts = [URL.absoluteString componentsSeparatedByString:@"/"];
                        filename = [parts lastObject];
                    }
                    
                    [mc addAttachmentData:data mimeType:mime fileName:filename];

                } else {
                    // if not a file, just append it to message
                    message = [message stringByAppendingString: [@" " stringByAppendingString: [RCTConvert NSString:options[@"url"]]] ];
                }
            }
                   
        }
        
        dispatch_async(dispatch_get_main_queue(), ^{
            UIViewController *ctrl = RCTPresentedViewController();
          
            // Present mail view controller on screen
            [ctrl presentViewController:mc animated:YES completion:NULL];
            
            // We could fire this either here or
            // on the finish delegate.
            // For now, call it here for consistency with
            // GenericShare.shareSingle
            successCallback(@[]);
        });
    }
}

-(void)mailComposeController:(MFMailComposeViewController *)controller didFinishWithResult:(MFMailComposeResult)result error:(nullable NSError *)error
{
// TODO: Do something with this
//    switch (result)
//    {
//        case MFMailComposeResultCancelled:
//            NSLog(@"Mail cancelled");
//            break;
//        case MFMailComposeResultSaved:
//            NSLog(@"Mail saved");
//            break;
//        case MFMailComposeResultSent:
//            NSLog(@"Mail sent");
//            break;
//        case MFMailComposeResultFailed:
//            NSLog(@"Mail sent failure: %@", [error localizedDescription]);
//            break;
//        default:
//            break;
//    }
     
    dispatch_async(dispatch_get_main_queue(), ^{
        UIViewController *ctrl = RCTPresentedViewController();
        [ctrl dismissViewControllerAnimated:YES completion:NULL];
    });
}

@end
