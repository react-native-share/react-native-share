#import <UIKit/UIKit.h>

@interface RNQuickLookActivity : UIActivity <UIDocumentInteractionControllerDelegate>

@property (nonatomic, strong) NSURL *fileURL;

@end
