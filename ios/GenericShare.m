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
    if([SLComposeViewController isAvailableForServiceType:SLServiceTypeFacebook]) {

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
    } else {
        NSLog(@"No installed");
        //  TODO: Add web url share
    }


}


@end
