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
#import "DiscordShare.h"
#import "RNShareActivityItemSource.h"
#import "RNShareUtils.h"

#if RCT_NEW_ARCH_ENABLED
#import "RNShareSpec.h"
#endif

@implementation RNShare {
    RCTPromiseResolveBlock documentPickerResolve;
    UIDocumentPickerViewController *activeDocumentPicker;

    // Keep delegate-backed adapters alive for this module instance.
    EmailShare *emailShare;
    SmsShare *smsShare;
    WhatsAppShare *whatsAppShare;
}

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
        emailShare = [[EmailShare alloc] init];
        smsShare = [[SmsShare alloc] init];
        whatsAppShare = [[WhatsAppShare alloc] init];
    }
    return self;
}

- (CGRect)sourceRectInView:(UIView *)sourceView
             anchorViewTag:(NSNumber *)anchorViewTag
{
    if (anchorViewTag) {
        UIView *anchorView = [self.bridge.uiManager viewForReactTag:anchorViewTag];
        if (anchorView) {
            return [anchorView convertRect:anchorView.bounds toView:sourceView];
        }
    }
    return CGRectMake(CGRectGetMidX(sourceView.bounds), CGRectGetMidY(sourceView.bounds), 1, 1);
}

- (BOOL)isImageMimeType:(NSString *)data {
    return data.length >= 11 && [data compare:@"data:image/" options:NSCaseInsensitiveSearch range:NSMakeRange(0, 11)] == NSOrderedSame;
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
    @"DISCORD": @"discord",
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
            if (appId.length > 0) {
                NSLog(@"TRY OPEN FACEBOOK STORIES");
                FacebookStories *shareCtl = [[FacebookStories alloc] init];
                [shareCtl shareSingle:options reject: reject resolve: resolve];
            } else {
                reject(@"EINVAL", @"key 'appId' missing in options", nil);
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
            [whatsAppShare shareSingle:options reject: reject resolve: resolve];
        } else if([social isEqualToString:@"instagram"]) {
            NSLog(@"TRY OPEN instagram");
            InstagramShare *shareCtl = [[InstagramShare alloc] init];
            if([self isImageMimeType:[RCTConvert NSString:options[@"url"]]]) {// Condition to handle image
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
            [emailShare shareSingle:options reject: reject resolve: resolve];
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
            [smsShare shareSingle:options reject: reject resolve: resolve];
        } else if([social isEqualToString:@"discord"]) {
            NSLog(@"TRY OPEN discord");
            DiscordShare *shareCtl = [[DiscordShare alloc] init];
            [shareCtl shareSingle:options reject: reject resolve: resolve];
        } else {
            reject(@"EINVAL", @"Unsupported social target", nil);
        }
    } else {
        reject(@"EINVAL", @"key 'social' missing in options", nil);
        return;
    }
}

RCT_EXPORT_METHOD(open:(NSDictionary *)options
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    if (RCTRunningInAppExtension()) {
        reject(@"EUNAVAILABLE", @"Unable to show action sheet from app extension", nil);
        return;
    }

    NSMutableArray<id> *items = [NSMutableArray array];
    NSString *message = [RCTConvert NSString:options[@"message"]];
    if (message) {
        [items addObject:message];
    }
    BOOL saveToFiles = [RCTConvert BOOL:options[@"saveToFiles"]];
    if (saveToFiles && activeDocumentPicker) {
        reject(@"EINPROGRESS", @"A Files export is already in progress", nil);
        return;
    }
    NSString *filename = [RCTConvert NSString:options[@"filename"]];

    NSArray *filenamesArray = [RCTConvert NSStringArray:options[@"filenames"]];
    NSArray *urlsArray = [RCTConvert NSArray:options[@"urls"]];
    
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
                
                NSString *itemFilename = filename;
                if (i < filenamesArray.count && [filenamesArray[i] length] > 0) {
                    itemFilename = filenamesArray[i];
                }

                if (saveToFiles || itemFilename.length > 0) {
                    NSURL *filePath = saveToFiles
                        ? [RNShareUtils getPathFromBase64:URL.absoluteString with:data fileName:itemFilename]
                        : [RNShareUtils getPathFromFilename:itemFilename with:data];
                    if (!filePath) {
                        reject(@"EWRITE", @"Unable to prepare attachment", nil);
                        return;
                    }
                    [items addObject:filePath];
                } else {
                    [items addObject:data];
                }
            } else {
                [items addObject:URL];
            }
        }
    }

    NSArray *activityItemSources = options[@"activityItemSources"];
    BOOL hasActivityItemSources = activityItemSources != nil && activityItemSources.count > 0;

    if (items.count == 0 && !hasActivityItemSources) {
        reject(@"EINVAL", @"No `url` or `message` to share", nil);
        return;
    }

    UIViewController *controller = RCTPresentedViewController();
    if (!controller) {
        reject(@"EUNAVAILABLE", @"No view controller available to present the share sheet", nil);
        return;
    }

    if (saveToFiles) {
        NSArray *urls = [items filteredArrayUsingPredicate:[NSPredicate predicateWithBlock:^BOOL(id  _Nullable evaluatedObject, NSDictionary<NSString *,id> * _Nullable bindings) {
            return [evaluatedObject isKindOfClass:[NSURL class]];
        }]];

        if (urls.count == 0) {
            reject(@"EINVAL", @"No `urls` to save in Files", nil);
            return;
        }
        if (@available(iOS 11.0, macCatalyst 13.1, *)) {
            UIDocumentPickerViewController *documentPicker = nil;
            if (@available(iOS 15.0, macCatalyst 15.0, *)) {
                documentPicker = [[UIDocumentPickerViewController alloc] initForExportingURLs:urls asCopy:YES];
            } else {
                documentPicker = [[UIDocumentPickerViewController alloc] initWithURLs:urls inMode:UIDocumentPickerModeExportToService];
            }
            activeDocumentPicker = documentPicker;
            documentPickerResolve = resolve;
            [documentPicker setDelegate:self];
            [controller presentViewController:documentPicker animated:YES completion:nil];
            return;
        }
    }

    if (hasActivityItemSources) {
        [self _fetchMetadataAndPresentShareController:items
                                              options:options
                                           controller:controller
                                              resolve:resolve
                                               reject:reject];
    } else {
        [self _presentShareController:items
                              options:options
                           controller:controller
                              resolve:resolve
                               reject:reject];
    }
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
    [self completeDocumentPicker:controller success:NO];
}

- (void)documentPicker:(UIDocumentPickerViewController *)controller didPickDocumentsAtURLs:(NSArray<NSURL *> *)urls {
    [self completeDocumentPicker:controller success:YES];
}

- (void)completeDocumentPicker:(UIDocumentPickerViewController *)controller success:(BOOL)success {
    if (controller != activeDocumentPicker || !documentPickerResolve) return;
    RCTPromiseResolveBlock resolve = documentPickerResolve;
    documentPickerResolve = nil;
    activeDocumentPicker = nil;
    controller.delegate = nil;
    resolve(@{
        @"success": @(success),
        @"message": success ? @"com.apple.DocumentsApp" : @"CANCELED"
    });
}

#pragma mark - Share Controller

- (void)_presentShareController:(NSArray *)items
                        options:(NSDictionary *)options
                     controller:(UIViewController *)controller
                        resolve:(RCTPromiseResolveBlock)resolve
                         reject:(RCTPromiseRejectBlock)reject
{
    UIActivityViewController *shareController = [[UIActivityViewController alloc] initWithActivityItems:items applicationActivities:nil];

    BOOL disableOverlay = [RCTConvert BOOL:options[@"disableOverlay"]];
    if (@available(iOS 15.0, *)) {
        if (disableOverlay == true) {
            shareController.sheetPresentationController.largestUndimmedDetentIdentifier = UISheetPresentationControllerDetentIdentifierLarge;
        }
    }

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
        UIActivityViewController *completedController = weakShareController;
        if (!completedController.completionWithItemsHandler) return;
        completedController.completionWithItemsHandler = nil;
        // always dismiss since this may be called from cancelled shares
        // but the share menu would remain open, and our callback would fire again on close
        [completedController dismissViewControllerAnimated:true completion:nil];

        if (activityError) {
            reject(@"error",@"activityError",activityError);
        } else {
            resolve(@{
                @"success": @(completed),
                @"message": activityType ?: @""
            });
        }
    };

    shareController.modalPresentationStyle = UIModalPresentationPopover;
    NSNumber *anchorViewTag = [RCTConvert NSNumber:options[@"anchor"]];
    if (!anchorViewTag) {
        shareController.popoverPresentationController.permittedArrowDirections = 0;
    }
    shareController.popoverPresentationController.sourceView = controller.view;
    shareController.popoverPresentationController.sourceRect = [self sourceRectInView:controller.view
                                                                        anchorViewTag:anchorViewTag];

    [controller presentViewController:shareController animated:YES completion:nil];
    shareController.view.tintColor = [RCTConvert UIColor:options[@"tintColor"]];
}

- (void)_fetchMetadataAndPresentShareController:(NSMutableArray *)items
                                        options:(NSDictionary *)options
                                     controller:(UIViewController *)controller
                                        resolve:(RCTPromiseResolveBlock)resolve
                                         reject:(RCTPromiseRejectBlock)reject
{
    NSArray *activityItemSources = options[@"activityItemSources"];
    __block NSInteger pendingFetches = activityItemSources.count;
    __weak RNShare *weakSelf = self;

    [activityItemSources enumerateObjectsUsingBlock:^(id  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        RNShareActivityItemSource *activityItemSource = [[RNShareActivityItemSource alloc] initWithOptions:obj
                                                                                                completion:^{
            pendingFetches--;
            if (pendingFetches == 0) {
                dispatch_async(dispatch_get_main_queue(), ^{
                    [weakSelf _presentShareController:items
                                              options:options
                                           controller:controller
                                              resolve:resolve
                                               reject:reject];
                });
            }
        }];
        [items addObject:activityItemSource];
    }];
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
