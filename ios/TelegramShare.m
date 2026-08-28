//
//  TelegramShare.m.m
//  RNShare
//
//  Created by Akinn Rosa on 07-27-21.
//

#import "TelegramShare.h"
#import "RNShareUtils.h"

@implementation TelegramShare
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
    NSURL *shareURL = [RNShareUtils URLWithString:url.length > 0 ? @"tg://msg_url" : @"tg://msg" queryItems:queryItems];

    if ([[UIApplication sharedApplication] canOpenURL: shareURL]) {
        [[UIApplication sharedApplication] openURL:shareURL options:@{} completionHandler:^(BOOL success) {
            if (success) {
                resolve(@[@true, @""]);
            } else {
                reject(@"EUNAVAILABLE", @"Unable to open share target", nil);
            }
        }];
    } else {
        // Cannot open telegram
        NSString *stringURL = @"https://itunes.apple.com/app/telegram-messenger/id686449807";
        NSURL *url = [NSURL URLWithString:stringURL];
        
        [[UIApplication sharedApplication] openURL:url options:@{} completionHandler:nil];
        
        NSString *errorMessage = @"Not installed";
        NSDictionary *userInfo = @{NSLocalizedFailureReasonErrorKey: NSLocalizedString(errorMessage, nil)};
        NSError *error = [NSError errorWithDomain:@"com.rnshare" code:1 userInfo:userInfo];
        
        NSLog(@"%@", errorMessage);
        reject(@"Not installed",@"Not installed",error);
    } 
}

@end
