#import "RNShareActivityItemSource.h"

#ifdef __IPHONE_13_0
#import <LinkPresentation/LinkPresentation.h>
#endif

// import RCTBridgeModule
#import <React/RCTBridgeModule.h>

// import RCTConvert
#import <React/RCTConvert.h>

@implementation RNShareActivityItemSource {
    id placeholderItem;
    NSDictionary *itemDictionary;
    NSDictionary *subjectDictionary;
    NSDictionary *dataTypeIdentifierDictionary;
    NSDictionary *thumbnailImageDictionary;
#ifdef __IPHONE_13_0
    LPLinkMetadata *linkMetadata API_AVAILABLE(ios(13.0));
#endif
}

- (instancetype)initWithOptions:(NSDictionary *)options {
    self = [super init];
    if (self) {
        placeholderItem = [RNShareActivityItemSource itemFromDictionary:options[@"placeholderItem"]];

#ifdef __IPHONE_13_0
        if (@available(iOS 13.0, *)) {
            linkMetadata = [RNShareActivityItemSource linkMetadataFromDictionary:options[@"linkMetadata"]];
            if ([placeholderItem isKindOfClass:NSURL.class] && ![RNShareActivityItemSource isURLSchemeData:placeholderItem]) {
                NSURL *URL = placeholderItem;
                [self fetchMetadataForURL:URL];
            }
        }
#endif

        itemDictionary = options[@"item"];
        subjectDictionary = options[@"subject"];
        dataTypeIdentifierDictionary = options[@"dataTypeIdentifier"];
        thumbnailImageDictionary = options[@"thumbnailImage"];
    }
    return self;
}

- (void)fetchMetadataForURL:(nonnull NSURL *)URL {
#ifdef __IPHONE_13_0
    if (@available(iOS 13.0, *)) {
        LPMetadataProvider *metadataProvider = [[LPMetadataProvider alloc] init];
        [metadataProvider startFetchingMetadataForURL:URL completionHandler:^(LPLinkMetadata * _Nullable metadata, NSError * _Nullable error) {
            if (!self->linkMetadata) {
                self->linkMetadata = metadata;
            } else {
                self->linkMetadata.originalURL = metadata.originalURL;
                self->linkMetadata.URL = metadata.URL;
                if(!self->linkMetadata.title) {
                    self->linkMetadata.title = metadata.title;
                }
                self->linkMetadata.imageProvider = metadata.imageProvider;
                if (self->linkMetadata.imageProvider) {
                    self->linkMetadata.iconProvider = self->linkMetadata.imageProvider;
                } else {
                    self->linkMetadata.iconProvider = metadata.iconProvider;
                }
                self->linkMetadata.remoteVideoURL = metadata.remoteVideoURL;
                self->linkMetadata.videoProvider = metadata.videoProvider;
            }
        }];
    }
#endif
}

#pragma mark - Utilities

+ (BOOL)isURLSchemeData:(nullable NSURL *)URL {
    return URL && [URL.scheme.lowercaseString isEqual:@"data"];
}

+ (nullable id)URLOrDataFromURL:(nullable NSURL *)URL {
    if ([self isURLSchemeData:URL]) {
        NSError *error;
        return [NSData dataWithContentsOfURL:URL options:(NSDataReadingOptions)0 error:&error];
    } else {
        return URL;
    }
}

+ (nullable id)itemFromDictionary:(NSDictionary *)dictionary {
    if (dictionary) {
        NSString *type = [RCTConvert NSString:dictionary[@"type"]];
        NSString *content = [RCTConvert NSString:dictionary[@"content"]];
        if ([type isEqual:@"text"]) {
            return content;
        }
        
        if ([type isEqual:@"url"]) {
            NSURL *URL = [RCTConvert NSURL:content];
            return [self URLOrDataFromURL:URL];
        }
    }
    return nil;
}

#ifdef __IPHONE_13_0
+ (nullable LPLinkMetadata *)linkMetadataFromDictionary:(NSDictionary *)dictionary API_AVAILABLE(ios(13.0)) {
    if (dictionary) {
        LPLinkMetadata *linkMetadata = [[LPLinkMetadata alloc] init];
        linkMetadata.originalURL = [RCTConvert NSURL:dictionary[@"originalUrl"]];
        linkMetadata.URL = [RCTConvert NSURL:dictionary[@"url"]];
        linkMetadata.title = [RCTConvert NSString:dictionary[@"title"]];
        NSURL *iconURL = [RCTConvert NSURL:dictionary[@"icon"]];
        if (iconURL) {
            linkMetadata.iconProvider = [[NSItemProvider alloc] initWithContentsOfURL:iconURL];
        }
        NSURL *imageURL = [RCTConvert NSURL:dictionary[@"image"]];
        if (imageURL) {
            linkMetadata.imageProvider = [[NSItemProvider alloc] initWithContentsOfURL:imageURL];
        }
        linkMetadata.remoteVideoURL = [RCTConvert NSURL:dictionary[@"remoteVideoUrl"]];
        NSURL *videoURL = [RCTConvert NSURL:dictionary[@"video"]];
        if (videoURL) {
            linkMetadata.videoProvider = [[NSItemProvider alloc] initWithContentsOfURL:videoURL];
        }
        return linkMetadata;
    }
    return nil;
}
#endif

+ (nullable NSString *)keyForActivityType:(UIActivityType)activityType {
    if ([activityType isEqual:UIActivityTypeAddToReadingList]) {
        return @"addToReadingList";
    }
        
    if ([activityType isEqual:UIActivityTypeAirDrop]) {
        return @"airDrop";
    }

    if ([activityType isEqual:UIActivityTypeAssignToContact]) {
        return @"assignToContact";
    }

    if ([activityType isEqual:UIActivityTypeCopyToPasteboard]) {
        return @"copyToPasteBoard";
    }

    if ([activityType isEqual:UIActivityTypeMail]) {
        return @"mail";
    }

    if ([activityType isEqual:UIActivityTypeMessage]) {
        return @"message";
    }

    if (@available(iOS 9.0, *)) {
        if ([activityType isEqual:UIActivityTypeOpenInIBooks]) {
            return @"openInIBooks";
        }
    }

    if ([activityType isEqual:UIActivityTypePostToFacebook]) {
        return @"postToFacebook";
    }

    if ([activityType isEqual:UIActivityTypePostToFlickr]) {
        return @"postToFlickr";
    }

    if ([activityType isEqual:UIActivityTypePostToTencentWeibo]) {
        return @"postToTencentWeibo";
    }

    if ([activityType isEqual:UIActivityTypePostToTwitter]) {
        return @"postToTwitter";
    }

    if ([activityType isEqual:UIActivityTypePostToVimeo]) {
        return @"postToVimeo";
    }

    if ([activityType isEqual:UIActivityTypePostToWeibo]) {
        return @"postToWeibo";
    }

    if ([activityType isEqual:UIActivityTypePrint]) {
        return @"print";
    }

    if ([activityType isEqual:UIActivityTypeSaveToCameraRoll]) {
        return @"saveToCameraRoll";
    }

    if (@available(iOS 11.0, *)) {
        if ([activityType isEqual:UIActivityTypeMarkupAsPDF]) {
            return @"markupAsPDF";
        }
    }
    
    return activityType;
}

+ (nullable id)objectForActivityType:(UIActivityType)activityType inDictionary:(nonnull NSDictionary *)dictionary {
    NSString *key = [self keyForActivityType:activityType];
    if (key) {
        id obj = [dictionary objectForKey:key];
        if (obj) {
            if (obj == [NSNull null]) {
                return nil;
            }
            return obj;
        }
    }
    return [dictionary objectForKey:@"default"];
}

#pragma mark - UIActivityItemSource

- (id)activityViewControllerPlaceholderItem:(UIActivityViewController *)activityViewController {
    return placeholderItem;
}

- (nullable id)activityViewController:(nonnull UIActivityViewController *)activityViewController itemForActivityType:(nullable UIActivityType)activityType {
    if (itemDictionary) {
        NSDictionary *options = [RNShareActivityItemSource objectForActivityType:activityType inDictionary:itemDictionary];
        id item = [RNShareActivityItemSource itemFromDictionary:options];

        if (@available(iOS 13.0, *)) {
            if ([item isKindOfClass:NSURL.class] && ![RNShareActivityItemSource isURLSchemeData:item]) {
                NSURL *URL = item;
                [self fetchMetadataForURL:URL];
            }
        }

        return item;
    }
    return nil;
}

- (NSString *)activityViewController:(UIActivityViewController *)activityViewController subjectForActivityType:(UIActivityType)activityType {
    if (subjectDictionary) {
        id obj = [RNShareActivityItemSource objectForActivityType:activityType inDictionary:subjectDictionary];
        NSString *subject = [RCTConvert NSString:obj];
        return subject;
    }
    return nil;
}

- (NSString *)activityViewController:(UIActivityViewController *)activityViewController dataTypeIdentifierForActivityType:(UIActivityType)activityType {
    if (dataTypeIdentifierDictionary) {
        id obj = [RNShareActivityItemSource objectForActivityType:activityType inDictionary:dataTypeIdentifierDictionary];
        NSString *dataTypeIdentifier = [RCTConvert NSString:obj];
        return dataTypeIdentifier;
    }
    return nil;
}

- (UIImage *)activityViewController:(UIActivityViewController *)activityViewController thumbnailImageForActivityType:(UIActivityType)activityType suggestedSize:(CGSize)size {
    if (thumbnailImageDictionary) {
        id obj = [RNShareActivityItemSource objectForActivityType:activityType inDictionary:thumbnailImageDictionary];
        NSURL *URL = [RCTConvert NSURL:obj];
        if ([RNShareActivityItemSource isURLSchemeData:URL]) {
            NSError *error;
            NSData *data = [NSData dataWithContentsOfURL:URL options:(NSDataReadingOptions)0 error:&error];
            if (data) {
                UIImage *thumbnailImage = [UIImage imageWithData:data];
                return thumbnailImage;
            }
        }
    }
    return nil;
}

#ifdef __IPHONE_13_0
- (LPLinkMetadata *)activityViewControllerLinkMetadata:(UIActivityViewController *)activityViewController API_AVAILABLE(ios(13.0)) {
    return linkMetadata;
}
#endif

@end
