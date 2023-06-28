//
//  WhatsAppShare.h
//  RNShare
//
//  Created by Diseño Uno BBCL on 23-07-16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
// import RCTConvert
#import <React/RCTConvert.h>
// import RCTBridge
#import <React/RCTBridge.h>
// import RCTUIManager
#import <React/RCTUIManager.h>
// import RCTLog
#import <React/RCTLog.h>
// import RCTUtils
#import <React/RCTUtils.h>
@interface WhatsAppShare : NSObject <RCTBridgeModule,UIDocumentInteractionControllerDelegate>

- (void) shareSingle:(NSDictionary *)options reject:(RCTPromiseRejectBlock)reject resolve:(RCTPromiseResolveBlock)resolve;
@end
