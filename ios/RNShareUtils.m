#import "RNShareUtils.h"
#import <MobileCoreServices/MobileCoreServices.h>
#if __has_include(<UniformTypeIdentifiers/UniformTypeIdentifiers.h>)
#import <UniformTypeIdentifiers/UniformTypeIdentifiers.h>
#endif


@implementation RNShareUtils

+(NSURL*)URLWithString:(NSString*)url queryItems:(NSArray<NSURLQueryItem*>*)queryItems {
    NSURLComponents *components = [NSURLComponents componentsWithString:url];
    components.queryItems = queryItems;
    // Query-item encoding permits '+', but many target apps decode it as a space.
    components.percentEncodedQuery = [components.percentEncodedQuery stringByReplacingOccurrencesOfString:@"+" withString:@"%2B"];
    return components.URL;
}


/**
 Given a base64 string, attempts to return a file extension based on its mime type.
*/
+(NSString*)getMimeTypeFromBase64:(NSString*)base64String {
    if (base64String.length < 5 || [base64String compare:@"data:" options:NSCaseInsensitiveSearch range:NSMakeRange(0, 5)] != NSOrderedSame) {
        return nil;
    }
    NSRange comma = [base64String rangeOfString:@","];
    if (comma.location == NSNotFound) return nil;
    NSRange header = NSMakeRange(5, comma.location - 5);
    NSRange separator = [base64String rangeOfString:@";" options:0 range:header];
    NSUInteger end = separator.location == NSNotFound ? comma.location : separator.location;
    NSString *mimeType = [base64String substringWithRange:NSMakeRange(5, end - 5)];
    return mimeType.length == 0 ? @"text/plain" : mimeType;
}

+(NSString*)getExtensionFromBase64:(NSString*)base64String {
    NSString *mimeType = [self getMimeTypeFromBase64:base64String];
    if (!mimeType) return nil;

#if __has_include(<UniformTypeIdentifiers/UniformTypeIdentifiers.h>)
    if (@available(iOS 14.0, macCatalyst 14.0, macOS 11.0, *)) {
        return [UTType typeWithMIMEType:mimeType].preferredFilenameExtension;
    }
#endif
    CFStringRef identifier = UTTypeCreatePreferredIdentifierForTag(kUTTagClassMIMEType, (__bridge CFStringRef)mimeType, NULL);
    if (identifier == NULL) return nil;
    NSString *extension = CFBridgingRelease(UTTypeCopyPreferredTagWithClass(identifier, kUTTagClassFilenameExtension));
    CFRelease(identifier);
    return extension;
}

+(NSString*)getTypeIdentifierFromExtension:(NSString*)extension {
    if (extension.length == 0) return @"public.data";
#if __has_include(<UniformTypeIdentifiers/UniformTypeIdentifiers.h>)
    if (@available(iOS 14.0, macCatalyst 14.0, macOS 11.0, *)) {
        return [UTType typeWithFilenameExtension:extension].identifier ?: @"public.data";
    }
#endif
    NSString *identifier = CFBridgingRelease(UTTypeCreatePreferredIdentifierForTag(kUTTagClassFilenameExtension, (__bridge CFStringRef)extension, NULL));
    return identifier ?: @"public.data";
}

/**
 Given a base64 string and Data, writes a temp file with a guessed extension from
 the base mime type.
 */
+(NSURL*)getPathFromBase64:(NSString*)base64String with:(NSData*)data fileName:(NSString*)name {
    NSString * mimeType = [RNShareUtils getExtensionFromBase64:base64String];
    NSString * fileName=name;
    // default to png if invalid
    // it was like this originally, should it default
    // to a better file type or no extension at all?
    if(!mimeType){
        mimeType = @"png";
    }
    //default to file if invalid
    if(!fileName){
        fileName=@"file";
    }

    NSString *pathComponent = [NSString stringWithFormat:@"%@.%@",fileName, mimeType];
    return [self getPathFromFilename:pathComponent with:data];
}

/**
 Given a filename string and Data, writes a temp file with the filename.
 */
+(NSURL*)getPathFromFilename:(NSString*)filename with:(NSData*)data {
    if (data == nil || filename.length == 0 || [filename isEqualToString:@"."] || [filename isEqualToString:@".."] || [filename rangeOfCharacterFromSet:[NSCharacterSet characterSetWithCharactersInString:@"/\\"]].location != NSNotFound) {
        return nil;
    }
    NSString *directory = [NSTemporaryDirectory() stringByAppendingPathComponent:NSUUID.UUID.UUIDString];
    NSFileManager *manager = NSFileManager.defaultManager;
    if (![manager createDirectoryAtPath:directory withIntermediateDirectories:YES attributes:nil error:nil]) {
        return nil;
    }
    NSString *writePath = [directory stringByAppendingPathComponent:filename];
    if (![data writeToFile:writePath atomically:YES]) {
        [manager removeItemAtPath:directory error:nil];
        return nil;
    }
    return [NSURL fileURLWithPath:writePath];
}

@end
