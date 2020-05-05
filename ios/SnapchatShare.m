//
//  SnapchatShare.m
//  RNShare
//
//  Created by VincentRoest
//

#import "SnapchatShare.h"
#import <AVFoundation/AVFoundation.h>
@import SCSDKCreativeKit;
@import Photos;

@implementation SnapchatShare {
    SCSDKSnapAPI *_scSdkSnapApi;
}

RCT_EXPORT_MODULE();

-(id)init
{
    self = [super init];
    if(self)
    {
        if (!_scSdkSnapApi) {
            _scSdkSnapApi = [[SCSDKSnapAPI alloc] init];
            NSLog(@"hi");
        }
    }
    return self;
}

- (void *)shareSingle:(NSDictionary *)options
    failureCallback:(RCTResponseErrorBlock)failureCallback
    successCallback:(RCTResponseSenderBlock)successCallback {

    NSLog(@"Try open view");

    // #TODO: Check duration (max 10 secs)
    if ([[UIApplication sharedApplication] canOpenURL: [NSURL URLWithString:@"snapchat://"]]) {
        NSLog(@"video");
        // send a video
        if ([options[@"url"] rangeOfString:@"mp4"].location != NSNotFound) {

            // snap.sticker = sticker; /* Optional */
            NSURL * videoUrl = [NSURL URLWithString: options[@"url"]];
            /* Main image content to be used in Snap */
            @try {
                /* RN FETCH BLOB WOULDNT WORK SO TRY WITH A LOCAL IMAGE
                  -> DRAG TO XCODE -> COPY BUNDLE RESOURCES AND UNCOMMENT
                NSString*thePath=[[NSBundle mainBundle] pathForResource:@"small" ofType:@"mp4"];
                NSURL*videoUrl=[NSURL fileURLWithPath:thePath];
                */

                SCSDKSnapVideo *video = [[SCSDKSnapVideo alloc] initWithVideoUrl:videoUrl];
                SCSDKVideoSnapContent *videoContent = [[SCSDKVideoSnapContent alloc] initWithSnapVideo:video];

                // we use title instead of message because it will get appended to url
                if ([options objectForKey:@"title"]) {
                   videoContent.caption = options[@"title"];
                }
                if ([options objectForKey:@"attachmentUrl"]) {
                   videoContent.attachmentUrl = options[@"attachmentUrl"];
                }

                if ([options objectForKey:@"sticker"]) {
                       NSURL * stickerUrl = [NSURL URLWithString: options[@"sticker"]];
                       bool isAnimated = [options objectForKey:@"isStickerAnimated"] ?: false;
                       SCSDKSnapSticker * sticker = [[SCSDKSnapSticker alloc] initWithStickerUrl:stickerUrl isAnimated:isAnimated];

                       // cgfloats, https://docs.snapchat.com/docs/api/ios/ in SCSDKSnapSticker
                       sticker.posX = 0.5; // half screen
                       sticker.posY = 0.5; // half screen
                       sticker.rotation = 3.14; // 0 - 2pi radians
                       // sticker.height, sticker.width deprecated
                       videoContent.sticker = sticker;
                }

                [_scSdkSnapApi startSendingContent:videoContent completionHandler:^(NSError *error) {
                   /* Handle response */
                   if (error) {
                       failureCallback(error);
                   } else {
                       successCallback(@[]);
                   }
                }];
            } @catch (NSException *exception) {
                // NSInternalInconsistencyException
                failureCallback(@"Could not load file");
            }
            @finally {
            }
        // send image
        } else if ([options[@"url"] rangeOfString:@"jpg"].location != NSNotFound && ![options objectForKey:@"sticker"]) {
            NSURL * imageUrl = [NSURL URLWithString: options[@"url"]];
            /* Main image content to be used in Snap */
            SCSDKSnapPhoto *image = [[SCSDKSnapPhoto alloc] initWithImageUrl:imageUrl];
            SCSDKPhotoSnapContent *imageContent = [[SCSDKPhotoSnapContent alloc] initWithSnapPhoto:image];
            // we use title instead of message because it will get appended to url
            if ([options objectForKey:@"title"]) {
                imageContent.caption = options[@"title"];
            }
            if ([options objectForKey:@"attachmentUrl"]) {
                imageContent.attachmentUrl = options[@"attachmentUrl"];
            }
            // snap.sticker = sticker; /* Optional */

            [_scSdkSnapApi startSendingContent:imageContent completionHandler:^(NSError *error) {
                /* Handle response */
                if (error) {
                    failureCallback(error);
                } else {
                    successCallback(@[]);
                }
            }];
        // send sticker
        } else if ([options[@"url"] rangeOfString:@"jpg"].location != NSNotFound && ![options objectForKey:@"sticker"]) {
            NSURL * stickerUrl = [NSURL URLWithString: options[@"url"]];
            SCSDKSnapSticker *sticker = [[SCSDKSnapSticker alloc] initWithStickerUrl:stickerUrl isAnimated:NO];
            [_scSdkSnapApi startSendingContent:sticker completionHandler:^(NSError *error) {
                /* Handle response */
                if (error) {
                    failureCallback(error);
                } else {
                    successCallback(@[]);
                }
            }];

        } else {
            /* Modeling a Snap using SCSDKNoSnapContent*/
            SCSDKNoSnapContent *snap = [[SCSDKNoSnapContent alloc] init];
            // snap.sticker = sticker; /* Optional */
            // we use title instead of message because it will get appended to url
            if ([options objectForKey:@"sticker"]) {
                   NSURL * stickerUrl = [NSURL URLWithString: options[@"sticker"]];
                   bool isAnimated = [options objectForKey:@"isStickerAnimated"] ?: false;
                   SCSDKSnapSticker * sticker = [[SCSDKSnapSticker alloc] initWithStickerUrl:stickerUrl isAnimated:isAnimated];

                   // cgfloats, https://docs.snapchat.com/docs/api/ios/ in SCSDKSnapSticker
                   sticker.posX = 0.5; // half screen
                   sticker.posY = 0.5; // half screen
                   sticker.rotation = 3.14; // 0 - 2pi radians
                   // sticker.height, sticker.width deprecated
                   snap.sticker = sticker;
            }
            
            if ([options objectForKey:@"title"]) {
                snap.caption = options[@"title "];
            }
            if ([options objectForKey:@"attachmentUrl"]) {
                snap.attachmentUrl = options[@"attachmentUrl"];
            }
            [_scSdkSnapApi startSendingContent:snap completionHandler:^(NSError *error) {
                /* Handle response */
                if (error) {
                    failureCallback(error);
                } else {
                    successCallback(@[]);
                }
            }];
        }

        // prevent release of the _scSdkSnapApi
        // this could be more elegant
        [NSThread sleepForTimeInterval:1.0f];
    } else {
        // Cannot open snapchat
        NSString *stringURL = @"http://itunes.apple.com/app/snapchat/id447188370";
        NSURL *url = [NSURL URLWithString:stringURL];
        [[UIApplication sharedApplication] openURL:url];

        NSString *errorMessage = @"Not installed";
        NSDictionary *userInfo = @{NSLocalizedFailureReasonErrorKey: NSLocalizedString(errorMessage, nil)};
        NSError *error = [NSError errorWithDomain:@"com.rnshare" code:1 userInfo:userInfo];

        failureCallback(error);
    }
}


@end
