#import "RNShareUtils.h"


@implementation RNShareUtils


/**
 Given a base64 string, attempts to return a file extension based on its mime type.
*/
+(NSString*)getExtensionFromBase64:(NSString*)base64String {
    NSRange   searchedRange = NSMakeRange(0, [base64String length]);
    NSString *pattern = @"/[a-zA-Z0-9]+;";
    NSError  *error = nil;

    NSRegularExpression* regex = [NSRegularExpression regularExpressionWithPattern: pattern options:0 error:&error];
    NSArray* matches = [regex matchesInString:base64String options:0 range: searchedRange];
    
    NSString *ext = nil;
    
    for (NSTextCheckingResult* match in matches) {
        NSString* matchText = [base64String substringWithRange:[match range]];
        ext = [matchText substringWithRange:(NSMakeRange(1, matchText.length - 2))];
    }

    return ext;
}

/**
 Given a base64 string and Data, writes a temp file with a guessed extension from
 the base mime type.
 */
+(NSURL*)getPathFromBase64:(NSString*)base64String with:(NSData*)data {
    NSString * mimeType = [RNShareUtils getExtensionFromBase64:base64String];
    
    // default to png if invalid
    // it was like this originally, should it default
    // to a better file type or no extension at all?
    if(!mimeType){
        mimeType = @"png";
    }

    NSString *pathComponent = [NSString stringWithFormat:@"file.%@", mimeType];
    NSString *writePath = [NSTemporaryDirectory() stringByAppendingPathComponent:pathComponent];
    if ([data writeToFile:writePath atomically:YES]) {
        return [NSURL fileURLWithPath:writePath];
    }
    return NULL;
}

@end
