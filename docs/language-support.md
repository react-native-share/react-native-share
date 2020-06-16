---
id: language-support
title: Language Support (iOS only)
---

On iOS, share component reads language value from CFBundleDevelopmentRegion at Info.plist file. By changing CFBundleDevelopmentRegion value you can change default language for component.

```xml
<key>CFBundleDevelopmentRegion</key>
<string>en</string>
```
For supporting multi language, you can add CFBundleAllowMixedLocalizations key to Info.plist.

```xml
<key>CFBundleAllowMixedLocalizations</key>
<string>true</string>
```