//
//  InstagramShare.m
//  RNShare
//
//  Created by Ralf Nieuwenhuizen on 12-04-17.
//

#import "InstagramShare.h"
#import <AVFoundation/AVFoundation.h>
@import Photos;

@implementation InstagramShare
    RCT_EXPORT_MODULE();
- (void)shareSingle:(NSDictionary *)options
    reject:(RCTPromiseRejectBlock)reject
    resolve:(RCTPromiseResolveBlock)resolve {
    
    NSLog(@"Try open view");
    
    NSURL * shareURL;
    float videoDurationSeconds = 0.0f;
    NSString* url = options[@"url"];
    if (url) {
        NSURL * fileURL = [NSURL URLWithString: options[@"url"]];
        AVURLAsset* videoAsset = [AVURLAsset URLAssetWithURL:fileURL options:nil];
        CMTime videoDuration = videoAsset.duration;
        float videoDurationSeconds = CMTimeGetSeconds(videoDuration);
        
        NSLog(@"Video duration: %f seconds for file %@", videoDurationSeconds, videoAsset.URL.absoluteString);
    } else {
        //this will send message directly to instagram DM with plain text
        shareURL = [NSURL URLWithString:[NSString stringWithFormat:@"instagram://sharesheet?text=%@", options[@"message"]]];
    }
    
    if (shareURL) {
        NSLog(@"url is already available, no need to do anything");
    } else if (videoDurationSeconds <= 60.0f) {
        // Instagram doesn't allow sharing videos longer than 60 seconds on iOS anymore. (next button is not responding, trim is unavailable)
        NSString *phIdentifier= [options[@"url"] stringByReplacingOccurrencesOfString:@"ph://" withString:@""];
        NSString * urlString = [NSString stringWithFormat:@"instagram://library?LocalIdentifier=%@", phIdentifier];
        shareURL = [NSURL URLWithString:urlString];
    } else {
        shareURL = [NSURL URLWithString:@"instagram://camera"];
    }
    
    if ([[UIApplication sharedApplication] canOpenURL: shareURL]) {
        [[UIApplication sharedApplication] openURL: shareURL];
        resolve(@[@true, @""]);
    } else {
        // Cannot open instagram
        NSString *stringURL = @"https://itunes.apple.com/app/instagram/id389801252";
        NSURL *url = [NSURL URLWithString:stringURL];
        
        [[UIApplication sharedApplication] openURL:url options:@{} completionHandler:^(BOOL success) {}];
        
        NSString *errorMessage = @"Not installed";
        NSDictionary *userInfo = @{NSLocalizedFailureReasonErrorKey: NSLocalizedString(errorMessage, nil)};
        NSError *error = [NSError errorWithDomain:@"com.rnshare" code:1 userInfo:userInfo];
        
        NSLog(@"%@", errorMessage);
        reject(@"com.rnshare",@"Not installed",error);
    } 
}

- (void)shareSingleImage:(NSDictionary *)options
         reject:(RCTPromiseRejectBlock)reject
         resolve:(RCTPromiseResolveBlock)resolve {
    
    UIImage *image;
    NSURL *imageURL = [RCTConvert NSURL:options[@"url"]];
    if (imageURL) {
        if (imageURL.fileURL || [imageURL.scheme.lowercaseString isEqualToString:@"data"]) {
            NSError *error;
            NSData *data = [NSData dataWithContentsOfURL:imageURL
                                                 options:(NSDataReadingOptions)0
                                                   error:&error];
            if (!data) {
                reject(@"com.rnshare",@"no data",error);
                return;
            }
            image = [UIImage imageWithData: data];
            [self savePictureAndOpenInstagram: image
                              reject: reject
                              resolve: resolve];
        }
    } else {
        [[UIApplication sharedApplication] openURL: [NSURL URLWithString:@"instagram://camera"]];
        resolve(@[@true, @""]);
    }
}

-(void)savePictureAndOpenInstagram:(UIImage *)base64Image
                   reject:(RCTPromiseRejectBlock)reject
                   resolve:(RCTPromiseResolveBlock)resolve {
    
    NSURL *URL = [self fileURLWithTemporaryImageData:UIImageJPEGRepresentation(base64Image, 0.9)];
    __block PHAssetChangeRequest *_mChangeRequest = nil;
    __block PHObjectPlaceholder *placeholder;
    
    [[PHPhotoLibrary sharedPhotoLibrary] performChanges:^{
        
        NSData *pngData = [NSData dataWithContentsOfURL:URL];
        UIImage *image = [UIImage imageWithData:pngData];
        _mChangeRequest = [PHAssetChangeRequest creationRequestForAssetFromImage:image];
        placeholder = _mChangeRequest.placeholderForCreatedAsset;
    } completionHandler:^(BOOL success, NSError *error) {
        
        if (success) {
            NSURL *instagramURL = [NSURL URLWithString:[NSString stringWithFormat:@"instagram://library?LocalIdentifier=\%@", [placeholder localIdentifier]]];
            
            if ([[UIApplication sharedApplication] canOpenURL:instagramURL]) {
                if (@available(iOS 10.0, *)) {
                    [[UIApplication sharedApplication] openURL:instagramURL options:@{} completionHandler:NULL];
                }
                if (resolve != NULL) {
                    resolve(@[@true, @""]);
                }
            }
        }
        else {
            //Error while writing
            if (reject != NULL) {
                reject(@"com.rnshare",@"error",error);
            }
        }
    }];
}

- (NSURL *)fileURLWithTemporaryImageData:(NSData *)data {
    NSString *writePath = [NSTemporaryDirectory() stringByAppendingPathComponent:@"instagram.ig"];
    if (![data writeToFile:writePath atomically:YES]) {
        return nil;
    }
    return [NSURL fileURLWithPath:writePath];
}

@end
