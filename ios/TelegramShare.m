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
    
    NSLog(@"Try open view");

    NSURL * fileURL = [NSURL URLWithString: options[@"url"]];
    AVURLAsset* videoAsset = [AVURLAsset URLAssetWithURL:fileURL options:nil];
    CMTime videoDuration = videoAsset.duration;
    float videoDurationSeconds = CMTimeGetSeconds(videoDuration);

    NSLog(@"Video duration: %f seconds for file %@", videoDurationSeconds, videoAsset.URL.absoluteString);
        
    NSString *telegramNumber = [RCTConvert NSString:options[@"telegramNumber"]];
    NSString *text = [RCTConvert NSString:options[@"message"]];
    text = (NSString*)CFBridgingRelease(CFURLCreateStringByAddingPercentEscapes(NULL,(CFStringRef) text, NULL,CFSTR("!*'();:@&=+$,/?%#[]"),kCFStringEncodingUTF8));

    NSString * urlTelegram = telegramNumber ? [NSString stringWithFormat:@"tg://msg?text=%@&to=%@", text, telegramNumber] : [NSString stringWithFormat:@"tg://msg?text=%@", text];
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
