#import <MessageUI/MessageUI.h>
#import "RNShare.h"
// import RCTConvert
#import <React/RCTConvert.h>
// import RCTLog
#import <React/RCTLog.h>
// import RCTUtils
#import <React/RCTUtils.h>
// import RCTBridge
#import <React/RCTBridge.h>
// import RCTBridge
#import <React/RCTUIManager.h>
#import "GenericShare.h"
#import "WhatsAppShare.h"
#import "InstagramShare.h"
#import "InstagramStories.h"
#import "FacebookStories.h"
#import "GooglePlusShare.h"
#import "EmailShare.h"
#import "TelegramShare.h"
#import "ViberShare.h"
#import "MessengerShare.h"
#import "SmsShare.h"
#import "RNShareActivityItemSource.h"
#import "RNShareUtils.h"

#if RCT_NEW_ARCH_ENABLED
#import <RNShareSpec/RNShareSpec.h>
#endif

@implementation RNShare

RCTPromiseRejectBlock rejectBlock;
RCTPromiseResolveBlock resolveBlock;

// we need this since this controller
// may implement a delegate and could be garbage collected
// before it is called
EmailShare *shareCtl;
SmsShare *smsShareCtl;

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

- (id) init
{
    if ((self = [super init])) {
        shareCtl = [[EmailShare alloc] init];
        smsShareCtl = [[SmsShare alloc] init];
    }
    return self;
}

- (CGRect)sourceRectInView:(UIView *)sourceView
             anchorViewTag:(NSNumber *)anchorViewTag
{
    if (anchorViewTag) {
        UIView *anchorView = [self.bridge.uiManager viewForReactTag:anchorViewTag];
        return [anchorView convertRect:anchorView.bounds toView:sourceView];
    } else {
        return (CGRect){sourceView.center, {1, 1}};
    }
}

- (BOOL)isImageMimeType:(NSString *)data {
    NSRange range = [data rangeOfString:@"data:image" options:NSCaseInsensitiveSearch];
    if (data && range.location != NSNotFound) {
        return true;
    } else {
        return false;
    }
}

RCT_EXPORT_MODULE()

- (NSDictionary *)constantsToExport
{
  return @{
    @"FACEBOOK": @"facebook",
    @"FACEBOOKSTORIES": @"facebookstories",
    @"TWITTER": @"twitter",
    @"GOOGLEPLUS": @"googleplus",
    @"WHATSAPP": @"whatsapp",
    @"INSTAGRAM": @"instagram",
    @"INSTAGRAMSTORIES": @"instagramstories",
    @"TELEGRAM": @"telegram",
    @"EMAIL": @"email",
    @"MESSENGER": @"messenger",
    @"VIBER": @"viber",
    @"SMS": @"sms",
    @"SHARE_BACKGROUND_IMAGE": @"shareBackgroundImage",
    @"SHARE_BACKGROUND_VIDEO": @"shareBackgroundVideo",
    @"SHARE_STICKER_IMAGE": @"shareStickerImage",
    @"SHARE_BACKGROUND_AND_STICKER_IMAGE": @"shareBackgroundAndStickerImage",
  };
}

- (NSDictionary*) getConstants {
  return [self constantsToExport];
}

RCT_EXPORT_METHOD(shareSingle:(NSDictionary *)options
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    NSString *social = [RCTConvert NSString:options[@"social"]];
    if (social) {
        NSLog(@"%@", social);
        if([social isEqualToString:@"facebook"]) {
            NSLog(@"TRY OPEN FACEBOOK");
            GenericShare *shareCtl = [[GenericShare alloc] init];
            [shareCtl shareSingle:options reject: reject resolve: resolve serviceType: SLServiceTypeFacebook inAppBaseUrl:@"fb://"];
        } else if([social isEqualToString:@"facebookstories"]) {
            NSString *appId = [RCTConvert NSString:options[@"appId"]];
            if (appId) {
                NSLog(@"TRY OPEN FACEBOOK STORIES");
                FacebookStories *shareCtl = [[FacebookStories alloc] init];
                [shareCtl shareSingle:options reject: reject resolve: resolve];
            } else {
                RCTLogError(@"key 'appId' missing in options");
                return;
            }
        } else if([social isEqualToString:@"twitter"]) {
            NSLog(@"TRY OPEN Twitter");
            GenericShare *shareCtl = [[GenericShare alloc] init];
            [shareCtl shareSingle:options reject: reject resolve: resolve serviceType: SLServiceTypeTwitter inAppBaseUrl:@"twitter://"];
        } else if([social isEqualToString:@"googleplus"]) {
            NSLog(@"TRY OPEN google plus");
            GooglePlusShare *shareCtl = [[GooglePlusShare alloc] init];
            [shareCtl shareSingle:options reject: reject resolve: resolve];
        } else if([social isEqualToString:@"whatsapp"]) {
            NSLog(@"TRY OPEN whatsapp");
            WhatsAppShare *shareCtl = [[WhatsAppShare alloc] init];
            [shareCtl shareSingle:options reject: reject resolve: resolve];
        } else if([social isEqualToString:@"instagram"]) {
            NSLog(@"TRY OPEN instagram");
            InstagramShare *shareCtl = [[InstagramShare alloc] init];
            if([self isImageMimeType:options[@"url"]]) {// Condition to handle image
                [shareCtl shareSingleImage:options reject: reject resolve: resolve];
            } else {
                [shareCtl shareSingle:options reject: reject resolve: resolve];
            }
        } else if([social isEqualToString:@"instagramstories"]) {
            NSLog(@"TRY OPEN instagram-stories");
            InstagramStories *shareCtl = [[InstagramStories alloc] init];
            [shareCtl shareSingle:options reject: reject resolve: resolve];
         } else if([social isEqualToString:@"telegram"]) {
            NSLog(@"TRY OPEN telegram");
            TelegramShare *shareCtl = [[TelegramShare alloc] init];
            [shareCtl shareSingle:options reject: reject resolve: resolve];
        } else if([social isEqualToString:@"email"]) {
            NSLog(@"TRY OPEN email");
            [shareCtl shareSingle:options reject: reject resolve: resolve];
        } else if([social isEqualToString:@"viber"]) {
            NSLog(@"TRY OPEN viber");
            ViberShare *shareCtl = [[ViberShare alloc] init];
            [shareCtl shareSingle:options reject: reject resolve: resolve];
        } else if([social isEqualToString:@"messenger"]) {
            NSLog(@"TRY OPEN messenger");
            MessengerShare *shareCtl = [[MessengerShare alloc] init];
            [shareCtl shareSingle:options reject: reject resolve: resolve];
        } else if([social isEqualToString:@"sms"]) {
            NSLog(@"TRY OPEN sms");
            [smsShareCtl shareSingle:options reject: reject resolve: resolve];
        }
    } else {
        RCTLogError(@"key 'social' missing in options");
        return;
    }
}

RCT_EXPORT_METHOD(open:(NSDictionary *)options
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    if (RCTRunningInAppExtension()) {
        RCTLogError(@"Unable to show action sheet from app extension");
        return;
    }

    NSMutableArray<id> *items = [NSMutableArray array];
    NSString *message = [RCTConvert NSString:options[@"message"]];
    if (message) {
        [items addObject:message];
    }
    BOOL saveToFiles = [RCTConvert BOOL:options[@"saveToFiles"]];
    NSString *filename = [RCTConvert NSString:options[@"filename"]];

    NSArray *filenamesArray = options[@"filenames"];
    NSArray *urlsArray = options[@"urls"];
    
    for (int i=0; i<urlsArray.count; i++) {
        NSURL *URL = [RCTConvert NSURL:urlsArray[i]];
        if (URL) {
            if ([URL.scheme.lowercaseString isEqualToString:@"data"]) {
                NSError *error;
                NSData *data = [NSData dataWithContentsOfURL:URL
                                                     options:(NSDataReadingOptions)0
                                                       error:&error];
                if (!data) {
                    reject(@"no data",@"no data",error);
                    return;
                }
                
                //name get from array of filenames
                @try {
                    NSString *fileNameByIndex = [RCTConvert NSString:filenamesArray[i]];
                    if(fileNameByIndex.length>0){
                        //replace filename with name get by index
                        filename=fileNameByIndex;
                    }
                }
                @catch (NSException * e) {
                        RCTLogError(@"Exception get filename from finames array: %@", e);
                }

                if (saveToFiles) {

                    NSURL *filePath = [RNShareUtils getPathFromBase64:URL.absoluteString with:data fileName:filename];

                    if (filePath) {
                        [items addObject: filePath];
                    }
                } else if (filename.length > 0) {
                    NSURL *filePath = [RNShareUtils getPathFromFilename:filename with:data];
                    if (filePath) {
                        [items addObject: filePath];
                    }
                } else {
                    [items addObject:data];
                }
            } else {
                [items addObject:URL];
            }
        }
    }

    NSArray *activityItemSources = options[@"activityItemSources"];
    if (activityItemSources) {
        [activityItemSources enumerateObjectsUsingBlock:^(id  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
            RNShareActivityItemSource *activityItemSource = [[RNShareActivityItemSource alloc] initWithOptions:obj];
            [items addObject:activityItemSource];
        }];
    }

    if (items.count == 0) {
        RCTLogError(@"No `url` or `message` to share");
        return;
    }

    UIViewController *controller = RCTPresentedViewController();

    if (saveToFiles) {
        NSArray *urls = [items filteredArrayUsingPredicate:[NSPredicate predicateWithBlock:^BOOL(id  _Nullable evaluatedObject, NSDictionary<NSString *,id> * _Nullable bindings) {
            return [evaluatedObject isKindOfClass:[NSURL class]];
        }]];

        if (urls.count == 0) {
            RCTLogError(@"No `urls` to save in Files");
            return;
        }
        if (@available(iOS 11.0, macCatalyst 13.1, *)) {
            resolveBlock = resolve;
            rejectBlock = reject;
            UIDocumentPickerViewController *documentPicker = nil;
            if (@available(iOS 15.0, macCatalyst 15.0, *)) {
                documentPicker = [[UIDocumentPickerViewController alloc] initForExportingURLs:urls asCopy:YES];
            } else {
                documentPicker = [[UIDocumentPickerViewController alloc] initWithURLs:urls inMode:UIDocumentPickerModeExportToService];
            }
            [documentPicker setDelegate:self];
            [controller presentViewController:documentPicker animated:YES completion:nil];
            return;
        }
    }

    UIActivityViewController *shareController = [[UIActivityViewController alloc] initWithActivityItems:items applicationActivities:nil];

    NSString *subject = [RCTConvert NSString:options[@"subject"]];
    if (subject) {
        [shareController setValue:subject forKey:@"subject"];
    }

    NSArray *excludedActivityTypes = [RCTConvert NSStringArray:options[@"excludedActivityTypes"]];
    if (excludedActivityTypes) {
        shareController.excludedActivityTypes = excludedActivityTypes;
    }

    __weak UIActivityViewController* weakShareController = shareController;
    shareController.completionWithItemsHandler = ^(NSString *activityType, BOOL completed, __unused NSArray *returnedItems, NSError *activityError) {
        
        // always dismiss since this may be called from cancelled shares
        // but the share menu would remain open, and our callback would fire again on close
        if(weakShareController){
            // closing activity view controller
            [weakShareController dismissViewControllerAnimated:true completion:nil];
        } else {
            [controller dismissViewControllerAnimated:true completion:nil];
        }

        
        if (activityError) {
            reject(@"error",@"activityError",activityError);
        } else {
            resolve(@{
                @"success": @(completed),
                @"message": (RCTNullIfNil(activityType) ?: @"")
            });
        }
        
        // clear the completion handler to prevent cycles
        if(weakShareController){
            weakShareController.completionWithItemsHandler = nil;
        }
    };

    shareController.modalPresentationStyle = UIModalPresentationPopover;
    NSNumber *anchorViewTag = [RCTConvert NSNumber:options[@"anchor"]];
    if (!anchorViewTag) {
        shareController.popoverPresentationController.permittedArrowDirections = 0;
    }
    shareController.popoverPresentationController.sourceView = controller.view;
    shareController.popoverPresentationController.sourceRect = [self sourceRectInView:controller.view anchorViewTag:anchorViewTag];

    [controller presentViewController:shareController animated:YES completion:nil];

    shareController.view.tintColor = [RCTConvert UIColor:options[@"tintColor"]];
}


RCT_EXPORT_METHOD(isBase64File:(NSString *)url
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    NSError *err = [NSError errorWithDomain:@"NOT IMPLEMENTED" code: 500
        userInfo:@{NSLocalizedDescriptionKey:@"isBase64File is not implemented for iOS"}];
    reject(@"NOT IMPLEMENTED",@"NOT IMPLEMENTED",err);
}


RCT_EXPORT_METHOD(isPackageInstalled:(NSString *)packagename
    resolve:(RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject)
{
    NSError *err = [NSError errorWithDomain:@"NOT IMPLEMENTED" code: 500
        userInfo:@{NSLocalizedDescriptionKey:@"isPackageInstalled is not implemented for iOS"}];
    reject(@"NOT IMPLEMENTED",@"NOT IMPLEMENTED",err);
}

- (void)documentPickerWasCancelled:(UIDocumentPickerViewController *)controller {
    if (rejectBlock) {
        NSError *error = [NSError errorWithDomain:@"CANCELLED" code: 500 userInfo:@{NSLocalizedDescriptionKey:@"PICKER_WAS_CANCELLED"}];
        rejectBlock(@"CANCELLED",@"CANCELLED",error);
    }
}

- (void)documentPicker:(UIDocumentPickerViewController *)controller didPickDocumentsAtURLs:(NSArray<NSURL *> *)urls {
    if (resolveBlock) {
        resolveBlock(@{
            @"success": @(YES),
            @"message": @"com.apple.DocumentsApp"
        });
    }
}

# pragma mark - New Architecture

#if RCT_NEW_ARCH_ENABLED

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeRNShareSpecJSI>(params);
}

#endif

@end
