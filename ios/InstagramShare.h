//
//  InstagramShare.h
//  RNShare
//
//  Created by Ralf Nieuwenhuizen on 12-04-17.
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
@interface InstagramShare : NSObject <RCTBridgeModule>

- (void) shareSingle:(NSDictionary *)options reject:(RCTPromiseRejectBlock)reject resolve:(RCTPromiseResolveBlock)resolve;
- (void)shareSingleImage:(NSDictionary *)options
         reject:(RCTPromiseRejectBlock)reject
         resolve:(RCTPromiseResolveBlock)resolve;
@end
