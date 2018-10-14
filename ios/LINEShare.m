//
//  LINEShare.m
//  RNShare
//
//  Created by date on 2018/10/14.
//

#import "LINEShare.h"

@implementation LINEShare
    RCT_EXPORT_MODULE();
- (void)shareSingle:(NSDictionary *)options
    failureCallback:(RCTResponseErrorBlock)failureCallback
    successCallback:(RCTResponseSenderBlock)successCallback {
    
    NSLog(@"Try LINE share");
    
    NSString *text = [[NSString alloc] initWithFormat:@"%@ %@", options[@"message"], options[@"url"]];
    NSString *escapedText = [text stringByAddingPercentEncodingWithAllowedCharacters:[NSCharacterSet URLHostAllowedCharacterSet]];
    NSString *url = [NSString stringWithFormat:@"https://line.me/R/msg/text/?%@", escapedText];
    UIApplication *application = [UIApplication sharedApplication];
    NSURL *schemeURL = [NSURL URLWithString:url];
    
    if ([application respondsToSelector:@selector(openURL:options:completionHandler:)]) {
        [application openURL:schemeURL options:@{} completionHandler:nil];
        NSLog(@"Open %@", schemeURL);
    }
}

@end
