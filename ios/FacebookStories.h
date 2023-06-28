//
//  FacebookStories.h
//  RNShare
//
//  Created by Quynh Nguyen on 4/13/20.
//  Link: https://github.com/Quynh-Nguyen
//  Copyright © 2020 Facebook. All rights reserved.
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
@interface FacebookStories : NSObject <RCTBridgeModule>

- (void *) shareSingle:(NSDictionary *)options reject:(RCTPromiseRejectBlock)reject resolve:(RCTPromiseResolveBlock)resolve;
@end
