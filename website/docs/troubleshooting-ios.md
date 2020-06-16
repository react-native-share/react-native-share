---
id: troubleshooting-ios
title: Troubleshooting iOS
---

### LinkPresentation.h file not found

1. Check iOS SDK version running this command: `xcodebuild -showsdks`
2. If your SDK is 12 or lower you need to update to Xcode 11 with iOS SDK 13
3. Build the app with Xcode 11 and everything works ok