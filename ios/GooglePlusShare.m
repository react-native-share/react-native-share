//
//  GooglePlusShare.m
//  RNShare
//
//  Created by Diseño Uno BBCL on 23-07-16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "GooglePlusShare.h"
#import "RNShareUtils.h"

@implementation GooglePlusShare
    RCT_EXPORT_MODULE();
- (void)shareSingle:(NSDictionary *)options
    reject:(RCTPromiseRejectBlock)reject
    resolve:(RCTPromiseResolveBlock)resolve {

        NSString *link = [RCTConvert NSString:options[@"url"]];
        if (link.length == 0) {
            reject(@"EINVAL", @"A URL is required", nil);
            return;
        }
        NSURL *gplusURL = [RNShareUtils URLWithString:@"https://plus.google.com/share" queryItems:@[[NSURLQueryItem queryItemWithName:@"url" value:link]]];

        if ([[UIApplication sharedApplication] canOpenURL: gplusURL]) {
            [[UIApplication sharedApplication] openURL:gplusURL options:@{} completionHandler:^(BOOL success) {
                if (success) {
                    resolve(@[@true, @""]);
                } else {
                    reject(@"EUNAVAILABLE", @"Unable to open share target", nil);
                }
            }];
        } else {
            // Cannot open gplus
            NSString *errorMessage = @"Not installed";
            NSDictionary *userInfo = @{NSLocalizedFailureReasonErrorKey: NSLocalizedString(errorMessage, nil)};
            NSError *error = [NSError errorWithDomain:@"com.rnshare" code:1 userInfo:userInfo];

            NSLog(@"%@", errorMessage);
            reject(@"com.rnshare",errorMessage,error);
        }
}


@end
