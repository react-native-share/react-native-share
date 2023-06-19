//
//  InstagramStories.m
//  RNShare
//
//  Created by Nikita Logachev on 13.02.2019.
//  link: https://github.com/loga4
//

// import RCTLog
#import <React/RCTLog.h>

#import "InstagramStories.h"

@implementation InstagramStories
RCT_EXPORT_MODULE();

- (void)shareSingle:(NSDictionary *)options
    reject:(RCTPromiseRejectBlock)reject
    resolve:(RCTPromiseResolveBlock)resolve {
    
    NSURL *urlScheme = [NSURL URLWithString:[NSString stringWithFormat:@"instagram-stories://share?source_application=%@", options[@"appId"]]];
    if (![[UIApplication sharedApplication] canOpenURL:urlScheme]) {
        NSError* error = [self fallbackInstagram];
        reject(@"cannot open URL",@"cannot open URL",error);
        return;
    }

    // Create dictionary of assets and attribution
    NSMutableDictionary *items = [NSMutableDictionary dictionary];

    if(![options[@"backgroundImage"] isEqual:[NSNull null]] && options[@"backgroundImage"] != nil) {
        NSURL *backgroundImageURL = [RCTConvert NSURL:options[@"backgroundImage"]];
        UIImage *image = [UIImage imageWithData: [NSData dataWithContentsOfURL:backgroundImageURL]];
        [items setObject: UIImagePNGRepresentation(image) forKey: @"com.instagram.sharedSticker.backgroundImage"];
    }

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

    if(![options[@"attributionURL"] isEqual:[NSNull null]] && options[@"attributionURL"] != nil) {
        NSString *attrURL = [RCTConvert NSString:options[@"attributionURL"]];
        [items setObject: attrURL forKey: @"com.instagram.sharedSticker.contentURL"];
    }

    NSString *backgroundTopColor;
     if(![options[@"backgroundTopColor"] isEqual:[NSNull null]] && options[@"backgroundTopColor"] != nil) {
        backgroundTopColor = [RCTConvert NSString:options[@"backgroundTopColor"]];
    } else {
        backgroundTopColor = @"#906df4";
    }
    [items setObject: backgroundTopColor forKey: @"com.instagram.sharedSticker.backgroundTopColor"];

    NSString *backgroundBottomColor;
    if(![options[@"backgroundBottomColor"] isEqual:[NSNull null]] && options[@"backgroundBottomColor"] != nil) {
        backgroundBottomColor = [RCTConvert NSString:options[@"backgroundBottomColor"]];
    } else {
        backgroundBottomColor = @"#837DF4";
    }
    [items setObject: backgroundBottomColor forKey: @"com.instagram.sharedSticker.backgroundBottomColor"];

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
// https://instagram.fhrk1-1.fna.fbcdn.net/vp/80c479ffc246a9320e614fa4def6a3dc/5C667D3F/t51.12442-15/e35/50679864_1663709050595244_6964601913751831460_n.jpg?_nc_ht=instagram.fhrk1-1.fna.fbcdn.net
@end
