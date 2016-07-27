//
//  FacebookShare.m
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
        NSString *text = [RCTConvert NSString:options[@"message"]];
        
        if ([MFMailComposeViewController canSendMail]) {
            MFMailComposeViewController *mailController = [[MFMailComposeViewController alloc] init];
            [mailController setMailComposeDelegate:self];
            if ([options objectForKey:@"subject"] && [options objectForKey:@"subject"] != [NSNull null]) {
                [mailController setSubject: options[@"subject"]];
            }
            if ([options objectForKey:@"message"] && [options objectForKey:@"message"] != [NSNull null]) {
                [mailController setMessageBody:options[@"message"] isHTML:NO];
            }
            
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
                    //  ONLY images attach
                    time_t unixTime = (time_t) [[NSDate date] timeIntervalSince1970];
                    NSString *timestamp=[NSString stringWithFormat:@"%ld",unixTime];
                    [mailController addAttachmentData:data mimeType: @"image/jpg" fileName: [timestamp stringByAppendingString: @".jpg"] ];
                    
                } else {
                    [mailController setMessageBody:[options[@"message"] stringByAppendingString: [@" " stringByAppendingString: options[@"url"]]] isHTML:NO];
                }
            }
            
            UIViewController *root = [[[[UIApplication sharedApplication] delegate] window] rootViewController];
            
            
            [root presentViewController:mailController animated:YES completion:nil];
            
            
        }

    }
    
}

- (void)mailComposeController:(MFMailComposeViewController*)controller didFinishWithResult:(MFMailComposeResult)result error:(NSError*)error {
    NSLog(@"finish email");
    [controller becomeFirstResponder];
    [controller dismissViewControllerAnimated:YES completion:nil];
}


@end