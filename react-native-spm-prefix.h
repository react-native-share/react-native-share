// Mirrors CocoaPods' default prefix header so ObjC sources that rely on an
// implicit Foundation/UIKit import compile under SPM (which has no
// prefix-header mechanism). Package.swift passes it with `-include`; do not
// delete it.
#ifdef __OBJC__
#import <Foundation/Foundation.h>
#if __has_include(<UIKit/UIKit.h>)
#import <UIKit/UIKit.h>
#endif
#endif
