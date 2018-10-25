//
//  InstagramShare.m
//  RNShare
//
//  Created by Ralf Nieuwenhuizen on 12-04-17.
//

#import "InstagramShare.h"
#import <AVFoundation/AVFoundation.h>

@implementation InstagramShare
    RCT_EXPORT_MODULE();
- (void)shareSingle:(NSDictionary *)options
    failureCallback:(RCTResponseErrorBlock)failureCallback
    successCallback:(RCTResponseSenderBlock)successCallback {
    
    NSLog(@"Try open view");

    NSString *urlString = [NSString stringWithFormat:@"instagram://library?AssetPath=%@", options[@"url"]];
    NSURL * shareURL = [NSURL URLWithString:urlString];

    if ([[UIApplication sharedApplication] canOpenURL: shareURL]) {
        [[UIApplication sharedApplication] openURL: shareURL];
        successCallback(@[]);
    } else {
        // Cannot open instagram
        NSString *stringURL = @"http://itunes.apple.com/app/instagram/id389801252";
        NSURL *url = [NSURL URLWithString:stringURL];
        [[UIApplication sharedApplication] openURL:url];
        
        NSString *errorMessage = @"Not installed";
        NSDictionary *userInfo = @{NSLocalizedFailureReasonErrorKey: NSLocalizedString(errorMessage, nil)};
        NSError *error = [NSError errorWithDomain:@"com.rnshare" code:1 userInfo:userInfo];
        
        NSLog(errorMessage);
        failureCallback(error);
    } 
}

@end
