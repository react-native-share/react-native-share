//
//  LinkedinShare.m
//  RNShare
//
//  Created by Ralf Nieuwenhuizen on 12-04-17.
//

#import "LinkedinShare.h"
#import <AVFoundation/AVFoundation.h>
@import Photos;

@implementation LinkedinShare
    RCT_EXPORT_MODULE();
- (void)shareSingle:(NSDictionary *)options
    reject:(RCTPromiseRejectBlock)reject
    resolve:(RCTPromiseResolveBlock)resolve {
    
    NSLog(@"Try open view");
    
    NSString *url = [NSString stringWithFormat:@"https://www.linkedin.com/sharing/share-offsite/?url=%@", options[@"url"]];
    NSURL *shareURL = [NSURL URLWithString:[url stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];

  if ([[UIApplication sharedApplication] canOpenURL: shareURL]) {
      [[UIApplication sharedApplication] openURL:shareURL];
      resolve(@[@true, @""]);
    } else {
        // Cannot open Linkedin
        NSString *stringURL = @"https://apps.apple.com/us/app/linkedin-network-job-finder/id288429040";
        NSURL *url = [NSURL URLWithString:stringURL];
        
        [[UIApplication sharedApplication] openURL:url options:@{} completionHandler:^(BOOL success) {}];
        
        NSString *errorMessage = @"Not installed";
        NSDictionary *userInfo = @{NSLocalizedFailureReasonErrorKey: NSLocalizedString(errorMessage, nil)};
        NSError *error = [NSError errorWithDomain:@"com.rnshare" code:1 userInfo:userInfo];
        
        NSLog(@"%@", errorMessage);
        reject(@"com.rnshare",@"Not installed",error);
    }
}

@end
