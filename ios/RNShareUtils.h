#import <Foundation/Foundation.h>

@interface RNShareUtils : NSObject
+(NSString*)getExtensionFromBase64:(NSString*)base64String;
+(NSURL*)getPathFromBase64:(NSString*)base64String with:(NSData*)data;
+(NSURL*)getPathFromFileName:(NSString*)fileName with:(NSData*)data;
@end
