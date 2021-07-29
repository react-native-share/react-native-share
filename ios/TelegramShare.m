//
//  TelegramShare.m.m
//  RNShare
//
//  Created by Akinn Rosa on 07-27-21.
//

#import "TelegramShare.h"
#import <AVFoundation/AVFoundation.h>
@import Photos;

@implementation TelegramShare
    RCT_EXPORT_MODULE();
- (void)shareSingle:(NSDictionary *)options
    failureCallback:(RCTResponseErrorBlock)failureCallback
    successCallback:(RCTResponseSenderBlock)successCallback {
    
    NSString *text = [RCTConvert NSString:options[@"message"]];
    text = (NSString*)CFBridgingRelease(CFURLCreateStringByAddingPercentEscapes(NULL,(CFStringRef) text, NULL,CFSTR("!*'();:@&=+$,/?%#[]"),kCFStringEncodingUTF8));
    
    NSString *url = [RCTConvert NSString:options[@"url"]];

    NSString *telegramMsg = [NSString stringWithFormat:@"tg://msg?text=%@", text];
    NSString *telegramMsgUrl = [NSString stringWithFormat:@"tg://msg_url?text=%@&url=%@", text, url];

    NSString * urlTelegram = url ? telegramMsgUrl : telegramMsg;
    NSURL * shareURL = [NSURL URLWithString:urlTelegram];
    
    if ([[UIApplication sharedApplication] canOpenURL: shareURL]) {
        [[UIApplication sharedApplication] openURL: shareURL];
        successCallback(@[]);
    } else {
        // Cannot open telegram
        NSString *stringURL = @"https://itunes.apple.com/app/telegram-messenger/id686449807";
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
