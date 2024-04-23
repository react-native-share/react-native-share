#import "DiscordShare.h"
#import <AVFoundation/AVFoundation.h>
@import Photos;

@implementation DiscordShare
    RCT_EXPORT_MODULE();
- (void)shareSingle:(NSDictionary *)options
    reject:(RCTPromiseRejectBlock)reject
    resolve:(RCTPromiseResolveBlock)resolve {
    
    NSString *text = [RCTConvert NSString:options[@"message"]];
    text = (NSString*)CFBridgingRelease(CFURLCreateStringByAddingPercentEscapes(NULL,(CFStringRef) text, NULL,CFSTR("!*'();:@&=+$,/?%#[]"),kCFStringEncodingUTF8));
    
    NSString *url = [RCTConvert NSString:options[@"url"]];
    
    NSString *discordMsg = [NSString stringWithFormat:@"discord://message?text=%@", text];
    NSString *discordMsgUrl = [NSString stringWithFormat:@"discord://message?text=%@&url%@", text, url];

    NSString * urlDiscord = url ? discordMsgUrl : discordMsg;
    NSURL * shareURL = [NSURL URLWithString:urlDiscord];
    
    
    if ([[UIApplication sharedApplication] canOpenURL: shareURL]) {
        [[UIApplication sharedApplication] openURL: shareURL];
        resolve(@[@true, @""]);
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
