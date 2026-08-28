//
//  EmailShare.m
//  RNShare
//
//  Created by Diseño Uno BBCL on 23-07-16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "EmailShare.h"
#import "RNShareUtils.h"

@implementation EmailShare

- (void)shareSingle:(NSDictionary *)options
            reject:(RCTPromiseRejectBlock)reject
           resolve:(RCTPromiseResolveBlock)resolve {
    NSString *message = [RCTConvert NSString:options[@"message"]] ?: @"";
    NSString *subject = [RCTConvert NSString:options[@"subject"]] ?: @"";
    NSString *email = [RCTConvert NSString:options[@"email"]];
    NSArray *urls = [RCTConvert NSArray:options[@"urls"]];
    if (message.length == 0 && subject.length == 0 && email.length == 0 && urls.count == 0) {
        reject(@"EINVAL", @"A message, recipient, subject, or attachment is required", nil);
        return;
    }
    if (![MFMailComposeViewController canSendMail]) {
        reject(@"com.rnshare", @"Mail services are not available.", nil);
        return;
    }

    MFMailComposeViewController *mc = [[MFMailComposeViewController alloc] init];
    mc.mailComposeDelegate = self;
    [mc setToRecipients:email.length > 0 ? @[email] : @[]];
    [mc setSubject:subject];

    for (NSString *url in urls) {
        NSURL *URL = [RCTConvert NSURL:url];
        if (!URL) {
            reject(@"EINVAL", @"Invalid attachment URL", nil);
            return;
        }
        BOOL isDataScheme = [URL.scheme.lowercaseString isEqualToString:@"data"];
        if (URL.isFileURL || isDataScheme) {
            NSError *error;
            NSData *data = [NSData dataWithContentsOfURL:URL options:0 error:&error];
            if (!data) {
                reject(@"no data", @"no data", error);
                return;
            }
            NSString *extension = isDataScheme ? [RNShareUtils getExtensionFromBase64:URL.absoluteString] : URL.pathExtension;
            NSString *mime = isDataScheme
                ? [RNShareUtils getMimeTypeFromBase64:URL.absoluteString]
                : [RNShareUtils getMimeTypeFromExtension:extension];
            NSString *filename = URL.isFileURL ? URL.lastPathComponent : @"file";
            if (urls.count == 1) {
                NSString *customType = [RCTConvert NSString:options[@"type"]];
                if (customType.length > 0) mime = customType;
                NSString *customName = [RCTConvert NSString:options[@"filename"]];
                if (customName.length > 0) {
                    filename = extension.length > 0 ? [customName stringByAppendingPathExtension:extension] : customName;
                }
            }
            [mc addAttachmentData:data mimeType:mime ?: @"application/octet-stream" fileName:filename];
        } else {
            message = message.length > 0 ? [NSString stringWithFormat:@"%@ %@", message, url] : url;
        }
    }
    [mc setMessageBody:message isHTML:NO];
    dispatch_async(dispatch_get_main_queue(), ^{
        UIViewController *controller = RCTPresentedViewController();
        if (!controller) {
            reject(@"EUNAVAILABLE", @"No view controller available to present email", nil);
            return;
        }
        [controller presentViewController:mc animated:YES completion:^{
            resolve(@[@true, @""]);
        }];
    });
}

- (void)mailComposeController:(MFMailComposeViewController *)controller
         didFinishWithResult:(MFMailComposeResult)result
                       error:(nullable NSError *)error {
    dispatch_async(dispatch_get_main_queue(), ^{
        controller.mailComposeDelegate = nil;
        [controller dismissViewControllerAnimated:YES completion:nil];
    });
}

@end
