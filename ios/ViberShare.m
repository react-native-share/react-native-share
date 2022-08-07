//
//  ViberShare.m.m
//  RNShare
//

#import "ViberShare.h"
#import <AVFoundation/AVFoundation.h>
@import Photos;

@implementation ViberShare
    RCT_EXPORT_MODULE();
- (void)shareSingle:(NSDictionary *)options
    failureCallback:(RCTResponseErrorBlock)failureCallback
    successCallback:(RCTResponseSenderBlock)successCallback {
    
    NSString *text = [RCTConvert NSString:options[@"message"]];
    text = (NSString*)CFBridgingRelease(CFURLCreateStringByAddingPercentEscapes(NULL,(CFStringRef) text, NULL,CFSTR("!*'();:@&=+$,/?%#[]"),kCFStringEncodingUTF8));
    
    NSString *url = [RCTConvert NSString:options[@"url"]];

    NSString *viberMsg = [NSString stringWithFormat:@"viber://forward?text=%@", text];
    NSString *viberMsgUrl = [NSString stringWithFormat:@"viber://forward?text=%@ %@", text, url];

    NSString * urlViber = url ? viberMsgUrl : viberMsg;
    NSURL * shareURL = [NSURL URLWithString:urlViber];
    
    if ([[UIApplication sharedApplication] canOpenURL: shareURL]) {
        [[UIApplication sharedApplication] openURL: shareURL];
        successCallback(@[@true, @""]);
    } else {
        // Cannot open viber
        NSString *stringURL = @"https://apps.apple.com/app/viber-messenger-chats-calls/id382617920";
        NSURL *url = [NSURL URLWithString:stringURL];
        
        [[UIApplication sharedApplication] openURL:url options:@{} completionHandler:^(BOOL success) {}];
        
        NSString *errorMessage = @"Not installed";
        NSDictionary *userInfo = @{NSLocalizedFailureReasonErrorKey: NSLocalizedString(errorMessage, nil)};
        NSError *error = [NSError errorWithDomain:@"com.rnshare" code:1 userInfo:userInfo];
        
        NSLog(@"%@", errorMessage);
        failureCallback(error);
    } 
}

@end
