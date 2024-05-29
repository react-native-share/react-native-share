#import "RNQuickLookActivity.h"

@interface RNQuickLookActivity ()

@property (nonatomic, strong) UIDocumentInteractionController *documentInteractionController;

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
        return [UIImage imageNamed:@"eye"];
    }
}

- (BOOL)canPerformWithActivityItems:(NSArray *)activityItems {
    NSSet *quickLookExtensions = [NSSet setWithArray:@[@"pdf", @"doc", @"docx", @"xls", @"xlsx", @"ppt", @"pptx", @"jpg", @"jpeg", @"png", @"gif", @"txt", @"rtf", @"html", @"htm", @"key", @"numbers", @"pages"]];
    
    for (id item in activityItems) {
        if ([item isKindOfClass:[NSURL class]]) {
            NSURL *url = (NSURL *)item;
            
            if ([url isFileURL]) {
                NSString *extension = [[url pathExtension] lowercaseString];
                if ([quickLookExtensions containsObject:extension]) {
                    self.fileURL = url;
                    return YES;
                }
            }
        }
    }
    return NO;
}


- (void)prepareWithActivityItems:(NSArray *)activityItems {
}

- (void)performActivity {
    if (self.fileURL && [[NSFileManager defaultManager] fileExistsAtPath:[self.fileURL path]]) {
        self.documentInteractionController = [UIDocumentInteractionController interactionControllerWithURL:self.fileURL];
        self.documentInteractionController.delegate = self;

        if (![self.documentInteractionController presentPreviewAnimated:YES]) {
            [self activityDidFinish:NO];
        }
    } else {
        [self activityDidFinish:NO];
    }
}

#pragma mark - UIDocumentInteractionControllerDelegate

- (UIViewController *)documentInteractionControllerViewControllerForPreview:(UIDocumentInteractionController *)controller {
    return [UIApplication sharedApplication].keyWindow.rootViewController;
}

- (void)documentInteractionControllerDidEndPreview:(UIDocumentInteractionController *)controller {
    [self activityDidFinish:YES];
}

@end
