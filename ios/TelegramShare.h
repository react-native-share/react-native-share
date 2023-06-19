//
//  TelegranShare.h
//  RNShare
//
//  Created by Akinn Rosa on 07-27-21.
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
@interface TelegramShare : NSObject <RCTBridgeModule>

- (void) shareSingle:(NSDictionary *)options reject:(RCTPromiseRejectBlock)reject resolve:(RCTPromiseResolveBlock)resolve;

@end
