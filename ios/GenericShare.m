//
//  GenericShare.m
//  RNShare
//
//  Created by Diseño Uno BBCL on 23-07-16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "GenericShare.h"
#import "RNShareUtils.h"

@implementation GenericShare
    RCT_EXPORT_MODULE();
- (void)shareSingle:(NSDictionary *)options
    reject:(RCTPromiseRejectBlock)reject
    resolve:(RCTPromiseResolveBlock)resolve
    serviceType:(NSString*)serviceType
    inAppBaseUrl:(NSString *)inAppBaseUrl {

    NSString *message = [RCTConvert NSString:options[@"message"]] ?: @"";
    NSURL *URL = [RCTConvert NSURL:options[@"url"]];
    if (message.length == 0 && !URL) {
        reject(@"EINVAL", @"A message or URL is required", nil);
        return;
    }
    if([[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:inAppBaseUrl]]) {
        BOOL isImage = URL.fileURL || [URL.scheme.lowercaseString isEqualToString:@"data"];
        void (^present)(UIImage *) = ^(UIImage *image) {
            UIViewController *ctrl = RCTPresentedViewController();
            SLComposeViewController *composeController = [SLComposeViewController composeViewControllerForServiceType:serviceType];
            if (!ctrl || !composeController) {
                reject(@"EUNAVAILABLE", @"Unable to present share composer", nil);
                return;
            }
            if ((isImage && ![composeController addImage:image]) ||
                (!isImage && URL && ![composeController addURL:URL]) ||
                (message.length > 0 && ![composeController setInitialText:message])) {
                reject(@"EINVAL", @"Unable to add content to share composer", nil);
                return;
            }
            [ctrl presentViewController:composeController animated:YES completion:^{
                resolve(@[@true, @""]);
            }];
        };
        if (isImage) {
            dispatch_async(dispatch_get_global_queue(QOS_CLASS_USER_INITIATED, 0), ^{
                NSError *error = nil;
                NSData *data = [NSData dataWithContentsOfURL:URL options:0 error:&error];
                UIImage *image = data ? [UIImage imageWithData:data] : nil;
                dispatch_async(dispatch_get_main_queue(), ^{
                    if (!image) {
                        reject(@"EINVAL", @"Unable to read shared image", error);
                        return;
                    }
                    present(image);
                });
            });
        } else {
            present(nil);
        }
      } else {
        NSString *errorMessage = @"Not installed";
        NSDictionary *userInfo = @{NSLocalizedFailureReasonErrorKey: NSLocalizedString(errorMessage, nil)};
        NSError *error = [NSError errorWithDomain:@"com.rnshare" code:1 userInfo:userInfo];

        NSLog(@"%@", errorMessage);
          reject(@"com.rnshare",@"Not installed",error);

        NSString *url = [RCTConvert NSString:options[@"url"]] ?: @"";

        if ([options[@"social"] isEqualToString:@"twitter"]) {
          NSURL *URL = [RNShareUtils URLWithString:@"https://twitter.com/intent/tweet" queryItems:@[
              [NSURLQueryItem queryItemWithName:@"text" value:message],
              [NSURLQueryItem queryItemWithName:@"url" value:url]
          ]];
          [self openScheme:URL.absoluteString];
        }

        if ([options[@"social"] isEqualToString:@"facebook"]) {
          NSURL *URL = [RNShareUtils URLWithString:@"https://www.facebook.com/sharer/sharer.php" queryItems:@[[NSURLQueryItem queryItemWithName:@"u" value:url]]];
          [self openScheme:URL.absoluteString];
        }

      }
  }
  - (void)openScheme:(NSString *)scheme {
      UIApplication *application = [UIApplication sharedApplication];
      NSURL *schemeURL = [NSURL URLWithString:scheme];

      if ([application respondsToSelector:@selector(openURL:options:completionHandler:)]) {
          if (@available(iOS 10.0, *)) {
              [application openURL:schemeURL options:@{} completionHandler:nil];
          }
      }

  }

  @end
