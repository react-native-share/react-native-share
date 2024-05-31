#import <UIKit/UIKit.h>
#import <QuickLook/QuickLook.h>

@interface RNQuickLookActivity : UIActivity <QLPreviewControllerDataSource, QLPreviewControllerDelegate>

@property (nonatomic, strong) NSURL *fileURL;

@end
