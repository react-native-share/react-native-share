#import "RNQuickLookActivity.h"

@interface RNQuickLookActivity ()

@property (nonatomic, strong) QLPreviewController *previewController;

@end

@implementation RNQuickLookActivity

- (NSString *)activityType {
    return NSStringFromClass([self class]);
}

- (NSString *)activityTitle {
    return @"Quick Look";
}

- (UIImage *)activityImage {
    if (@available(iOS 13.0, *)) {
        return [UIImage systemImageNamed:@"eye"];
    } else {
        return [UIImage imageNamed:@"visible"];
    }
}

- (BOOL)canPerformWithActivityItems:(NSArray *)activityItems {
    for (id item in activityItems) {
        if ([item isKindOfClass:[NSURL class]]) {
            NSURL *url = (NSURL *)item;
            if ([url isFileURL] && [QLPreviewController canPreviewItem:url]) {
                self.fileURL = url;
                return YES;
            }
        }
    }
    return NO;
}

- (void)prepareWithActivityItems:(NSArray *)activityItems {
    // No additional preparation needed
}

- (UIViewController *)activityViewController {
    if (self.fileURL && [[NSFileManager defaultManager] fileExistsAtPath:[self.fileURL path]]) {
        self.previewController = [[QLPreviewController alloc] init];
        self.previewController.dataSource = self;
        self.previewController.delegate = self;
        return self.previewController;
    }
    return nil;
}

#pragma mark - QLPreviewControllerDataSource

- (NSInteger)numberOfPreviewItemsInPreviewController:(QLPreviewController *)controller {
    return 1;
}

- (id<QLPreviewItem>)previewController:(QLPreviewController *)controller previewItemAtIndex:(NSInteger)index {
    return self.fileURL;
}

#pragma mark - QLPreviewControllerDelegate

- (void)previewControllerDidDismiss:(QLPreviewController *)controller {
    [self activityDidFinish:YES];
}

@end
