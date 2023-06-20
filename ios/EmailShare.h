//
//  EmailShare.h
//  RNShare
//
//  Created by Diseño Uno BBCL on 23-07-16.
//  Copyright © 2016 Facebook. All rights reserved.
//


#import <UIKit/UIKit.h>
// import RCTConvertttt
#import <React/RCTConvert.h>
// import RCTBridge
#import <React/RCTBridge.h>
// import RCTUIManager
#import <React/RCTUIManager.h>
// import RCTLog
#import <React/RCTLog.h>
// import RCTUtils
#import <React/RCTUtils.h>
#import <MessageUI/MessageUI.h>
@interface EmailShare : NSObject <MFMailComposeViewControllerDelegate>

- (void) shareSingle:(NSDictionary *)options reject:(RCTPromiseRejectBlock)reject resolve:(RCTPromiseResolveBlock)resolve;
@end
