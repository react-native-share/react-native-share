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
  MessageTypeText
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
        NSString * documentsPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) objectAtIndex:0];
        NSString * filePath = [documentsPath stringByAppendingPathComponent:@"/whatsAppTmp.wai"];
        
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

-(void)tryToSendText:(NSDictionary *)options
             resolve:(RCTPromiseResolveBlock)resolve
             reject:(RCTPromiseRejectBlock)reject {
  
  NSString *text = [RCTConvert NSString:options[@"message"]];
  text = [text stringByAppendingString: [@" " stringByAppendingString: options[@"url"]] ];
  NSString *whatsAppNumber = [RCTConvert NSString:options[@"whatsAppNumber"]];
  
  text = (NSString*)CFBridgingRelease(CFURLCreateStringByAddingPercentEscapes(NULL,(CFStringRef) text, NULL,CFSTR("!*'();:@&=+$,/?%#[]"),kCFStringEncodingUTF8));
  
  NSString * urlWhats = whatsAppNumber ? [NSString stringWithFormat:@"whatsapp://send?phone=%@&text=%@", whatsAppNumber, text] : [NSString stringWithFormat:@"whatsapp://send?text=%@", text];
  NSURL * whatsappURL = [NSURL URLWithString:urlWhats];
  
  if ([[UIApplication sharedApplication] canOpenURL: whatsappURL]) {
      [[UIApplication sharedApplication] openURL: whatsappURL];
      resolve(@[@true, @""]);
  }
}


-(MessageType)getMessageType: (NSString *)url {
  NSArray *imageExtensions = @[@"png", @"jpeg",@"jpg",@"gif"];
  if([self isMediaType:url mediaExtensions: imageExtensions]){
    return MessageTypeImage;
  }
  
  NSArray *videoExtensions = @[@".wam", @".mp4"];
  if([self isMediaType:url mediaExtensions:videoExtensions]){
    return MessageTypeVideo;
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
      [[UIApplication sharedApplication] openURL:appStoreURL];
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

-(void)shareMedia:(NSString *)stringURL documentUTI:(NSString *)documentUTI {
  NSURL *filePath = [NSURL fileURLWithPath:stringURL];
  documentInteractionController = [UIDocumentInteractionController interactionControllerWithURL:filePath];
  documentInteractionController.UTI = documentUTI;
  documentInteractionController.delegate = self;
  [documentInteractionController presentOpenInMenuFromRect:CGRectZero inView:[[[[[UIApplication sharedApplication] delegate] window] rootViewController] view] animated:YES];
}

@end
