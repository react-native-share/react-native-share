#import "MessengerShare.h"
#import "RNShareUtils.h"

#import <React/RCTConvert.h>

@implementation MessengerShare
RCT_EXPORT_MODULE();

- (void)shareSingle:(NSDictionary *)options reject:(RCTPromiseRejectBlock)reject resolve:(RCTPromiseResolveBlock)resolve {

    NSString *link = [RCTConvert NSString:options[@"url"]];
    if (link.length == 0) {
      reject(@"EINVAL", @"A URL is required", nil);
      return;
    }
    NSURL *url = [RNShareUtils URLWithString:@"fb-messenger://share" queryItems:@[[NSURLQueryItem queryItemWithName:@"link" value:link]]];

    if ([[UIApplication sharedApplication] canOpenURL:url]) {
      [[UIApplication sharedApplication] openURL:url options:@{} completionHandler:^(BOOL success) {
        if (success) {
          resolve(@[@true, @""]);
        } else {
          reject(@"EUNAVAILABLE", @"Unable to open share target", nil);
        }
      }];
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

@end
