//
//  EmailShare.m
//  RNShare
//
//  Created by Diseño Uno BBCL on 23-07-16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "EmailShare.h"
#import "RNShareUtils.h"


@implementation EmailShare


- (void)shareSingle:(NSDictionary *)options
    reject:(RCTPromiseRejectBlock)reject
    resolve:(RCTPromiseResolveBlock)resolve {

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
            reject(@"com.rnshare",@"Mail services are not available.",error);
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
        
        if ([options objectForKey:@"urls"] && [options objectForKey:@"urls"] != [NSNull null]) {
            NSArray *urlsArray = options[@"urls"];

            for (int i=0; i<urlsArray.count; i++) {
                NSURL *URL = [RCTConvert NSURL:urlsArray[i]];

                if (URL) {
                    BOOL isDataScheme = [URL.scheme.lowercaseString isEqualToString:@"data"];

                    if (URL.fileURL || isDataScheme) {
                        NSError *error;
                        NSData *data = [NSData dataWithContentsOfURL:URL
                                                            options:(NSDataReadingOptions)0
                                                            error:&error];
                        if (!data) {
                            reject(@"no data",@"no data",error);
                            return;
                        }

                        NSString *mime = @"application/octet-stream";
                        NSString *filename = @"file";

                        if([options objectForKey:@"type"]){
                            if(urlsArray.count == 1){
                                mime = [RCTConvert NSString:options[@"type"]];
                            } else {
                                RCTLogWarn(@"key 'type' is ignored when it has more than one url");
                            }
                        }

                        if([options objectForKey:@"filename"]){
                            if(urlsArray.count == 1){
                                filename = [RCTConvert NSString:options[@"filename"]];


                                // add extension just like Android for consistency
                                // file name should not include extension
                                if(URL.isFileURL){
                                    NSString *ext = [[URL.absoluteString componentsSeparatedByString:@"."] lastObject];

                                    filename = [filename stringByAppendingString: [@"." stringByAppendingString:ext]];
                                }
                                else if (isDataScheme){
                                    NSString *ext = [RNShareUtils getExtensionFromBase64: URL.absoluteString];

                                    if(ext){
                                        filename = [filename stringByAppendingString: [@"." stringByAppendingString:ext]];
                                    }
                                }
                            } else {
                                RCTLogWarn(@"key 'filename' is ignored when it has more than one url");
                            }
                        }
                        else if(URL.fileURL){
                            NSArray *parts = [URL.absoluteString componentsSeparatedByString:@"/"];
                            filename = [parts lastObject];
                        }

                        [mc addAttachmentData:data mimeType:mime fileName:filename];

                    } else {
                        // if not a file, just append it to message
                        message = [message stringByAppendingString: [@" " stringByAppendingString: [RCTConvert NSString:urlsArray[i]]] ];
                        [mc setMessageBody:message isHTML:NO];
                    }
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
            resolve(@[@true, @""]);
        });
    }
}

-(void)mailComposeController:(MFMailComposeViewController *)controller didFinishWithResult:(MFMailComposeResult)result error:(nullable NSError *)error
{
    dispatch_async(dispatch_get_main_queue(), ^{
        UIViewController *ctrl = RCTPresentedViewController();
        [ctrl dismissViewControllerAnimated:YES completion:NULL];
    });
}

@end
