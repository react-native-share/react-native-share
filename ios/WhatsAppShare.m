//
//  WhatsAppShare.m
//  RNShare
//
//  Created by Diseño Uno BBCL on 23-07-16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "WhatsAppShare.h"

typedef NS_ENUM(NSInteger, MessageType) {
  MessageTypeImage,
  MessageTypeVideo,
  MessageTypeText,
  MessageTypeAudio
};

@implementation WhatsAppShare
static UIDocumentInteractionController *documentInteractionController;
RCT_EXPORT_MODULE();


- (void) shareSingle:(NSDictionary *)options
reject:(RCTPromiseRejectBlock)reject
resolve:(RCTPromiseResolveBlock)resolve {
    
    NSLog(@"Try open view");
    
    if(![self isAbleToSendMessage: options]){
        return;
    }
    
    if(![self isWhatsAppAvailable]) {
        [self handleError:@"Not Installed" code:1 rejectFn:reject];
        return;
    }
    
    MessageType messageType = [self getMessageType: options[@"url"]];
    
    switch(messageType) {
      case MessageTypeImage:
        [self tryToSendImage: options resolve:resolve reject:reject];
        break;
        
      case MessageTypeVideo:
        [self tryToSendVideo: options resolve:resolve reject:reject];
        break;

      case MessageTypeAudio:
        [self tryToSendAudio:options resolve:resolve reject:reject];
        break;
        
      default:
        [self tryToSendText: options resolve:resolve reject:reject];
    }
    
}

-(void)tryToSendImage:(NSDictionary *)options
              resolve:(RCTPromiseResolveBlock)resolve
              reject:(RCTPromiseRejectBlock)reject {
  UIImage *image;
  NSURL *imageURL = [RCTConvert NSURL:options[@"url"]];
  if(imageURL){
    if (imageURL.fileURL || [imageURL.scheme.lowercaseString isEqualToString:@"data"]) {
        NSError *error;
        NSData *data = [NSData dataWithContentsOfURL:imageURL
                                             options:(NSDataReadingOptions)0
                                               error:&error];
        if (!data) {
          return [self handleError:@"Something went wrong" code:2 rejectFn:reject];
        }
      
        image = [UIImage imageWithData: data];
        NSString *tempPath = NSTemporaryDirectory();
        NSString *filePath = [tempPath stringByAppendingPathComponent:@"image.jpg"];
        
        [UIImageJPEGRepresentation(image, 1.0) writeToFile:filePath atomically:YES];
      
        [self shareMedia:filePath documentUTI:@"net.whatsapp.image"];
      
        resolve(@[@true, @""]);
    }

  }else {
    [self handleError:@"Something went wrong" code:3 rejectFn:reject];
  }
  
}

-(void)tryToSendVideo:(NSDictionary *)options
              resolve:(RCTPromiseResolveBlock)resolve
              reject:(RCTPromiseRejectBlock)reject {
  
  NSLog(@"Sending whatsapp movie");
  [self shareMedia:options[@"url"] documentUTI:@"net.whatsapp.movie"];
  NSLog(@"Done whatsapp movie");
  resolve(@[@true, @""]);
}

- (void)tryToSendAudio:(NSDictionary *)options
               resolve:(RCTPromiseResolveBlock)resolve
               reject:(RCTPromiseRejectBlock)reject {

  NSLog(@"Sending whatsapp audio");
  [self shareMedia:options[@"url"] documentUTI:@"net.whatsapp.audio"];
  NSLog(@"Done whatsapp audio");
  resolve(@[ @true, @"" ]);
}

-(void)tryToSendText:(NSDictionary *)options
             resolve:(RCTPromiseResolveBlock)resolve
             reject:(RCTPromiseRejectBlock)reject {
  
  NSString *text = [RCTConvert NSString:options[@"message"]];
  if (options[@"url"] && options[@"url"] != [NSNull null]) {
    text = [text stringByAppendingString: [@" " stringByAppendingString: options[@"url"]] ];
  }
  NSString *whatsAppNumber = [RCTConvert NSString:options[@"whatsAppNumber"]];
  
  text = (NSString*)CFBridgingRelease(CFURLCreateStringByAddingPercentEscapes(NULL,(CFStringRef) text, NULL,CFSTR("!*'();:@&=+$,/?%#[]"),kCFStringEncodingUTF8));
  
  NSString * urlWhats = whatsAppNumber ? [NSString stringWithFormat:@"whatsapp://send?phone=%@&text=%@", whatsAppNumber, text] : [NSString stringWithFormat:@"whatsapp://send?text=%@", text];
  NSURL * whatsappURL = [NSURL URLWithString:urlWhats];
  
  if ([[UIApplication sharedApplication] canOpenURL: whatsappURL]) {
      [[UIApplication sharedApplication] openURL:whatsappURL options:@{} completionHandler:nil];
      resolve(@[@true, @""]);
  }
}


-(MessageType)getMessageType: (NSString *)url {
  if (!url || url.length == 0) {
    return MessageTypeText;
  }
  NSURL *parsed = [NSURL URLWithString:url];
  NSString *scheme = parsed.scheme.lowercaseString;
  BOOL isFileOrData = scheme && ([scheme isEqualToString:@"file"] || [scheme isEqualToString:@"data"]);
  BOOL isAbsolutePath = [url hasPrefix:@"/"];
  if (!isFileOrData && !isAbsolutePath) {
    return MessageTypeText;
  }
  NSArray *imageExtensions = @[@"png", @"jpeg",@"jpg",@"gif"];
  if([self isMediaType:url mediaExtensions: imageExtensions]){
    return MessageTypeImage;
  }
  
  NSArray *videoExtensions = @[@".wam", @".mp4"];
  if([self isMediaType:url mediaExtensions:videoExtensions]){
    return MessageTypeVideo;
  }

  NSArray *audioExtensions = @[@".mp3", @".aac", @".ogg", @".wav", @".m4a"];
  if ([self isMediaType:url mediaExtensions:audioExtensions]) {
    return MessageTypeAudio;
  }
  
  return MessageTypeText;
}

-(BOOL)isMediaType:(NSString *)url mediaExtensions:(NSArray *)mediaExtensions {
  for(NSString *extension in mediaExtensions){
    if([url rangeOfString:extension].location != NSNotFound){
      return TRUE;
    }
  }
  return FALSE;
}

-(BOOL)isWhatsAppAvailable {
  if([[UIApplication sharedApplication] canOpenURL: [NSURL URLWithString:@"whatsapp://app"]]) {
    NSLog(@"WhastApp installed");
    return true;
  }else {
      // Cannot open whatsapp
      NSString *appStoreStringURL = @"https://itunes.apple.com/app/whatsapp-messenger/id310633997";
      NSURL *appStoreURL = [NSURL URLWithString:appStoreStringURL];
      [[UIApplication sharedApplication] openURL:appStoreURL options:@{} completionHandler:nil];
      return false;
  }
}

-(void)handleError:(NSString *)errorMessage code:(NSInteger)code rejectFn:(RCTPromiseRejectBlock)rejectFn {
  NSDictionary *userInfo = @{NSLocalizedFailureReasonErrorKey: NSLocalizedString(errorMessage, nil)};
  NSError *error = [NSError errorWithDomain:@"com.rnshare" code:code userInfo:userInfo];
  
  NSLog(@"%@", errorMessage);
  return rejectFn(@"com.rnshare",errorMessage,error);
}


-(BOOL)isAbleToSendMessage:(NSDictionary *) options {
  if([options objectForKey:@"message"] && [options objectForKey:@"message"] != [NSNull null]){
    return TRUE;
  }
  return FALSE;
}

-(UIView *)presentationView {
  UIWindow *window = nil;

  if (@available(iOS 13.0, *)) {
    for (UIScene *scene in UIApplication.sharedApplication.connectedScenes) {
      if (![scene isKindOfClass:[UIWindowScene class]]) {
        continue;
      }
      UIWindowScene *windowScene = (UIWindowScene *)scene;
      if (windowScene.activationState != UISceneActivationStateForegroundActive) {
        continue;
      }
      for (UIWindow *candidate in windowScene.windows) {
        if (candidate.isKeyWindow) {
          window = candidate;
          break;
        }
      }
      if (window != nil) {
        break;
      }
    }
  }

  if (window == nil) {
    for (UIWindow *candidate in UIApplication.sharedApplication.windows) {
      if (candidate.isKeyWindow) {
        window = candidate;
        break;
      }
    }
  }

  if (window == nil) {
    window = UIApplication.sharedApplication.windows.firstObject;
  }

  UIViewController *viewController = window.rootViewController;
  if (viewController == nil) {
    return nil;
  }
  while (viewController.presentedViewController != nil) {
    viewController = viewController.presentedViewController;
  }

  return viewController.view;
}

-(void)shareMedia:(NSString *)stringURL documentUTI:(NSString *)documentUTI {
  NSURL *filePath = [NSURL fileURLWithPath:stringURL];
  documentInteractionController = [UIDocumentInteractionController interactionControllerWithURL:filePath];
  documentInteractionController.UTI = documentUTI;
  documentInteractionController.delegate = self;
  UIView *view = [self presentationView];
  if (view == nil) {
    NSLog(@"Unable to find a presentation view for WhatsApp share");
    return;
  }
  [documentInteractionController presentOpenInMenuFromRect:view.bounds inView:view animated:YES];
}

@end
