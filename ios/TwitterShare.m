//
//  TwitterShare.m
//  RNShare
//
//  Created by Akinn Rosa on 06-06-25.
//

#import "TwitterShare.h"
#import <AVFoundation/AVFoundation.h>
@import Photos;

@implementation TwitterShare
RCT_EXPORT_MODULE();

- (void)shareSingle:(NSDictionary *)options
             reject:(RCTPromiseRejectBlock)reject
            resolve:(RCTPromiseResolveBlock)resolve {
    
    NSString *text = [RCTConvert NSString:options[@"message"]];
    NSString *url = [RCTConvert NSString:options[@"url"]];

    // URL encode text and url
    NSString *encodedText = (NSString*)CFBridgingRelease(CFURLCreateStringByAddingPercentEscapes(
        NULL, (CFStringRef)text, NULL, CFSTR("!*'();:@&=+$,/?%#[]"), kCFStringEncodingUTF8));

    NSString *encodedUrl = url ? (NSString*)CFBridgingRelease(CFURLCreateStringByAddingPercentEscapes(
        NULL, (CFStringRef)url, NULL, CFSTR("!*'();:@&=+$,/?%#[]"), kCFStringEncodingUTF8)) : nil;

    // First try deep link to app
    NSString *appUrlString = [NSString stringWithFormat:@"twitter://post?message=%@", encodedText];
    NSURL *appUrl = [NSURL URLWithString:appUrlString];

    if ([[UIApplication sharedApplication] canOpenURL:appUrl]) {
        [[UIApplication sharedApplication] openURL:appUrl options:@{} completionHandler:^(BOOL success) {}];
        resolve(@[@true, @"opened in twitter app"]);
    } else {
        // Fallback to web intent
        NSString *webUrlString = url ?
            [NSString stringWithFormat:@"https://twitter.com/intent/tweet?text=%@&url=%@", encodedText, encodedUrl] :
            [NSString stringWithFormat:@"https://twitter.com/intent/tweet?text=%@", encodedText];

        NSURL *webUrl = [NSURL URLWithString:webUrlString];
        [[UIApplication sharedApplication] openURL:webUrl options:@{} completionHandler:^(BOOL success) {}];
        resolve(@[@true, @"opened in browser"]);
    }
}

@end
