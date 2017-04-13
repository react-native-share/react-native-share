//
//  InstagramShare.m
//  RNShare
//
//  Created by Ralf Nieuwenhuizen on 12-04-17.
//

#import "InstagramShare.h"

@implementation InstagramShare
- (void)shareSingle:(NSDictionary *)options
    failureCallback:(RCTResponseErrorBlock)failureCallback
    successCallback:(RCTResponseSenderBlock)successCallback {
    
    NSLog(@"Try open view");
    
    if ([options objectForKey:@"message"] && [options objectForKey:@"message"] != [NSNull null]) {
        NSString *text = [RCTConvert NSString:options[@"message"]];
        text = [text stringByAppendingString: [@" " stringByAppendingString: options[@"url"]] ];
        text = (NSString*)CFBridgingRelease(CFURLCreateStringByAddingPercentEscapes(NULL,(CFStringRef) text, NULL,CFSTR("!*'();:@&=+$,/?%#[]"),kCFStringEncodingUTF8));
        
        NSString * urlString = [NSString stringWithFormat:@"instagram://library?AssetPath=%@&InstagramCaption=%@", options[@"url"], text];
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
    
}


@end
