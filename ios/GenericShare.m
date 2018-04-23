//
//  GenericShare.m
//  RNShare
//
//  Created by Diseño Uno BBCL on 23-07-16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "GenericShare.h"

@implementation GenericShare
- (void)shareSingle:(NSDictionary *)options
    failureCallback:(RCTResponseErrorBlock)failureCallback
    successCallback:(RCTResponseSenderBlock)successCallback
    serviceType:(NSString*)serviceType {

    NSLog(@"Try open view");
    if([SLComposeViewController isAvailableForServiceType:serviceType]) {

        SLComposeViewController *composeController = [SLComposeViewController  composeViewControllerForServiceType:serviceType];

        NSURL *URL = [RCTConvert NSURL:options[@"url"]];
        if (URL) {
            if (URL.fileURL || [URL.scheme.lowercaseString isEqualToString:@"data"]) {
                NSError *error;
                NSData *data = [NSData dataWithContentsOfURL:URL
                                                     options:(NSDataReadingOptions)0
                                                       error:&error];
                if (!data) {
                    failureCallback(error);
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


        UIViewController *ctrl = [[[[UIApplication sharedApplication] delegate] window] rootViewController];
        [ctrl presentViewController:composeController animated:YES completion:Nil];
        successCallback(@[]);
      } else {
        NSString *errorMessage = @"Not installed";
        NSDictionary *userInfo = @{NSLocalizedFailureReasonErrorKey: NSLocalizedString(errorMessage, nil)};
        NSError *error = [NSError errorWithDomain:@"com.rnshare" code:1 userInfo:userInfo];

        NSLog(errorMessage);
        failureCallback(error);

        NSString *escapedString = [options[@"message"] stringByAddingPercentEncodingWithAllowedCharacters:[NSCharacterSet URLHostAllowedCharacterSet]];

        if ([options[@"social"] isEqualToString:@"twitter"]) {
          NSString *URL = [NSString stringWithFormat:@"https://twitter.com/intent/tweet?message=%@&url=%@", escapedString, options[@"url"]];
          [self openScheme:URL];
        }

        if ([options[@"social"] isEqualToString:@"facebook"]) {
          NSString *URL = [NSString stringWithFormat:@"https://www.facebook.com/sharer/sharer.php?u=%@", options[@"url"]];
          [self openScheme:URL];
        }

      }
  }
  - (void)openScheme:(NSString *)scheme {
      NSURL *schemeURL = [NSURL URLWithString:scheme];

      UIViewController *rootViewController = [[[UIApplication sharedApplication] delegate] window].rootViewController;
      while(rootViewController.presentedViewController) {
          rootViewController = rootViewController.presentedViewController;
      }

      SFSafariViewController *safariViewController = [[SFSafariViewController alloc] initWithURL:schemeURL];
      UINavigationController *navigationController = [[UINavigationController alloc] initWithRootViewController:safariViewController];

      [navigationController setNavigationBarHidden:YES animated:NO];

      dispatch_async(dispatch_get_main_queue(), ^{
          [rootViewController presentViewController:navigationController animated:YES completion:^{
//              [self.bridge.eventDispatcher sendDeviceEventWithName:@"SFSafariViewControllerDidLoad" body:nil];
          }];
      });
  }

  @end
