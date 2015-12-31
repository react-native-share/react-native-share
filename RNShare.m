#import <MessageUI/MessageUI.h>
#import "RNShare.h"
#import "RCTConvert.h"
#import "RCTLog.h"

@implementation RNShare

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE()
RCT_EXPORT_METHOD(open:(NSDictionary *)options)
{
    // Your implementation here
    NSString *shareText = [RCTConvert NSString:options[@"share_text"]];
    NSString *shareUrl = [RCTConvert NSString:options[@"share_URL"]];
    //some app extension need a NSURL or UIImage Object to share
    NSURL *cardUrl = [NSURL URLWithString:shareUrl];
    
    NSArray *itemsToShare = @[shareText, shareUrl,cardUrl];
    UIActivityViewController *activityVC = [[UIActivityViewController alloc] initWithActivityItems:itemsToShare applicationActivities:nil];
    /*activityVC.excludedActivityTypes = @[UIActivityTypePostToWeibo,
                                         UIActivityTypeMessage,
                                         UIActivityTypeMail,
                                         UIActivityTypePrint,
                                         UIActivityTypeCopyToPasteboard,
                                         UIActivityTypeAssignToContact,
                                         UIActivityTypeSaveToCameraRoll,
                                         UIActivityTypeAddToReadingList,
                                         UIActivityTypePostToFlickr,
                                         UIActivityTypePostToVimeo,
                                         UIActivityTypePostToTencentWeibo,
                                         UIActivityTypeAirDrop];*/
    UIViewController *root = [[[[UIApplication sharedApplication] delegate] window] rootViewController];
    [root presentViewController:activityVC animated:YES completion:nil];
}
@end
