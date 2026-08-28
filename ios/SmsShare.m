#import "SmsShare.h"
#import "RNShareUtils.h"

@implementation SmsShare {
    MFMessageComposeViewController *activeController;
}

- (void)shareSingle:(NSDictionary *)options
            reject:(RCTPromiseRejectBlock)reject
           resolve:(RCTPromiseResolveBlock)resolve {
    if (activeController) {
        reject(@"EINPROGRESS", @"An SMS composer is already open", nil);
        return;
    }
    NSString *message = [RCTConvert NSString:options[@"message"]] ?: @"";
    NSString *recipient = [RCTConvert NSString:options[@"recipient"]];
    NSURL *URL = [RCTConvert NSURL:options[@"url"]];
    if (message.length == 0 && !URL) {
        reject(@"EINVAL", @"A message or URL is required", nil);
        return;
    }
    if (![MFMessageComposeViewController canSendText]) {
        reject(@"com.rnshare", @"SMS services are not available.", nil);
        return;
    }

    MFMessageComposeViewController *mc = [[MFMessageComposeViewController alloc] init];
    mc.messageComposeDelegate = self;
    mc.recipients = recipient.length > 0 ? @[recipient] : @[];

    if (URL) {
        BOOL isDataScheme = [URL.scheme.lowercaseString isEqualToString:@"data"];
        if (isDataScheme || URL.isFileURL) {
            NSError *error;
            NSData *data = [NSData dataWithContentsOfURL:URL options:0 error:&error];
            if (!data) {
                reject(@"com.rnshare", @"No data", error);
                return;
            }
            NSString *extension = isDataScheme ? [RNShareUtils getExtensionFromBase64:URL.absoluteString] : URL.pathExtension;
            NSString *filename = URL.isFileURL ? URL.lastPathComponent : (extension.length > 0 ? [@"file" stringByAppendingPathExtension:extension] : @"file");
            NSString *identifier = [RNShareUtils getTypeIdentifierFromExtension:extension];
            if (![mc addAttachmentData:data typeIdentifier:identifier filename:filename]) {
                reject(@"com.rnshare", @"Unable to attach file to SMS", nil);
                return;
            }
        } else {
            NSString *url = [RCTConvert NSString:options[@"url"]];
            message = message.length > 0 ? [NSString stringWithFormat:@"%@ %@", message, url] : url;
        }
    }
    mc.body = message;
    activeController = mc;
    self.resolve = resolve;
    self.reject = reject;

    dispatch_async(dispatch_get_main_queue(), ^{
        UIViewController *controller = RCTPresentedViewController();
        if (!controller) {
            self.resolve = nil;
            self.reject = nil;
            activeController = nil;
            reject(@"EUNAVAILABLE", @"No view controller available to present SMS", nil);
            return;
        }
        [controller presentViewController:mc animated:YES completion:nil];
    });
}

- (void)messageComposeViewController:(MFMessageComposeViewController *)controller
                didFinishWithResult:(MessageComposeResult)result {
    dispatch_async(dispatch_get_main_queue(), ^{
        if (controller != activeController || !self.resolve) return;
        RCTPromiseResolveBlock resolve = self.resolve;
        RCTPromiseRejectBlock reject = self.reject;
        self.resolve = nil;
        self.reject = nil;
        controller.messageComposeDelegate = nil;
        [controller dismissViewControllerAnimated:YES completion:^{
            activeController = nil;
            if (result == MessageComposeResultFailed) {
                reject(@"com.rnshare", @"Failed to send SMS.", nil);
            } else {
                resolve(@[@(result == MessageComposeResultSent), @""]);
            }
        }];
    });
}

@end
