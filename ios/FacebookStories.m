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

- (void)shareSingle:(NSDictionary *)options
    failureCallback:(RCTResponseErrorBlock)failureCallback
    successCallback:(RCTResponseSenderBlock)successCallback {

    NSURL *urlScheme = [NSURL URLWithString:@"facebook-stories://share"];
    if (![[UIApplication sharedApplication] canOpenURL:urlScheme]) {
        [self fallbackFacebook];
    }

    // Create dictionary of assets and attribution
    NSMutableDictionary *items = [NSMutableDictionary dictionary];

    [items setObject: options[@"appId"] forKey: @"com.facebook.sharedSticker.appID"];

    if(![options[@"backgroundImage"] isEqual:[NSNull null]] && options[@"backgroundImage"] != nil) {
        NSURL *backgroundImageURL = [RCTConvert NSURL:options[@"backgroundImage"]];
        UIImage *image = [UIImage imageWithData: [NSData dataWithContentsOfURL:backgroundImageURL]];
        [items setObject: UIImagePNGRepresentation(image) forKey: @"com.facebook.sharedSticker.backgroundImage"];
    }

    if(![options[@"stickerImage"] isEqual:[NSNull null]] && options[@"stickerImage"] != nil) {
        NSURL *stickerImageURL = [RCTConvert NSURL:options[@"stickerImage"]];
        UIImage *image = [UIImage imageWithData: [NSData dataWithContentsOfURL: stickerImageURL]];
        [items setObject: UIImagePNGRepresentation(image) forKey: @"com.facebook.sharedSticker.stickerImage"];
    }

    if(![options[@"backgroundVideo"] isEqual:[NSNull null]] && options[@"backgroundVideo"] != nil) {
        NSURL *backgroundVideoURL = [RCTConvert NSURL:options[@"backgroundVideo"]];
        NSData *video = [NSData dataWithContentsOfURL:backgroundVideoURL];
        [items setObject: video forKey: @"com.facebook.sharedSticker.backgroundVideo"];
    }

    if(![options[@"attributionURL"] isEqual:[NSNull null]] && options[@"attributionURL"] != nil) {
        NSString *attrURL = [RCTConvert NSString:options[@"attributionURL"]];
        [items setObject: attrURL forKey: @"com.facebook.sharedSticker.contentURL"];
    }

    NSString *backgroundTopColor;
     if(![options[@"backgroundTopColor"] isEqual:[NSNull null]] && options[@"backgroundTopColor"] != nil) {
        backgroundTopColor = [RCTConvert NSString:options[@"backgroundTopColor"]];
    } else {
        backgroundTopColor = @"#906df4";
    }
    [items setObject: backgroundTopColor forKey: @"com.facebook.sharedSticker.backgroundTopColor"];

    NSString *backgroundBottomColor;
    if(![options[@"backgroundBottomColor"] isEqual:[NSNull null]] && options[@"backgroundBottomColor"] != nil) {
        backgroundBottomColor = [RCTConvert NSString:options[@"backgroundBottomColor"]];
    } else {
        backgroundBottomColor = @"#837DF4";
    }
    [items setObject: backgroundBottomColor forKey: @"com.facebook.sharedSticker.backgroundBottomColor"];

    // Putting dictionary of options inside an array
    NSArray *pasteboardItems = @[items];

    // Prepare options to facebook
    NSDictionary *pasteboardOptions = @{UIPasteboardOptionExpirationDate : [[NSDate date] dateByAddingTimeInterval:60 * 5]};

    // This call is iOS 10+, can use 'setItems' depending on what versions you support
    [[UIPasteboard generalPasteboard] setItems:pasteboardItems options:pasteboardOptions];
    [[UIApplication sharedApplication] openURL:urlScheme options:@{} completionHandler:nil];

    successCallback(@[]);
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
