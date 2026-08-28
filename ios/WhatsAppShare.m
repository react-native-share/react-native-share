//
//  WhatsAppShare.m
//  RNShare
//
//  Created by Diseño Uno BBCL on 23-07-16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "WhatsAppShare.h"
#import "RNShareUtils.h"

typedef NS_ENUM(NSInteger, MessageType) {
  MessageTypeImage,
  MessageTypeVideo,
  MessageTypeText,
  MessageTypeAudio
};

@implementation WhatsAppShare {
    UIDocumentInteractionController *documentInteractionController;
    BOOL preparingMedia;
    BOOL menuVisible;
    BOOL sendingDocument;
}
RCT_EXPORT_MODULE();

- (void)shareSingle:(NSDictionary *)options
            reject:(RCTPromiseRejectBlock)reject
           resolve:(RCTPromiseResolveBlock)resolve {
    if (preparingMedia || menuVisible || sendingDocument) {
        reject(@"EINPROGRESS", @"A WhatsApp media share is already in progress", nil);
        return;
    }
    NSString *url = [RCTConvert NSString:options[@"url"]];
    NSString *message = [RCTConvert NSString:options[@"message"]] ?: @"";
    if (message.length == 0 && url.length == 0) {
        reject(@"EINVAL", @"A message or URL is required", nil);
        return;
    }
    if (![self isWhatsAppAvailable]) {
        [self handleError:@"Not Installed" code:1 rejectFn:reject];
        return;
    }
    MessageType type = [self getMessageType:url];
    if (type == MessageTypeText) {
        if (url.length > 0) message = message.length > 0 ? [NSString stringWithFormat:@"%@ %@", message, url] : url;
        NSMutableArray *queryItems = [NSMutableArray array];
        NSString *phone = [RCTConvert NSString:options[@"whatsAppNumber"]];
        if (phone.length > 0) [queryItems addObject:[NSURLQueryItem queryItemWithName:@"phone" value:phone]];
        [queryItems addObject:[NSURLQueryItem queryItemWithName:@"text" value:message]];
        NSURL *URL = [RNShareUtils URLWithString:@"whatsapp://send" queryItems:queryItems];
        [[UIApplication sharedApplication] openURL:URL options:@{} completionHandler:^(BOOL success) {
            if (success) {
                resolve(@[@true, @""]);
            } else {
                [self handleError:@"Unable to open WhatsApp" code:2 rejectFn:reject];
            }
        }];
        return;
    }

    preparingMedia = YES;
    dispatch_async(dispatch_get_global_queue(QOS_CLASS_USER_INITIATED, 0), ^{
        NSURL *URL = [url hasPrefix:@"/"] ? [NSURL fileURLWithPath:url] : [RCTConvert NSURL:url];
        BOOL isData = [URL.scheme.lowercaseString isEqualToString:@"data"];
        NSURL *preparedURL = nil;
        if (type == MessageTypeImage) {
            NSData *data = URL ? [NSData dataWithContentsOfURL:URL] : nil;
            UIImage *image = data ? [UIImage imageWithData:data] : nil;
            NSData *jpeg = image ? UIImageJPEGRepresentation(image, 1.0) : nil;
            if (jpeg) preparedURL = [RNShareUtils getPathFromFilename:@"image.jpg" with:jpeg];
        } else if (isData) {
            NSData *data = [NSData dataWithContentsOfURL:URL];
            NSString *extension = [RNShareUtils getExtensionFromBase64:url] ?: (type == MessageTypeVideo ? @"mp4" : @"mp3");
            if (data) preparedURL = [RNShareUtils getPathFromFilename:[@"file" stringByAppendingPathExtension:extension] with:data];
        } else if (URL.isFileURL) {
            BOOL directory = NO;
            NSFileManager *manager = NSFileManager.defaultManager;
            if ([manager fileExistsAtPath:URL.path isDirectory:&directory] && !directory && [manager isReadableFileAtPath:URL.path]) {
                preparedURL = URL;
            }
        }
        dispatch_async(dispatch_get_main_queue(), ^{
            preparingMedia = NO;
            if (!preparedURL) {
                [self handleError:@"Unable to prepare media attachment" code:2 rejectFn:reject];
                return;
            }
            NSString *UTI = type == MessageTypeImage ? @"net.whatsapp.image" : type == MessageTypeVideo ? @"net.whatsapp.movie" : @"net.whatsapp.audio";
            [self shareMedia:preparedURL documentUTI:UTI resolve:resolve reject:reject];
        });
    });
}

- (MessageType)getMessageType:(NSString *)url {
    if (url.length == 0) return MessageTypeText;
    if (url.length >= 5 && [url compare:@"data:" options:NSCaseInsensitiveSearch range:NSMakeRange(0, 5)] == NSOrderedSame) {
        NSString *mime = [RNShareUtils getMimeTypeFromBase64:url].lowercaseString;
        if ([mime hasPrefix:@"image/"]) return MessageTypeImage;
        if ([mime hasPrefix:@"video/"]) return MessageTypeVideo;
        if ([mime hasPrefix:@"audio/"]) return MessageTypeAudio;
        return MessageTypeText;
    }
    NSURL *URL = [url hasPrefix:@"/"] ? [NSURL fileURLWithPath:url] : [NSURL URLWithString:url];
    if (!URL.isFileURL) return MessageTypeText;
    NSString *extension = URL.pathExtension.lowercaseString;
    if ([@[@"png", @"jpeg", @"jpg", @"gif"] containsObject:extension]) return MessageTypeImage;
    if ([@[@"wam", @"mp4"] containsObject:extension]) return MessageTypeVideo;
    if ([@[@"mp3", @"aac", @"ogg", @"wav", @"m4a"] containsObject:extension]) return MessageTypeAudio;
    return MessageTypeText;
}

- (BOOL)isWhatsAppAvailable {
    if ([[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:@"whatsapp://app"]]) return YES;
    [[UIApplication sharedApplication] openURL:[NSURL URLWithString:@"https://itunes.apple.com/app/whatsapp-messenger/id310633997"] options:@{} completionHandler:nil];
    return NO;
}

- (void)handleError:(NSString *)message code:(NSInteger)code rejectFn:(RCTPromiseRejectBlock)reject {
    NSError *error = [NSError errorWithDomain:@"com.rnshare" code:code userInfo:@{NSLocalizedFailureReasonErrorKey: message}];
    reject(@"com.rnshare", message, error);
}

-(UIView *)presentationView {
  UIWindow *window = nil;

  if (@available(iOS 13.0, *)) {
    for (UIScene *scene in UIApplication.sharedApplication.connectedScenes) {
      if (![scene isKindOfClass:[UIWindowScene class]]) {
        continue;
      }
      UIWindowScene *windowScene = (UIWindowScene *)scene;
      if (windowScene.activationState != UISceneActivationStateForegroundActive) {
        continue;
      }
      for (UIWindow *candidate in windowScene.windows) {
        if (candidate.isKeyWindow) {
          window = candidate;
          break;
        }
      }
      if (window != nil) {
        break;
      }
    }
  }

  if (window == nil) {
    for (UIWindow *candidate in UIApplication.sharedApplication.windows) {
      if (candidate.isKeyWindow) {
        window = candidate;
        break;
      }
    }
  }

  if (window == nil) {
    window = UIApplication.sharedApplication.windows.firstObject;
  }

  UIViewController *viewController = window.rootViewController;
  if (viewController == nil) {
    return nil;
  }
  while (viewController.presentedViewController != nil) {
    viewController = viewController.presentedViewController;
  }

  return viewController.view;
}


- (void)shareMedia:(NSURL *)URL
      documentUTI:(NSString *)documentUTI
          resolve:(RCTPromiseResolveBlock)resolve
           reject:(RCTPromiseRejectBlock)reject {
    UIView *view = [self presentationView];
    if (!view || ![[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:@"whatsapp://app"]]) {
        [self handleError:@"Unable to present WhatsApp media share" code:3 rejectFn:reject];
        return;
    }
    documentInteractionController = [UIDocumentInteractionController interactionControllerWithURL:URL];
    documentInteractionController.UTI = documentUTI;
    documentInteractionController.delegate = self;
    sendingDocument = NO;
    menuVisible = YES;
    if (![documentInteractionController presentOpenInMenuFromRect:view.bounds inView:view animated:YES]) {
        menuVisible = NO;
        documentInteractionController.delegate = nil;
        documentInteractionController = nil;
        [self handleError:@"Unable to present WhatsApp media share" code:3 rejectFn:reject];
        return;
    }
    resolve(@[@true, @""]);
}

- (void)documentInteractionControllerDidDismissOpenInMenu:(UIDocumentInteractionController *)controller {
    if (controller == documentInteractionController) menuVisible = NO;
    // Retain the controller through handoff; dismissal can precede its sending callbacks.
}

- (void)documentInteractionController:(UIDocumentInteractionController *)controller
       willBeginSendingToApplication:(NSString *)application {
    if (controller == documentInteractionController) sendingDocument = YES;
}

- (void)documentInteractionController:(UIDocumentInteractionController *)controller
          didEndSendingToApplication:(NSString *)application {
    if (controller != documentInteractionController) return;
    sendingDocument = NO;
    menuVisible = NO;
    controller.delegate = nil;
    documentInteractionController = nil;
}

@end
