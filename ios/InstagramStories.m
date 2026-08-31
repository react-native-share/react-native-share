//
//  InstagramStories.m
//  RNShare
//
//  Created by Nikita Logachev on 13.02.2019.
//  link: https://github.com/loga4
//

#import "InstagramStories.h"
#import "RNShareUtils.h"
#import <Photos/Photos.h>

@implementation InstagramStories
RCT_EXPORT_MODULE();

- (void)openInstagramWithItems:(NSDictionary *)items
                    urlScheme:(NSURL *)urlScheme
                       reject:(RCTPromiseRejectBlock)reject
                      resolve:(RCTPromiseResolveBlock)resolve {
    dispatch_async(dispatch_get_main_queue(), ^{
        if (![[UIApplication sharedApplication] canOpenURL:urlScheme]) {
            reject(@"EUNAVAILABLE", @"Instagram Stories is no longer available", nil);
            return;
        }
        NSDictionary *pasteboardOptions = @{UIPasteboardOptionExpirationDate: [NSDate.date dateByAddingTimeInterval:60 * 5]};
        [[UIPasteboard generalPasteboard] setItems:@[items] options:pasteboardOptions];
        [[UIApplication sharedApplication] openURL:urlScheme options:@{} completionHandler:^(BOOL success) {
            if (success) {
                resolve(@[@true, @""]);
            } else {
                reject(@"EUNAVAILABLE", @"Unable to open Instagram Stories", nil);
            }
        }];
    });
}

- (void)shareSingle:(NSDictionary *)options
            reject:(RCTPromiseRejectBlock)reject
           resolve:(RCTPromiseResolveBlock)resolve {
    NSString *appId = [RCTConvert NSString:options[@"appId"]];
    if (appId.length == 0) {
        reject(@"EINVAL", @"An appId is required", nil);
        return;
    }
    NSURL *urlScheme = [RNShareUtils URLWithString:@"instagram-stories://share" queryItems:@[[NSURLQueryItem queryItemWithName:@"source_application" value:appId]]];
    if (![[UIApplication sharedApplication] canOpenURL:urlScheme]) {
        reject(@"cannot open URL", @"cannot open URL", [self fallbackInstagram]);
        return;
    }

    RCTPromiseRejectBlock rejectOnMain = ^(NSString *code, NSString *message, NSError *error) {
        dispatch_async(dispatch_get_main_queue(), ^{ reject(code, message, error); });
    };
    dispatch_async(dispatch_get_global_queue(QOS_CLASS_USER_INITIATED, 0), ^{
        NSMutableDictionary *items = [NSMutableDictionary dictionary];
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
                items[[@"com.instagram.sharedSticker." stringByAppendingString:key]] = png;
            }
        }
        NSDictionary *keys = @{@"attributionURL": @"contentURL", @"linkUrl": @"linkURL", @"linkText": @"linkText"};
        for (NSString *key in keys) {
            NSString *value = [RCTConvert NSString:options[key]];
            if (value != nil) items[[@"com.instagram.sharedSticker." stringByAppendingString:keys[key]]] = value;
        }
        items[@"com.instagram.sharedSticker.backgroundTopColor"] = [RCTConvert NSString:options[@"backgroundTopColor"]] ?: @"#906df4";
        items[@"com.instagram.sharedSticker.backgroundBottomColor"] = [RCTConvert NSString:options[@"backgroundBottomColor"]] ?: @"#837DF4";

        NSString *video = [RCTConvert NSString:options[@"backgroundVideo"]];
        if (video == nil) {
            [self openInstagramWithItems:items urlScheme:urlScheme reject:rejectOnMain resolve:resolve];
            return;
        }
        NSURL *videoURL = [RCTConvert NSURL:video];
        if (videoURL.isFileURL || [videoURL.scheme.lowercaseString isEqualToString:@"data"]) {
            NSData *data = [NSData dataWithContentsOfURL:videoURL];
            if (!data) {
                rejectOnMain(@"EINVAL", @"Unable to read background video", nil);
                return;
            }
            items[@"com.instagram.sharedSticker.backgroundVideo"] = data;
            [self openInstagramWithItems:items urlScheme:urlScheme reject:rejectOnMain resolve:resolve];
            return;
        }

        NSString *assetId = [video hasPrefix:@"ph://"] ? [video substringFromIndex:5] : nil;
        if (assetId == nil) {
            NSURLComponents *components = [NSURLComponents componentsWithString:video];
            for (NSURLQueryItem *item in components.queryItems) {
                if ([item.name isEqualToString:@"id"]) {
                    assetId = item.value;
                    break;
                }
            }
        }
        if (assetId.length == 0) {
            rejectOnMain(@"EINVAL", @"Background video has no Photos asset identifier", nil);
            return;
        }
        PHAsset *asset = [PHAsset fetchAssetsWithLocalIdentifiers:@[assetId] options:nil].firstObject;
        if (!asset) {
            rejectOnMain(@"EINVAL", @"Background video asset was not found", nil);
            return;
        }
        PHVideoRequestOptions *requestOptions = [[PHVideoRequestOptions alloc] init];
        requestOptions.networkAccessAllowed = YES;
        requestOptions.deliveryMode = PHVideoRequestOptionsDeliveryModeHighQualityFormat;
        [[PHImageManager defaultManager] requestAVAssetForVideo:asset options:requestOptions resultHandler:^(AVAsset *avAsset, AVAudioMix *audioMix, NSDictionary *info) {
            NSData *data = [avAsset isKindOfClass:AVURLAsset.class] ? [NSData dataWithContentsOfURL:((AVURLAsset *)avAsset).URL] : nil;
            if (!data) {
                rejectOnMain(@"EINVAL", @"Unable to load background video asset", nil);
                return;
            }
            items[@"com.instagram.sharedSticker.backgroundVideo"] = data;
            [self openInstagramWithItems:items urlScheme:urlScheme reject:rejectOnMain resolve:resolve];
        }];
    });
}

- (NSError *)fallbackInstagram {
    [[UIApplication sharedApplication] openURL:[NSURL URLWithString:@"https://itunes.apple.com/app/instagram/id389801252"] options:@{} completionHandler:nil];
    return [NSError errorWithDomain:@"com.rnshare" code:1 userInfo:@{NSLocalizedFailureReasonErrorKey: @"Not installed"}];
}
@end
