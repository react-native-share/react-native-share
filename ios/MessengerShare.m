#import "MessengerShare.h"

#import <React/RCTConvert.h>

@implementation MessengerShare
RCT_EXPORT_MODULE();

- (void)shareSingle:(NSDictionary *)options reject:(RCTPromiseRejectBlock)reject resolve:(RCTPromiseResolveBlock)resolve {

  if ([options objectForKey:@"url"] && [options objectForKey:@"url"] != [NSNull null]) {

    NSString *urlString = [NSString stringWithFormat:@"fb-messenger://share?link=%@", [RCTConvert NSString:options[@"url"]]];
    NSURL *url = [NSURL URLWithString:urlString];

    if ([[UIApplication sharedApplication] canOpenURL:url]) {
      [[UIApplication sharedApplication] openURL:url options:@{} completionHandler:nil];

      resolve(@[@true, @""]);
    } else {
      // Cannot open Messenger
      NSString *contentLinkString = @"https://apps.apple.com/us/app/messenger/id454638411";
      NSURL *url = [NSURL URLWithString:contentLinkString];
      [[UIApplication sharedApplication] openURL:url options:@{} completionHandler:nil];

      NSString *errorMessage = @"Not installed";
      NSDictionary *userInfo = @{NSLocalizedFailureReasonErrorKey: NSLocalizedString(errorMessage, nil)};
      NSError *error = [NSError errorWithDomain:@"com.rnshare" code:1 userInfo:userInfo];

      NSLog(@"%@", errorMessage);
      reject(@"Not installed",@"Not installed",error);
    }
  }
}

@end
