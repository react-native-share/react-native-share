//
//  ViberShare.m.m
//  RNShare
//

#import "ViberShare.h"
#import "RNShareUtils.h"

@implementation ViberShare
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
    if (url.length > 0) text = text.length > 0 ? [NSString stringWithFormat:@"%@ %@", text, url] : url;
    NSURL *shareURL = [RNShareUtils URLWithString:@"viber://forward" queryItems:@[[NSURLQueryItem queryItemWithName:@"text" value:text]]];

    if ([[UIApplication sharedApplication] canOpenURL: shareURL]) {
        [[UIApplication sharedApplication] openURL:shareURL options:@{} completionHandler:^(BOOL success) {
            if (success) {
                resolve(@[@true, @""]);
            } else {
                reject(@"EUNAVAILABLE", @"Unable to open share target", nil);
            }
        }];
    } else {
        // Cannot open viber
        NSString *stringURL = @"https://apps.apple.com/app/viber-messenger-chats-calls/id382617920";
        NSURL *url = [NSURL URLWithString:stringURL];
        
        [[UIApplication sharedApplication] openURL:url options:@{} completionHandler:nil];
        
        NSString *errorMessage = @"Not installed";
        NSDictionary *userInfo = @{NSLocalizedFailureReasonErrorKey: NSLocalizedString(errorMessage, nil)};
        NSError *error = [NSError errorWithDomain:@"com.rnshare" code:1 userInfo:userInfo];
        
        NSLog(@"%@", errorMessage);
        reject(errorMessage,errorMessage,error);
    } 
}

@end
