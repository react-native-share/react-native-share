//
//  InstagramShare.m
//  RNShare
//
//  Created by Ralf Nieuwenhuizen on 12-04-17.
//

#import "InstagramShare.h"
#import <AVFoundation/AVFoundation.h>

@implementation InstagramShare
- (void)shareSingle:(NSDictionary *)options
    failureCallback:(RCTResponseErrorBlock)failureCallback
    successCallback:(RCTResponseSenderBlock)successCallback {
    
    NSLog(@"Try open view");

    NSURL * fileURL = [NSURL URLWithString: options[@"url"]];
    AVURLAsset* videoAsset = [AVURLAsset URLAssetWithURL:fileURL options:nil];
    CMTime videoDuration = videoAsset.duration;
    float videoDurationSeconds = CMTimeGetSeconds(videoDuration);

    NSLog(@"Video duration: %f seconds for file %@", videoDurationSeconds, videoAsset.URL.absoluteString);
        
    NSURL * shareURL;
    // Instagram doesn't allow sharing videos longer than 60 seconds on iOS anymore. (next button is not responding, trim is unavailable)
    if (videoDurationSeconds <= 60.0f) {
        NSString * urlString = [NSString stringWithFormat:@"instagram://library?AssetPath=%@", options[@"url"]];
        shareURL = [NSURL URLWithString:urlString];
    } else {
        shareURL = [NSURL URLWithString:@"instagram://camera"];
    }
    
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
