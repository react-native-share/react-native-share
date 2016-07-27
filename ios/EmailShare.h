//
//  EmailShare.h
//  RNShare
//
//  Created by Diseño Uno BBCL on 23-07-16.
//  Copyright © 2016 Facebook. All rights reserved.
//


#import <UIKit/UIKit.h>
#import "RCTConvert.h"
#import "RCTBridge.h"
#import "RCTUIManager.h"
#import "RCTLog.h"
#import "RCTUtils.h"
#import <MessageUI/MessageUI.h>
@interface EmailShare : NSObject <MFMailComposeViewControllerDelegate>

- (void *) shareSingle:(NSDictionary *)options failureCallback:(RCTResponseErrorBlock)failureCallback successCallback:(RCTResponseSenderBlock)successCallback;
@end
