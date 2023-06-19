//
//  GenericShare.m
//  RNShare
//
//  Created by Diseño Uno BBCL on 23-07-16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "GenericShare.h"

@implementation GenericShare
    RCT_EXPORT_MODULE();
- (void)shareSingle:(NSDictionary *)options
    reject:(RCTPromiseRejectBlock)reject
    resolve:(RCTPromiseResolveBlock)resolve
    serviceType:(NSString*)serviceType
    inAppBaseUrl:(NSString *)inAppBaseUrl {

    NSLog(@"Try open view");
    if([serviceType isEqualToString:@"com.apple.social.twitter"]) {
        SLComposeViewController *composeController = [SLComposeViewController  composeViewControllerForServiceType:serviceType];

        NSURL *URL = [RCTConvert NSURL:options[@"url"]];
        if (URL) {
            if (URL.fileURL || [URL.scheme.lowercaseString isEqualToString:@"data"]) {
                NSError *error;
                NSData *data = [NSData dataWithContentsOfURL:URL
                                                     options:(NSDataReadingOptions)0
                                                       error:&error];
                if (!data) {
                    reject(@"no data",@"no data",error);
                    return;
                }
                UIImage *image = [UIImage imageWithData: data];
                [composeController addImage:image];

            } else {
                [composeController addURL:URL];
            }
        }

        if ([options objectForKey:@"message"] && [options objectForKey:@"message"] != [NSNull null]) {
            NSString *text = [RCTConvert NSString:options[@"message"]];
            [composeController setInitialText:text];
        }


        UIViewController *ctrl = RCTPresentedViewController();
        [ctrl presentViewController:composeController animated:YES completion:Nil];
        resolve(@[@true, @""]);
      } else {
        NSString *errorMessage = @"Not installed";
        NSDictionary *userInfo = @{NSLocalizedFailureReasonErrorKey: NSLocalizedString(errorMessage, nil)};
        NSError *error = [NSError errorWithDomain:@"com.rnshare" code:1 userInfo:userInfo];

        NSLog(@"%@", errorMessage);
          reject(@"com.rnshare",@"Not installed",error);

        NSString *escapedString = [options[@"message"] stringByAddingPercentEncodingWithAllowedCharacters:[NSCharacterSet URLHostAllowedCharacterSet]];

        if ([options[@"social"] isEqualToString:@"twitter"]) {
          NSString *URL = [NSString stringWithFormat:@"https://twitter.com/intent/tweet?text=%@&url=%@", escapedString, options[@"url"]];
          [self openScheme:URL];
        }

        if ([options[@"social"] isEqualToString:@"facebook"]) {
          NSString *URL = [NSString stringWithFormat:@"https://www.facebook.com/sharer/sharer.php?u=%@", options[@"url"]];
          [self openScheme:URL];
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
          NSLog(@"Open %@", schemeURL);
      }

  }

  @end
