//
//  InstagramShare.m
//  RNShare
//
//  Created by Ralf Nieuwenhuizen on 12-04-17.
//

#import "InstagramShare.h"
#import "RNShareUtils.h"
#import <Photos/Photos.h>

@implementation InstagramShare
RCT_EXPORT_MODULE();

- (void)shareSingle:(NSDictionary *)options
            reject:(RCTPromiseRejectBlock)reject
           resolve:(RCTPromiseResolveBlock)resolve {
    NSString *url = [RCTConvert NSString:options[@"url"]];
    NSURL *shareURL;
    if (url.length > 0) {
        NSString *identifier = [url hasPrefix:@"ph://"] ? [url substringFromIndex:5] : url;
        shareURL = [RNShareUtils URLWithString:@"instagram://library" queryItems:@[[NSURLQueryItem queryItemWithName:@"LocalIdentifier" value:identifier]]];
    } else {
        NSString *message = [RCTConvert NSString:options[@"message"]];
        if (message.length == 0) {
            reject(@"EINVAL", @"A message or URL is required", nil);
            return;
        }
        shareURL = [RNShareUtils URLWithString:@"instagram://sharesheet" queryItems:@[[NSURLQueryItem queryItemWithName:@"text" value:message]]];
    }
    [self openInstagramURL:shareURL reject:reject resolve:resolve];
}

- (void)openInstagramURL:(NSURL *)URL
                 reject:(RCTPromiseRejectBlock)reject
                resolve:(RCTPromiseResolveBlock)resolve {
    if (![[UIApplication sharedApplication] canOpenURL:URL]) {
        [[UIApplication sharedApplication] openURL:[NSURL URLWithString:@"https://itunes.apple.com/app/instagram/id389801252"] options:@{} completionHandler:nil];
        reject(@"com.rnshare", @"Not installed", nil);
        return;
    }
    [[UIApplication sharedApplication] openURL:URL options:@{} completionHandler:^(BOOL success) {
        if (success) {
            resolve(@[@true, @""]);
        } else {
            reject(@"EUNAVAILABLE", @"Unable to open Instagram", nil);
        }
    }];
}

- (void)shareSingleImage:(NSDictionary *)options
                 reject:(RCTPromiseRejectBlock)reject
                resolve:(RCTPromiseResolveBlock)resolve {
    NSURL *imageURL = [RCTConvert NSURL:options[@"url"]];
    if (!imageURL) {
        [self openInstagramURL:[NSURL URLWithString:@"instagram://camera"] reject:reject resolve:resolve];
        return;
    }
    if (!imageURL.isFileURL && ![imageURL.scheme.lowercaseString isEqualToString:@"data"]) {
        reject(@"EINVAL", @"Instagram images must use a file or data URL", nil);
        return;
    }
    dispatch_async(dispatch_get_global_queue(QOS_CLASS_USER_INITIATED, 0), ^{
        NSError *error;
        NSData *data = [NSData dataWithContentsOfURL:imageURL options:0 error:&error];
        UIImage *image = data ? [UIImage imageWithData:data] : nil;
        dispatch_async(dispatch_get_main_queue(), ^{
            if (!image) {
                reject(@"com.rnshare", @"Unable to decode image", error);
                return;
            }
            [self savePictureAndOpenInstagram:image reject:reject resolve:resolve];
        });
    });
}

- (void)savePictureAndOpenInstagram:(UIImage *)image
                            reject:(RCTPromiseRejectBlock)reject
                           resolve:(RCTPromiseResolveBlock)resolve {
    if (!image) {
        reject(@"com.rnshare", @"Unable to decode image", nil);
        return;
    }
    if (![[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:@"instagram://library"]]) {
        reject(@"com.rnshare", @"Not installed", nil);
        return;
    }

    PHAuthorizationStatus status;
    if (@available(iOS 14.0, *)) {
        status = [PHPhotoLibrary authorizationStatusForAccessLevel:PHAccessLevelReadWrite];
    } else {
        status = [PHPhotoLibrary authorizationStatus];
    }
    if (status == PHAuthorizationStatusNotDetermined) {
        void (^completion)(PHAuthorizationStatus) = ^(__unused PHAuthorizationStatus newStatus) {
            dispatch_async(dispatch_get_main_queue(), ^{
                [self savePictureAndOpenInstagram:image reject:reject resolve:resolve];
            });
        };
        if (@available(iOS 14.0, *)) {
            [PHPhotoLibrary requestAuthorizationForAccessLevel:PHAccessLevelReadWrite handler:completion];
        } else {
            [PHPhotoLibrary requestAuthorization:completion];
        }
        return;
    }
    BOOL authorized = status == PHAuthorizationStatusAuthorized;
    if (@available(iOS 14.0, *)) authorized = authorized || status == PHAuthorizationStatusLimited;
    if (!authorized) {
        reject(@"com.rnshare", @"Photo library access not authorized", nil);
        return;
    }

    __block NSString *identifier;
    [[PHPhotoLibrary sharedPhotoLibrary] performChanges:^{
        PHAssetChangeRequest *request = [PHAssetChangeRequest creationRequestForAssetFromImage:image];
        identifier = request.placeholderForCreatedAsset.localIdentifier;
    } completionHandler:^(BOOL success, NSError *error) {
        dispatch_async(dispatch_get_main_queue(), ^{
            if (!success || identifier.length == 0) {
                reject(@"com.rnshare", @"Unable to save image to Photos", error);
                return;
            }
            NSURL *URL = [RNShareUtils URLWithString:@"instagram://library" queryItems:@[[NSURLQueryItem queryItemWithName:@"LocalIdentifier" value:identifier]]];
            [self openInstagramURL:URL reject:reject resolve:resolve];
        });
    }];
}

@end
