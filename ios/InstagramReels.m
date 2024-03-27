//
//  InstagramStories.m
//  RNShare
//
//  Created by Nikita Logachev on 13.02.2019.
//  link: https://github.com/loga4
//

// import RCTLog
#import <React/RCTLog.h>

#import "InstagramReels.h"

@implementation InstagramReels
RCT_EXPORT_MODULE();

- (void)shareSingle:(NSDictionary *)options
    reject:(RCTPromiseRejectBlock)reject
    resolve:(RCTPromiseResolveBlock)resolve {
    
    NSURL *urlScheme = [NSURL URLWithString:[NSString stringWithFormat:@"instagram-reels://share?source_application=%@", options[@"appId"]]];
    if (![[UIApplication sharedApplication] canOpenURL:urlScheme]) {
        NSError* error = [self fallbackInstagram];
        reject(@"cannot open URL",@"cannot open URL",error);
        return;
    }

    // Create dictionary of assets and attribution
    NSMutableDictionary *items = [NSMutableDictionary dictionary];


    if(![options[@"stickerImage"] isEqual:[NSNull null]] && options[@"stickerImage"] != nil) {
        NSURL *stickerImageURL = [RCTConvert NSURL:options[@"stickerImage"]];
        UIImage *image = [UIImage imageWithData: [NSData dataWithContentsOfURL: stickerImageURL]];
        [items setObject: UIImagePNGRepresentation(image) forKey: @"com.instagram.sharedSticker.stickerImage"];
    }

    if(![options[@"backgroundVideo"] isEqual:[NSNull null]] && options[@"backgroundVideo"] != nil) {
        NSURL *backgroundVideoURL = [RCTConvert NSURL:options[@"backgroundVideo"]];
        NSData *video = [NSData dataWithContentsOfURL:backgroundVideoURL];
        [items setObject: video forKey: @"com.instagram.sharedSticker.backgroundVideo"];
    }

    // Putting dictionary of options inside an array
    NSArray *pasteboardItems = @[items];

    // Prepare options to instagram
    NSDictionary *pasteboardOptions = @{UIPasteboardOptionExpirationDate : [[NSDate date] dateByAddingTimeInterval:60 * 5]};

    // This call is iOS 10+, can use 'setItems' depending on what versions you support
    [[UIPasteboard generalPasteboard] setItems:pasteboardItems options:pasteboardOptions];
    [[UIApplication sharedApplication] openURL:urlScheme options:@{} completionHandler:nil];

    resolve(@[@true, @""]);
}

- (NSError*)fallbackInstagram {
    // Cannot open instagram
    NSString *stringURL = @"https://itunes.apple.com/app/instagram/id389801252";
    NSURL *url = [NSURL URLWithString:stringURL];
    [[UIApplication sharedApplication] openURL:url];

    NSString *errorMessage = @"Not installed";
    NSDictionary *userInfo = @{NSLocalizedFailureReasonErrorKey: NSLocalizedString(errorMessage, nil)};
    NSError *error = [NSError errorWithDomain:@"com.rnshare" code:1 userInfo:userInfo];

    NSLog(errorMessage);
    return error;
}
// https://developers.facebook.com/docs/ios/sharing-to-reels-instagram/
@end

