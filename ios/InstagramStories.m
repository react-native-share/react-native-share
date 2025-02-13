//
//  InstagramStories.m
//  RNShare
//
//  Created by Nikita Logachev on 13.02.2019.
//  link: https://github.com/loga4
//

// import RCTLog
#import <React/RCTLog.h>
#import <Photos/Photos.h>

#import "InstagramStories.h"

@implementation InstagramStories
RCT_EXPORT_MODULE();

- (void)openInstagramWithItems:(NSDictionary *)items urlScheme:(NSURL *)urlScheme resolve:(RCTPromiseResolveBlock)resolve {
    // Putting dictionary of options inside an array
    NSArray *pasteboardItems = @[items];
    NSDictionary *pasteboardOptions = @{UIPasteboardOptionExpirationDate : [[NSDate date] dateByAddingTimeInterval:60 * 5]};

    [[UIPasteboard generalPasteboard] setItems:pasteboardItems options:pasteboardOptions];
    [[UIApplication sharedApplication] openURL:urlScheme options:@{} completionHandler:nil];

    resolve(@[@true, @""]);
}

- (void)shareSingle:(NSDictionary *)options
    reject:(RCTPromiseRejectBlock)reject
    resolve:(RCTPromiseResolveBlock)resolve {

    NSURL *urlScheme = [NSURL URLWithString:[NSString stringWithFormat:@"instagram-stories://share?source_application=%@", options[@"appId"]]];

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

    if(![options[@"linkUrl"] isEqual:[NSNull null]] && options[@"linkUrl"] != nil) {
        NSString *linkURL = [RCTConvert NSString:options[@"linkUrl"]];
        [items setObject: linkURL forKey: @"com.instagram.sharedSticker.linkURL"];
    }

    if(![options[@"linkText"] isEqual:[NSNull null]] && options[@"linkText"] != nil) {
        NSString *linkText = [RCTConvert NSString:options[@"linkText"]];
        [items setObject: linkText forKey: @"com.instagram.sharedSticker.linkText"];
    }

    if(![options[@"backgroundVideo"] isEqual:[NSNull null]] && options[@"backgroundVideo"] != nil) {
        NSURL *backgroundVideoURL = [RCTConvert NSURL:options[@"backgroundVideo"]];

        if ([backgroundVideoURL.scheme isEqualToString:@"file"]) {
            // Handle local file
            NSData *videoData = [NSData dataWithContentsOfURL:backgroundVideoURL];
            if (videoData) {
                [items setObject:videoData forKey:@"com.instagram.sharedSticker.backgroundVideo"];
                [self openInstagramWithItems:items urlScheme:urlScheme resolve:resolve];
            } else {
                NSLog(@"Failed to read local video file");
                [self openInstagramWithItems:items urlScheme:urlScheme resolve:resolve];
            }
        } else {
            NSString *urlString = backgroundVideoURL.absoluteString;
            NSURLComponents *components = [[NSURLComponents alloc] initWithString:urlString];
            NSString *assetId = nil;

            // Get asset ID from URL
            for (NSURLQueryItem *item in components.queryItems) {
                if ([item.name isEqualToString:@"id"]) {
                    assetId = item.value;
                    break;
                }
            }

            if (assetId) {
                // Fetch the asset
                PHFetchResult *fetchResult = [PHAsset fetchAssetsWithLocalIdentifiers:@[assetId] options:nil];
                PHAsset *asset = fetchResult.firstObject;

                if (asset) {
                    PHVideoRequestOptions *options = [[PHVideoRequestOptions alloc] init];
                    options.networkAccessAllowed = YES;
                    options.deliveryMode = PHVideoRequestOptionsDeliveryModeHighQualityFormat;

                    [[PHImageManager defaultManager] requestAVAssetForVideo:asset
                                                                    options:options
                                                            resultHandler:^(AVAsset * _Nullable avAsset, AVAudioMix * _Nullable audioMix, NSDictionary * _Nullable info) {
                        if ([avAsset isKindOfClass:[AVURLAsset class]]) {
                            AVURLAsset *urlAsset = (AVURLAsset *)avAsset;
                            NSData *video = [NSData dataWithContentsOfURL:urlAsset.URL];

                            dispatch_async(dispatch_get_main_queue(), ^{
                                if (video) {
                                    [items setObject:video forKey:@"com.instagram.sharedSticker.backgroundVideo"];
                                    [self openInstagramWithItems:items urlScheme:urlScheme resolve:resolve];
                                } else {
                                    NSLog(@"Failed to convert video asset to NSData");
                                    [self openInstagramWithItems:items urlScheme:urlScheme resolve:resolve];
                                }
                            });
                        }
                    }];
                } else {
                    NSLog(@"Could not find asset with ID: %@", assetId);
                    [self openInstagramWithItems:items urlScheme:urlScheme resolve:resolve];
                }
            }
        }
    } else {
        [self openInstagramWithItems:items urlScheme:urlScheme resolve:resolve];
    }
}

- (NSError*)fallbackInstagram {
    // Cannot open instagram
    NSString *stringURL = @"https://itunes.apple.com/app/instagram/id389801252";
    NSURL *url = [NSURL URLWithString:stringURL];
    [[UIApplication sharedApplication] openURL:url options:@{} completionHandler:nil];

    NSString *errorMessage = @"Not installed";
    NSDictionary *userInfo = @{NSLocalizedFailureReasonErrorKey: NSLocalizedString(errorMessage, nil)};
    NSError *error = [NSError errorWithDomain:@"com.rnshare" code:1 userInfo:userInfo];

    NSLog(errorMessage);
    return error;
}
// https://instagram.fhrk1-1.fna.fbcdn.net/vp/80c479ffc246a9320e614fa4def6a3dc/5C667D3F/t51.12442-15/e35/50679864_1663709050595244_6964601913751831460_n.jpg?_nc_ht=instagram.fhrk1-1.fna.fbcdn.net
@end
