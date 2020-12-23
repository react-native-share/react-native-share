//
//  FacebookStories.m
//  RNShare
//
//  Created by Quynh Nguyen on 4/13/20.
//  Link: https://github.com/Quynh-Nguyen
//  Copyright © 2020 Facebook. All rights reserved.
//

// import RCTLog
#if __has_include(<React/RCTLog.h>)
#import <React/RCTLog.h>
#elif __has_include("RCTLog.h")
#import "RCTLog.h"
#else
#import "React/RCTLog.h"   // Required when used as a Pod in a Swift project
#endif

#import "FacebookStories.h"

@implementation FacebookStories
RCT_EXPORT_MODULE();

- (void)backgroundImage:(NSData *)backgroundImage attributionURL:(NSString *)attributionURL appId:(NSString *)appId {
    // Verify app can open custom URL scheme, open if able

    NSURL *urlScheme = [NSURL URLWithString:@"facebook-stories://share"];
    if ([[UIApplication sharedApplication] canOpenURL:urlScheme]) {
        // Assign background image asset and attribution link URL to pasteboard
        NSArray *pasteboardItems = @[@{@"com.facebook.sharedSticker.backgroundImage" : backgroundImage, @"com.facebook.sharedSticker.contentURL" : attributionURL, @"com.facebook.sharedSticker.appID" : appId}];
        NSDictionary *pasteboardOptions = @{UIPasteboardOptionExpirationDate : [[NSDate date] dateByAddingTimeInterval:60 * 5]};
        // This call is iOS 10+, can use 'setItems' depending on what versions you support
        [[UIPasteboard generalPasteboard] setItems:pasteboardItems options:pasteboardOptions];
        [[UIApplication sharedApplication] openURL:urlScheme options:@{} completionHandler:nil];
    } else { // Handle older app versions or app not installed case
        [self fallbackFacebook];
    }
}

- (void)stickerImage:(NSData *)stickerImage
  backgroundTopColor:(NSString *)backgroundTopColor
backgroundBottomColor:(NSString *)backgroundBottomColor
      attributionURL:(NSString *)attributionURL
      appId:(NSString *)appId
{
    // Verify app can open custom URL scheme. If able,
    // assign assets to pasteboard, open scheme.

    NSURL *urlScheme = [NSURL URLWithString:@"facebook-stories://share"];
    if ([[UIApplication sharedApplication] canOpenURL:urlScheme]) {

        // Assign sticker image asset and attribution link URL to pasteboard

        NSArray *pasteboardItems = @[@{@"com.facebook.sharedSticker.stickerImage" : stickerImage, @"com.facebook.sharedSticker.backgroundTopColor" : backgroundTopColor, @"com.facebook.sharedSticker.backgroundBottomColor" : backgroundBottomColor, @"com.facebook.sharedSticker.contentURL" : attributionURL, @"com.facebook.sharedSticker.appID" : appId}];

        NSDictionary *pasteboardOptions = @{UIPasteboardOptionExpirationDate : [[NSDate date] dateByAddingTimeInterval:60 * 5]};

        // This call is iOS 10+, can use 'setItems' depending on what versions you support

        [[UIPasteboard generalPasteboard] setItems:pasteboardItems options:pasteboardOptions];
        [[UIApplication sharedApplication] openURL:urlScheme options:@{} completionHandler:nil];

    } else { // Handle older app versions or app not installed case
        [self fallbackFacebook];
    }
}

- (void)backgroundImage:(NSData *)backgroundImage stickerImage:(NSData *)stickerImage attributionURL:(NSString *)attributionURL  appId:(NSString *)appId
{
    // Verify app can open custom URL scheme. If able,
    // assign assets to pasteboard, open scheme.
    NSURL *urlScheme = [NSURL URLWithString:@"facebook-stories://share"];
    if ([[UIApplication sharedApplication] canOpenURL:urlScheme]) {
        // Assign background and sticker image assets and
        // attribution link URL to pasteboard
        NSArray *pasteboardItems = @[@{@"com.facebook.sharedSticker.backgroundImage" : backgroundImage, @"com.facebook.sharedSticker.stickerImage" : stickerImage, @"com.facebook.sharedSticker.contentURL" : attributionURL, @"com.facebook.sharedSticker.appID" : appId}];
        NSDictionary *pasteboardOptions = @{UIPasteboardOptionExpirationDate : [[NSDate date] dateByAddingTimeInterval:60 * 5]};
        // This call is iOS 10+, can use 'setItems' depending on what versions you support
        [[UIPasteboard generalPasteboard] setItems:pasteboardItems options:pasteboardOptions];
        [[UIApplication sharedApplication] openURL:urlScheme options:@{} completionHandler:nil];

    } else { // Handle older app versions or app not installed case
        [self fallbackFacebook];
    }
}


- (void)shareSingle:(NSDictionary *)options
    failureCallback:(RCTResponseErrorBlock)failureCallback
    successCallback:(RCTResponseSenderBlock)successCallback {

    NSString *attrURL = [RCTConvert NSString:options[@"attributionURL"]];
    if (attrURL == nil) {
        attrURL = @"";
    }

    NSString *appId = [RCTConvert NSString:options[@"appId"]];

    NSString *method = [RCTConvert NSString:options[@"method"]];
    if (method) {
        if([method isEqualToString:@"shareBackgroundImage"]) {

            NSURL *URL = [RCTConvert NSURL:options[@"backgroundImage"]];
            if (URL == nil) {
                RCTLogError(@"key 'backgroundImage' missing in options");
            } else {
                UIImage *image = [UIImage imageWithData: [NSData dataWithContentsOfURL:URL]];

                [self backgroundImage:UIImagePNGRepresentation(image) attributionURL:attrURL appId:appId];
            }
        } else if([method isEqualToString:@"shareStickerImage"]) {
            RCTLog(@"method shareStickerImage");

            NSString *backgroundTopColor = [RCTConvert NSString:options[@"backgroundTopColor"]];
            if (backgroundTopColor == nil) {
                backgroundTopColor = @"#906df4";
            }
            NSString *backgroundBottomColor = [RCTConvert NSString:options[@"backgroundBottomColor"]];
            if (backgroundBottomColor == nil) {
                backgroundBottomColor = @"#837DF4";
            }

            NSURL *URL = [RCTConvert NSURL:options[@"stickerImage"]];
            if (URL == nil) {
                RCTLogError(@"key 'stickerImage' missing in options");
            } else {
                UIImage *image = [UIImage imageWithData: [NSData dataWithContentsOfURL:URL]];

                [self stickerImage:UIImagePNGRepresentation(image) backgroundTopColor:backgroundTopColor backgroundBottomColor:backgroundBottomColor attributionURL:attrURL appId:appId];
            }
        } else if([method isEqualToString:@"shareBackgroundAndStickerImage"]) {
            RCTLog(@"method shareBackgroundAndStickerImage");

            NSURL *backgroundURL = [RCTConvert NSURL:options[@"backgroundImage"]];
            NSURL *stickerURL = [RCTConvert NSURL:options[@"stickerImage"]];

            if (backgroundURL == nil || stickerURL == nil) {
                RCTLogError(@"key 'backgroundImage' or 'stickerImage' missing in options");
            } else {
                UIImage *backgroundImage = [UIImage imageWithData: [NSData dataWithContentsOfURL:backgroundURL]];
                UIImage *stickerImage = [UIImage imageWithData: [NSData dataWithContentsOfURL:stickerURL]];

                [self backgroundImage:UIImagePNGRepresentation(backgroundImage) stickerImage:UIImagePNGRepresentation(stickerImage) attributionURL:attrURL appId:appId];
            }
        }
    } else {
        RCTLogError(@"key 'method' missing in options");
    }
}

- (void)fallbackFacebook {
    // Cannot open facebook
    NSString *stringURL = @"http://itunes.apple.com/app/facebook/id284882215";
    NSURL *url = [NSURL URLWithString:stringURL];
    [[UIApplication sharedApplication] openURL:url];

    NSString *errorMessage = @"Not installed";
    NSDictionary *userInfo = @{NSLocalizedFailureReasonErrorKey: NSLocalizedString(errorMessage, nil)};
    NSError *error = [NSError errorWithDomain:@"com.rnshare" code:1 userInfo:userInfo];

    NSLog(errorMessage);
}
@end
