#import <Foundation/Foundation.h>

@interface RNShareUtils : NSObject
+(NSString*)getExtensionFromBase64:(NSString*)base64String;
+(NSString*)getMimeTypeFromBase64:(NSString*)base64String;
+(NSString*)getTypeIdentifierFromExtension:(NSString*)extension;
+(NSURL*)getPathFromBase64:(NSString*)base64String with:(NSData*)data fileName:(NSString*)name;
+(NSURL*)getPathFromFilename:(NSString*)filename with:(NSData*)data;
+(NSURL*)URLWithString:(NSString*)url queryItems:(NSArray<NSURLQueryItem*>*)queryItems;
@end
