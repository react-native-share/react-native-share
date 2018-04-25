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
        NSString *text = [RCTConvert NSString:options[@"message"]];

        NSLog(@"Try open view");

        NSString *subject = @"";
        NSString *message = @"";
        if ([options objectForKey:@"subject"] && [options objectForKey:@"subject"] != [NSNull null]) {
            subject = [RCTConvert NSString:options[@"subject"]];
        }

        message = [RCTConvert NSString:options[@"message"]];

        if ([options objectForKey:@"url"] && [options objectForKey:@"url"] != [NSNull null]) {
            NSString *url = [RCTConvert NSString:options[@"url"]];
            message = [message stringByAppendingString: [@" " stringByAppendingString: options[@"url"]] ];
        }

        NSString * url = [NSString stringWithFormat:@"mailto:?subject=%@&body=%@", subject, message ];
        NSURL * emailURL = [NSURL URLWithString:[url stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];

        if ([MFMailComposeViewController canSendMail]) {
            // device is configured to send mail
            [[UIApplication sharedApplication] openURL: emailURL];
            successCallback(@[]);
        } else {
            // Cannot open email
            UIViewController *rootViewController = [[[UIApplication sharedApplication] delegate] window].rootViewController;
            while(rootViewController.presentedViewController) {
                rootViewController = rootViewController.presentedViewController;
            }

            UIAlertController * alert=[UIAlertController alertControllerWithTitle:@"Message!"
                                                                          message:@"Email is not configured!"
                                                                   preferredStyle:UIAlertControllerStyleAlert];

            UIAlertAction* okButton = [UIAlertAction actionWithTitle:@"Ok"
                                                               style:UIAlertActionStyleDefault
                                                             handler:^(UIAlertAction * action)
            {
                NSLog(@"you pressed Ok button");
            }];

            UIAlertAction* settingsButton = [UIAlertAction actionWithTitle:@"Settings"
                                                                     style:UIAlertActionStyleDefault
                                                                   handler:^(UIAlertAction * action)
            {
                NSLog(@"you pressed settings button");
                [[UIApplication sharedApplication] openURL: emailURL];
            }];

            [alert addAction:okButton];
            [alert addAction:settingsButton];

            [rootViewController presentViewController:alert animated:YES completion:nil];

            NSLog(@"Cannot open email");
            NSString *errorMessage = @"Email is not configured!";
            NSDictionary *userInfo = @{NSLocalizedFailureReasonErrorKey: NSLocalizedString(errorMessage, nil)};
            NSError *error = [NSError errorWithDomain:@"com.rnshare" code:1 userInfo:userInfo];
            NSLog(@"%@", errorMessage);
            failureCallback(error);
        }
    }
}

@end
