//
//  FacebookShare.m
//  RNShare
//
//  Created by Diseño Uno BBCL on 23-07-16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "FacebookShare.h"

@implementation FacebookShare 
- (void)shareSingle:(NSDictionary *)options
        failureCallback:(RCTResponseErrorBlock)failureCallback
        successCallback:(RCTResponseSenderBlock)successCallback {
    
    NSLog(@"Try open view");
    if([SLComposeViewController isAvailableForServiceType:SLServiceTypeFacebook]) {
        NSString *serviceType = SLServiceTypeFacebook;
        SLComposeViewController *composeController = [SLComposeViewController  composeViewControllerForServiceType:serviceType];
        
        /*
         // TODO Fix 
         composeController.completionHandler = ^(SLComposeViewControllerResult result) {
            switch(result) {
                case SLComposeViewControllerResultCancelled:
                    failureCallback(@"cancelled");
                    break;
                case SLComposeViewControllerResultDone:
                    successCallback(@"success");
                    break;
            }
            
        };
         */
        
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
    } else {
        NSLog(@"No facebook installed");
    }
    
    
}


@end