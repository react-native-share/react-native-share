//
//  LinkedinShare.m
//  RNShare
//
//  Created by Ralf Nieuwenhuizen on 12-04-17.
//

#import "LinkedinShare.h"
#import <AVFoundation/AVFoundation.h>
@import Photos;

@implementation LinkedinShare
    RCT_EXPORT_MODULE();
- (void)shareSingle:(NSDictionary *)options
    reject:(RCTPromiseRejectBlock)reject
    resolve:(RCTPromiseResolveBlock)resolve {
    
    NSLog(@"Try open view");
    
    NSString *url = [NSString stringWithFormat:@"https://www.linkedin.com/shareArticle/?url=%@", options[@"url"]];
    NSURL *shareURL = [NSURL URLWithString:[url stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];

  if ([[UIApplication sharedApplication] canOpenURL: shareURL]) {
      [[UIApplication sharedApplication] openURL:shareURL];
      resolve(@[@true, @""]);
    } else {
        // Cannot open Linkedin
        NSString *stringURL = @"https://apps.apple.com/us/app/linkedin-network-job-finder/id288429040";
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
            [self savePictureAndOpenLinkedin: image
                              reject: reject
                              resolve: resolve];
        }
    } else {
        [[UIApplication sharedApplication] openURL: [NSURL URLWithString:@"linkedin://camera"]];
        resolve(@[@true, @""]);
    }
}

-(void)savePictureAndOpenLinkedin:(UIImage *)base64Image
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
            NSURL *LinkedinURL = [NSURL URLWithString:[NSString stringWithFormat:@"linkedin://library?LocalIdentifier=\%@", [placeholder localIdentifier]]];
            
            if ([[UIApplication sharedApplication] canOpenURL:LinkedinURL]) {
                if (@available(iOS 10.0, *)) {
                    [[UIApplication sharedApplication] openURL:LinkedinURL options:@{} completionHandler:NULL];
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
    NSString *writePath = [NSTemporaryDirectory() stringByAppendingPathComponent:@"linkedin"];
    if (![data writeToFile:writePath atomically:YES]) {
        return nil;
    }
    return [NSURL fileURLWithPath:writePath];
}

@end
