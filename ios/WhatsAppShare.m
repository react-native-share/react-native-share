//
//  FacebookShare.m
//  RNShare
//
//  Created by Diseño Uno BBCL on 23-07-16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "WhatsAppShare.h"

@implementation WhatsAppShare
- (void)shareSingle:(NSDictionary *)options
    failureCallback:(RCTResponseErrorBlock)failureCallback
    successCallback:(RCTResponseSenderBlock)successCallback {

    NSLog(@"Try open view");

    if ([options objectForKey:@"message"] && [options objectForKey:@"message"] != [NSNull null]) {
        NSString *text = [RCTConvert NSString:options[@"message"]];
        NSString * urlWhats = [NSString stringWithFormat:@"whatsapp://send?text=%@", [text stringByAppendingString: [@" " stringByAppendingString: options[@"url"]] ]];
        NSURL * whatsappURL = [NSURL URLWithString:[urlWhats stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];

        if ([[UIApplication sharedApplication] canOpenURL: whatsappURL]) {
            [[UIApplication sharedApplication] openURL: whatsappURL];
        } else {
            // Cannot open whatsapp
            NSLog(@"No installed");
            NSString *stringURL = @"http://itunes.apple.com/en/app/whatsapp-messenger/id310633997";
            NSURL *url = [NSURL URLWithString:stringURL];
            [[UIApplication sharedApplication] openURL:url];
        }
    }

}


@end
