//
//  InstagramStories.h
//  RNShare
//
//  Created by Nikita Logachev on 13.02.2019.
//  link: https://github.com/loga4
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
@interface InstagramStories : NSObject <RCTBridgeModule>

- (void *) shareSingle:(NSDictionary *)options reject:(RCTPromiseRejectBlock)reject resolve:(RCTPromiseResolveBlock)resolve;
@end
