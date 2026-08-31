//
//  FacebookStories.m
//  RNShare
//
//  Created by Quynh Nguyen on 4/13/20.
//  Link: https://github.com/Quynh-Nguyen
//  Copyright © 2020 Facebook. All rights reserved.
//

#import "FacebookStories.h"

@implementation FacebookStories
RCT_EXPORT_MODULE();

- (void)shareSingle:(NSDictionary *)options
            reject:(RCTPromiseRejectBlock)reject
           resolve:(RCTPromiseResolveBlock)resolve {
    NSString *appId = [RCTConvert NSString:options[@"appId"]];
    if (appId.length == 0) {
        reject(@"EINVAL", @"An appId is required", nil);
        return;
    }
    NSURL *urlScheme = [NSURL URLWithString:@"facebook-stories://share"];
    if (![[UIApplication sharedApplication] canOpenURL:urlScheme]) {
        reject(@"cannot open URL", @"cannot open URL", [self fallbackFacebook]);
        return;
    }

    RCTPromiseRejectBlock rejectOnMain = ^(NSString *code, NSString *message, NSError *error) {
        dispatch_async(dispatch_get_main_queue(), ^{ reject(code, message, error); });
    };
    dispatch_async(dispatch_get_global_queue(QOS_CLASS_USER_INITIATED, 0), ^{
        NSMutableDictionary *items = [NSMutableDictionary dictionary];
        items[@"com.facebook.sharedSticker.appID"] = appId;
        for (NSString *key in @[@"backgroundImage", @"stickerImage"]) {
            NSString *path = [RCTConvert NSString:options[key]];
            if (path != nil) {
                NSURL *URL = [RCTConvert NSURL:path];
                NSData *data = URL ? [NSData dataWithContentsOfURL:URL] : nil;
                UIImage *image = data ? [UIImage imageWithData:data] : nil;
                NSData *png = image ? UIImagePNGRepresentation(image) : nil;
                if (!png) {
                    rejectOnMain(@"EINVAL", [NSString stringWithFormat:@"Unable to decode %@", key], nil);
                    return;
                }
                items[[@"com.facebook.sharedSticker." stringByAppendingString:key]] = png;
            }
        }
        NSString *video = [RCTConvert NSString:options[@"backgroundVideo"]];
        if (video != nil) {
            NSURL *URL = [RCTConvert NSURL:video];
            NSData *data = URL ? [NSData dataWithContentsOfURL:URL] : nil;
            if (!data) {
                rejectOnMain(@"EINVAL", @"Unable to read background video", nil);
                return;
            }
            items[@"com.facebook.sharedSticker.backgroundVideo"] = data;
        }
        NSString *attribution = [RCTConvert NSString:options[@"attributionURL"]];
        if (attribution != nil) items[@"com.facebook.sharedSticker.contentURL"] = attribution;
        items[@"com.facebook.sharedSticker.backgroundTopColor"] = [RCTConvert NSString:options[@"backgroundTopColor"]] ?: @"#906df4";
        items[@"com.facebook.sharedSticker.backgroundBottomColor"] = [RCTConvert NSString:options[@"backgroundBottomColor"]] ?: @"#837DF4";

        dispatch_async(dispatch_get_main_queue(), ^{
            if (![[UIApplication sharedApplication] canOpenURL:urlScheme]) {
                reject(@"EUNAVAILABLE", @"Facebook Stories is no longer available", nil);
                return;
            }
            NSDictionary *pasteboardOptions = @{UIPasteboardOptionExpirationDate: [NSDate.date dateByAddingTimeInterval:60 * 5]};
            [[UIPasteboard generalPasteboard] setItems:@[items] options:pasteboardOptions];
            [[UIApplication sharedApplication] openURL:urlScheme options:@{} completionHandler:^(BOOL success) {
                if (success) {
                    resolve(@[@true, @""]);
                } else {
                    reject(@"EUNAVAILABLE", @"Unable to open Facebook Stories", nil);
                }
            }];
        });
    });
}

- (NSError *)fallbackFacebook {
    [[UIApplication sharedApplication] openURL:[NSURL URLWithString:@"https://itunes.apple.com/app/facebook/id284882215"] options:@{} completionHandler:nil];
    return [NSError errorWithDomain:@"com.rnshare" code:1 userInfo:@{NSLocalizedFailureReasonErrorKey: @"Not installed"}];
}
@end
