#import <Foundation/Foundation.h>

@interface RNShareUtils : NSObject
+(NSString*)getExtensionFromBase64:(NSString*)base64String;
+(NSURL*)getPathFromBase64:(NSString*)base64String with:(NSData*)data;
+(NSURL*)getPathFromFilename:(NSString*)filename with:(NSData*)data;
@end
