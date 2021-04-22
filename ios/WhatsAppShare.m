//
//  FacebookShare.m
//  RNShare
//
//  Created by Diseño Uno BBCL on 23-07-16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "WhatsAppShare.h"

@implementation WhatsAppShare
static UIDocumentInteractionController *documentInteractionController;
RCT_EXPORT_MODULE();
- (void)shareSingle:(NSDictionary *)options
    failureCallback:(RCTResponseErrorBlock)failureCallback
    successCallback:(RCTResponseSenderBlock)successCallback {
    
    NSLog(@"Try open view");
    
    if ([options objectForKey:@"message"] && [options objectForKey:@"message"] != [NSNull null]) {
        NSString *text = [RCTConvert NSString:options[@"message"]];
        text = [text stringByAppendingString: [@" " stringByAppendingString: options[@"url"]] ];
        NSString *whatsAppNumber = [RCTConvert NSString:options[@"whatsAppNumber"]];
        
        if ([[UIApplication sharedApplication] canOpenURL: [NSURL URLWithString:@"whatsapp://app"]]) {
            NSLog(@"WhatsApp installed");
        } else {
            // Cannot open whatsapp
            NSString *stringURL = @"http://itunes.apple.com/app/whatsapp-messenger/id310633997";
            NSURL *url = [NSURL URLWithString:stringURL];
            [[UIApplication sharedApplication] openURL:url];
            
            NSString *errorMessage = @"Not installed";
            NSDictionary *userInfo = @{NSLocalizedFailureReasonErrorKey: NSLocalizedString(errorMessage, nil)};
            NSError *error = [NSError errorWithDomain:@"com.rnshare" code:1 userInfo:userInfo];
            
            NSLog(@"%@", errorMessage);
            return failureCallback(error);
        }
        
        if ([options[@"url"] rangeOfString:@".wam"].location != NSNotFound || [options[@"url"] rangeOfString:@".mp4"].location != NSNotFound) {
            NSLog(@"Sending whatsapp movie");
            documentInteractionController = [UIDocumentInteractionController interactionControllerWithURL:[NSURL fileURLWithPath:options[@"url"]]];
            documentInteractionController.UTI = @"net.whatsapp.movie";
            documentInteractionController.delegate = self;
            
            [documentInteractionController presentOpenInMenuFromRect:CGRectZero inView:[[[[[UIApplication sharedApplication] delegate] window] rootViewController] view] animated:YES];
            NSLog(@"Done whatsapp movie");
            successCallback(@[]);
        } else if ([options[@"url"] rangeOfString:@"png"].location != NSNotFound || [options[@"url"] rangeOfString:@"jpeg"].location != NSNotFound || [options[@"url"] rangeOfString:@"jpg"].location != NSNotFound || [options[@"url"] rangeOfString:@"gif"].location != NSNotFound) {
            UIImage * image;
            NSURL *imageURL = [RCTConvert NSURL:options[@"url"]];
            if (imageURL) {
                if (imageURL.fileURL || [imageURL.scheme.lowercaseString isEqualToString:@"data"]) {
                    NSError *error;
                    NSData *data = [NSData dataWithContentsOfURL:imageURL
                                                         options:(NSDataReadingOptions)0
                                                           error:&error];
                    if (!data) {
                        NSError *error = [NSError errorWithDomain:@"com.rnshare" code:2 userInfo:@{ NSLocalizedDescriptionKey:@"Something went wrong"}];
                        return failureCallback(error);
                    }
                    image = [UIImage imageWithData: data];
                    NSString * documentsPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) objectAtIndex:0];
                    NSString * filePath = [documentsPath stringByAppendingPathComponent:@"/whatsAppTmp.wai"];
                    
                    [UIImageJPEGRepresentation(image, 1.0) writeToFile:filePath atomically:YES];
                    
                    documentInteractionController = [UIDocumentInteractionController interactionControllerWithURL:[NSURL fileURLWithPath:filePath]];
                    documentInteractionController.UTI = @"net.whatsapp.image";
                    documentInteractionController.delegate = self;
                    
                    [documentInteractionController presentOpenInMenuFromRect:CGRectZero inView:[[[[[UIApplication sharedApplication] delegate] window] rootViewController] view] animated:YES];
                    successCallback(@[]);
                }
            } else {
                NSError *error = [NSError errorWithDomain:@"com.rnshare" code:3 userInfo:@{ NSLocalizedDescriptionKey:@"Something went wrong"}];
                return failureCallback(error);
            }
        } else {
            text = (NSString*)CFBridgingRelease(CFURLCreateStringByAddingPercentEscapes(NULL,(CFStringRef) text, NULL,CFSTR("!*'();:@&=+$,/?%#[]"),kCFStringEncodingUTF8));
            
            NSString * urlWhats = whatsAppNumber ? [NSString stringWithFormat:@"whatsapp://send?phone=%@&text=%@", whatsAppNumber, text] : [NSString stringWithFormat:@"whatsapp://send?text=%@", text];
            NSURL * whatsappURL = [NSURL URLWithString:urlWhats];
            
            if ([[UIApplication sharedApplication] canOpenURL: whatsappURL]) {
                [[UIApplication sharedApplication] openURL: whatsappURL];
                successCallback(@[]);
            }
        }
    }
}

@end
