#import "DiscordShare.h"
#import "RNShareUtils.h"

@implementation DiscordShare
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
    NSMutableArray *queryItems = [NSMutableArray arrayWithObject:[NSURLQueryItem queryItemWithName:@"text" value:text]];
    if (url.length > 0) [queryItems addObject:[NSURLQueryItem queryItemWithName:@"url" value:url]];
    NSURL *shareURL = [RNShareUtils URLWithString:@"discord://message" queryItems:queryItems];

    if ([[UIApplication sharedApplication] canOpenURL: shareURL]) {
        [[UIApplication sharedApplication] openURL:shareURL options:@{} completionHandler:^(BOOL success) {
            if (success) {
                resolve(@[@true, @""]);
            } else {
                reject(@"EUNAVAILABLE", @"Unable to open share target", nil);
            }
        }];
    } else {
        NSString *stringURL = @"https://apps.apple.com/us/app/discord-chat-talk-hangout/id985746746";
        NSURL *url = [NSURL URLWithString:stringURL];
        
        [[UIApplication sharedApplication] openURL:url options:@{} completionHandler:^(BOOL success) {}];
        
        NSString *errorMessage = @"Not installed";
        NSDictionary *userInfo = @{NSLocalizedFailureReasonErrorKey: NSLocalizedString(errorMessage, nil)};
        NSError *error = [NSError errorWithDomain:@"com.rnshare" code:1 userInfo:userInfo];
        
        NSLog(@"%@", errorMessage);
        reject(@"Not installed",@"Not installed",error);
    }
}

@end
