//
//  TwitterShare.m
//  RNShare
//
//  Created by Akinn Rosa on 06-06-25.
//

#import "TwitterShare.h"
#import "RNShareUtils.h"

@implementation TwitterShare
RCT_EXPORT_MODULE();

- (void)shareSingle:(NSDictionary *)options
             reject:(RCTPromiseRejectBlock)reject
            resolve:(RCTPromiseResolveBlock)resolve {
    NSString *text = [RCTConvert NSString:options[@"message"]] ?: @"";
    NSString *url = [RCTConvert NSString:options[@"url"]];
    if (text.length == 0 && url.length == 0) {
        reject(@"EINVAL", @"A message or URL is required", nil);
        return;
    }

    NSString *appMessage = text;
    if (url.length > 0) appMessage = text.length > 0 ? [NSString stringWithFormat:@"%@ %@", text, url] : url;
    NSURL *shareURL = [RNShareUtils URLWithString:@"twitter://post" queryItems:@[[NSURLQueryItem queryItemWithName:@"message" value:appMessage]]];
    BOOL inApp = [[UIApplication sharedApplication] canOpenURL:shareURL];
    if (!inApp) {
        NSMutableArray *queryItems = [NSMutableArray arrayWithObject:[NSURLQueryItem queryItemWithName:@"text" value:text]];
        if (url.length > 0) [queryItems addObject:[NSURLQueryItem queryItemWithName:@"url" value:url]];
        shareURL = [RNShareUtils URLWithString:@"https://twitter.com/intent/tweet" queryItems:queryItems];
    }
    [[UIApplication sharedApplication] openURL:shareURL options:@{} completionHandler:^(BOOL success) {
        if (success) {
            resolve(@[@true, inApp ? @"opened in twitter app" : @"opened in browser"]);
        } else {
            reject(@"EUNAVAILABLE", @"Unable to open share target", nil);
        }
    }];
}

@end
