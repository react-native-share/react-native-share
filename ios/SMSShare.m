#import "SMSShare.h"

#import <React/RCTConvert.h>

@implementation SMSShare
RCT_EXPORT_MODULE();

- (void)shareSingle:(NSDictionary *)options failureCallback:(RCTResponseErrorBlock)failureCallback successCallback:(RCTResponseSenderBlock)successCallback {

  NSString *urlString = [NSString stringWithFormat:@"sms://%@/&body=%@", [RCTConvert NSString:options[@"recipient"]], [RCTConvert NSString:options[@"message"]]];
  NSURL *url = [NSURL URLWithString:urlString];

  if ([[UIApplication sharedApplication] canOpenURL:url]) {
    [[UIApplication sharedApplication] openURL:url options:@{} completionHandler:nil];

    successCallback(@[@true, @""]);
  } else {
    // Cannot open Messages
    NSString *errorMessage = @"Not installed";
    NSDictionary *userInfo = @{NSLocalizedFailureReasonErrorKey: NSLocalizedString(errorMessage, nil)};
    NSError *error = [NSError errorWithDomain:@"com.rnshare" code:1 userInfo:userInfo];

    NSLog(@"%@", errorMessage);
    failureCallback(error);
  }
}

@end
