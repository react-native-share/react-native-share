//
//  GooglePlusShare.m
//  RNShare
//
//  Created by Diseño Uno BBCL on 23-07-16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "GooglePlusShare.h"

@implementation GooglePlusShare
    RCT_EXPORT_MODULE();
- (void)shareSingle:(NSDictionary *)options
    reject:(RCTPromiseRejectBlock)reject
    resolve:(RCTPromiseResolveBlock)resolve {

    NSLog(@"Try open view");

    if ([options objectForKey:@"url"] && [options objectForKey:@"url"] != [NSNull null]) {
        NSString *url = [NSString stringWithFormat:@"https://plus.google.com/share?url=%@", options[@"url"]];
        NSURL *gplusURL = [NSURL URLWithString:[url stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];

        if ([[UIApplication sharedApplication] canOpenURL: gplusURL]) {
            [[UIApplication sharedApplication] openURL:gplusURL];
            resolve(@[@true, @""]);
        } else {
            // Cannot open gplus
            NSString *errorMessage = @"Not installed";
            NSDictionary *userInfo = @{NSLocalizedFailureReasonErrorKey: NSLocalizedString(errorMessage, nil)};
            NSError *error = [NSError errorWithDomain:@"com.rnshare" code:1 userInfo:userInfo];

            NSLog(errorMessage);
            reject(@"com.rnshare",errorMessage,error);
        }
    }
}


@end
