(window.webpackJsonp = window.webpackJsonp || []).push([
  [1],
  {
    './documentation/Install.mdx': function(e, a, n) {
      'use strict';
      n.r(a);
      var t = n('./node_modules/react/index.js'),
        o = n.n(t),
        m = n('./node_modules/@mdx-js/tag/dist/index.js');
      function r(e, a) {
        if (null == e) return {};
        var n,
          t,
          o = (function(e, a) {
            if (null == e) return {};
            var n,
              t,
              o = {},
              m = Object.keys(e);
            for (t = 0; t < m.length; t++) (n = m[t]), a.indexOf(n) >= 0 || (o[n] = e[n]);
            return o;
          })(e, a);
        if (Object.getOwnPropertySymbols) {
          var m = Object.getOwnPropertySymbols(e);
          for (t = 0; t < m.length; t++)
            (n = m[t]),
              a.indexOf(n) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n]));
        }
        return o;
      }
      a.default = function(e) {
        var a = e.components;
        r(e, ['components']);
        return o.a.createElement(
          m.MDXTag,
          { name: 'wrapper', components: a },
          o.a.createElement(
            m.MDXTag,
            { name: 'h1', components: a, props: { id: 'install' } },
            'Install',
          ),
          o.a.createElement(
            m.MDXTag,
            { name: 'h2', components: a, props: { id: 'manual-install' } },
            'Manual install',
          ),
          o.a.createElement(
            m.MDXTag,
            { name: 'p', components: a },
            o.a.createElement(
              m.MDXTag,
              { name: 'inlineCode', components: a, parentName: 'p' },
              'npm install react-native-share --save',
            ),
          ),
          o.a.createElement(
            m.MDXTag,
            { name: 'h2', components: a, props: { id: 'ios-install' } },
            'IOS Install',
          ),
          o.a.createElement(
            m.MDXTag,
            { name: 'ol', components: a },
            o.a.createElement(
              m.MDXTag,
              { name: 'li', components: a, parentName: 'ol' },
              o.a.createElement(
                m.MDXTag,
                { name: 'p', components: a, parentName: 'li' },
                o.a.createElement(
                  m.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'npm install react-native-share --save',
                ),
              ),
            ),
            o.a.createElement(
              m.MDXTag,
              { name: 'li', components: a, parentName: 'ol' },
              o.a.createElement(
                m.MDXTag,
                { name: 'p', components: a, parentName: 'li' },
                'In XCode, in the project navigator, right click ',
                o.a.createElement(
                  m.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'Libraries',
                ),
                ' \u279c ',
                o.a.createElement(
                  m.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  "Add Files to [your project's name]",
                ),
              ),
            ),
            o.a.createElement(
              m.MDXTag,
              { name: 'li', components: a, parentName: 'ol' },
              o.a.createElement(
                m.MDXTag,
                { name: 'p', components: a, parentName: 'li' },
                'Go to ',
                o.a.createElement(
                  m.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'node_modules',
                ),
                ' \u279c ',
                o.a.createElement(
                  m.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'react-native-share',
                ),
                ' \u279c ',
                o.a.createElement(
                  m.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'ios',
                ),
                ' and add ',
                o.a.createElement(
                  m.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'RNShare.xcodeproj',
                ),
              ),
            ),
            o.a.createElement(
              m.MDXTag,
              { name: 'li', components: a, parentName: 'ol' },
              o.a.createElement(
                m.MDXTag,
                { name: 'p', components: a, parentName: 'li' },
                'In XCode, in the project navigator, select your project. Add ',
                o.a.createElement(
                  m.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'libRNShare.a',
                ),
                " to your project's ",
                o.a.createElement(
                  m.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'Build Phases',
                ),
                ' \u279c ',
                o.a.createElement(
                  m.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'Link Binary With Libraries',
                ),
              ),
            ),
            o.a.createElement(
              m.MDXTag,
              { name: 'li', components: a, parentName: 'ol' },
              o.a.createElement(
                m.MDXTag,
                { name: 'p', components: a, parentName: 'li' },
                'In XCode, in the project navigator, select your project. Add ',
                o.a.createElement(
                  m.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'Social.framework',
                ),
                ' and ',
                o.a.createElement(
                  m.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'MessageUI.framework',
                ),
                " to your project's ",
                o.a.createElement(
                  m.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'General',
                ),
                ' \u279c ',
                o.a.createElement(
                  m.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'Linked Frameworks and Libraries',
                ),
              ),
            ),
            o.a.createElement(
              m.MDXTag,
              { name: 'li', components: a, parentName: 'ol' },
              o.a.createElement(
                m.MDXTag,
                { name: 'p', components: a, parentName: 'li' },
                'In file Info.plist, add',
              ),
              o.a.createElement(
                m.MDXTag,
                { name: 'pre', components: a, parentName: 'li' },
                o.a.createElement(
                  m.MDXTag,
                  {
                    name: 'code',
                    components: a,
                    parentName: 'pre',
                    props: { className: 'language-xml' },
                  },
                  '<key>LSApplicationQueriesSchemes</key>\n<array>\n  <string>whatsapp</string>\n  <string>mailto</string>\n</array>\n',
                ),
              ),
            ),
            o.a.createElement(
              m.MDXTag,
              { name: 'li', components: a, parentName: 'ol' },
              o.a.createElement(
                m.MDXTag,
                { name: 'p', components: a, parentName: 'li' },
                'Run your project (',
                o.a.createElement(
                  m.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'Cmd+R',
                ),
                ')',
              ),
            ),
          ),
          o.a.createElement(
            m.MDXTag,
            { name: 'h2', components: a, props: { id: 'android-install' } },
            'Android Install',
          ),
          o.a.createElement(
            m.MDXTag,
            { name: 'ol', components: a },
            o.a.createElement(
              m.MDXTag,
              { name: 'li', components: a, parentName: 'ol' },
              o.a.createElement(
                m.MDXTag,
                { name: 'inlineCode', components: a, parentName: 'li' },
                'npm install react-native-share --save',
              ),
            ),
            o.a.createElement(
              m.MDXTag,
              { name: 'li', components: a, parentName: 'ol' },
              'Open up ',
              o.a.createElement(
                m.MDXTag,
                { name: 'inlineCode', components: a, parentName: 'li' },
                'android/app/src/main/java/[...]/MainApplication.java',
              ),
            ),
          ),
          o.a.createElement(
            m.MDXTag,
            { name: 'ul', components: a },
            o.a.createElement(
              m.MDXTag,
              { name: 'li', components: a, parentName: 'ul' },
              'Add ',
              o.a.createElement(
                m.MDXTag,
                { name: 'inlineCode', components: a, parentName: 'li' },
                'import cl.json.RNSharePackage;',
              ),
              ' and ',
              o.a.createElement(
                m.MDXTag,
                { name: 'inlineCode', components: a, parentName: 'li' },
                'import cl.json.ShareApplication;',
              ),
              ' to the imports at the top of the file',
            ),
            o.a.createElement(
              m.MDXTag,
              { name: 'li', components: a, parentName: 'ul' },
              'Add ',
              o.a.createElement(
                m.MDXTag,
                { name: 'inlineCode', components: a, parentName: 'li' },
                'new RNSharePackage()',
              ),
              ' to the list returned by the ',
              o.a.createElement(
                m.MDXTag,
                { name: 'inlineCode', components: a, parentName: 'li' },
                'getPackages()',
              ),
              '\nmethod',
            ),
          ),
          o.a.createElement(
            m.MDXTag,
            { name: 'ol', components: a, props: { start: 3 } },
            o.a.createElement(
              m.MDXTag,
              { name: 'li', components: a, parentName: 'ol' },
              o.a.createElement(
                m.MDXTag,
                { name: 'p', components: a, parentName: 'li' },
                'Append the following lines to ',
                o.a.createElement(
                  m.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'android/settings.gradle',
                ),
                ':',
              ),
              o.a.createElement(
                m.MDXTag,
                { name: 'pre', components: a, parentName: 'li' },
                o.a.createElement(
                  m.MDXTag,
                  { name: 'code', components: a, parentName: 'pre' },
                  "include ':react-native-share'\nproject(':react-native-share').projectDir = new File(rootProject.projectDir,    '../node_modules/react-native-share/android')\n",
                ),
              ),
            ),
            o.a.createElement(
              m.MDXTag,
              { name: 'li', components: a, parentName: 'ol' },
              o.a.createElement(
                m.MDXTag,
                { name: 'p', components: a, parentName: 'li' },
                'Insert the following lines inside the dependencies block in\n',
                o.a.createElement(
                  m.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'android/app/build.gradle',
                ),
                ':',
              ),
              o.a.createElement(
                m.MDXTag,
                { name: 'pre', components: a, parentName: 'li' },
                o.a.createElement(
                  m.MDXTag,
                  { name: 'code', components: a, parentName: 'pre' },
                  "  compile project(':react-native-share')\n",
                ),
              ),
            ),
            o.a.createElement(
              m.MDXTag,
              { name: 'li', components: a, parentName: 'ol' },
              o.a.createElement(
                m.MDXTag,
                { name: 'p', components: a, parentName: 'li' },
                'Follow this\n',
                o.a.createElement(
                  m.MDXTag,
                  {
                    name: 'a',
                    components: a,
                    parentName: 'p',
                    props: {
                      href:
                        'https://developer.android.com/training/secure-file-sharing/setup-sharing.html',
                    },
                  },
                  'guide',
                ),
                '.\nFor example:',
              ),
            ),
          ),
          o.a.createElement(
            m.MDXTag,
            { name: 'ul', components: a },
            o.a.createElement(
              m.MDXTag,
              { name: 'li', components: a, parentName: 'ul' },
              o.a.createElement(
                m.MDXTag,
                { name: 'p', components: a, parentName: 'li' },
                'Put this in ',
                o.a.createElement(
                  m.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'AndroidManifest.xml',
                ),
                ' where ',
                o.a.createElement(
                  m.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'applicationId',
                ),
                ' is something that\nyou have defined in ',
                o.a.createElement(
                  m.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'android/app/build.gradle',
                ),
                ':',
              ),
              o.a.createElement(
                m.MDXTag,
                { name: 'pre', components: a, parentName: 'li' },
                o.a.createElement(
                  m.MDXTag,
                  {
                    name: 'code',
                    components: a,
                    parentName: 'pre',
                    props: { className: 'language-xml' },
                  },
                  '  <application>\n    <provider\n        android:name="android.support.v4.content.FileProvider"\n        android:authorities="${applicationId}.provider"\n        android:grantUriPermissions="true"\n        android:exported="false">\n        <meta-data\n            android:name="android.support.FILE_PROVIDER_PATHS"\n            android:resource="@xml/filepaths" />\n    </provider>\n  </application>\n',
                ),
              ),
            ),
            o.a.createElement(
              m.MDXTag,
              { name: 'li', components: a, parentName: 'ul' },
              o.a.createElement(
                m.MDXTag,
                { name: 'p', components: a, parentName: 'li' },
                'Create a ',
                o.a.createElement(
                  m.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'filepaths.xml',
                ),
                ' under this directory:\n',
                o.a.createElement(
                  m.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'android/app/src/main/res/xml',
                ),
                '. In this file, add the following contents:',
              ),
              o.a.createElement(
                m.MDXTag,
                { name: 'pre', components: a, parentName: 'li' },
                o.a.createElement(
                  m.MDXTag,
                  {
                    name: 'code',
                    components: a,
                    parentName: 'pre',
                    props: { className: 'language-xml' },
                  },
                  '  <?xml version="1.0" encoding="utf-8"?>\n  <paths xmlns:android="http://schemas.android.com/apk/res/android">\n      <external-path name="myexternalimages" path="Download/" />\n  </paths>\n',
                ),
              ),
            ),
          ),
          o.a.createElement(
            m.MDXTag,
            { name: 'ol', components: a, props: { start: 6 } },
            o.a.createElement(
              m.MDXTag,
              { name: 'li', components: a, parentName: 'ol' },
              'Edit your ',
              o.a.createElement(
                m.MDXTag,
                { name: 'inlineCode', components: a, parentName: 'li' },
                'MainApplication',
              ),
              ' class to implement ',
              o.a.createElement(
                m.MDXTag,
                { name: 'inlineCode', components: a, parentName: 'li' },
                'ShareApplication',
              ),
            ),
          ),
          o.a.createElement(
            m.MDXTag,
            { name: 'ul', components: a },
            o.a.createElement(
              m.MDXTag,
              { name: 'li', components: a, parentName: 'ul' },
              o.a.createElement(
                m.MDXTag,
                { name: 'p', components: a, parentName: 'li' },
                'Also add the ',
                o.a.createElement(
                  m.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'getFileProviderAuthority',
                ),
                ' method to your MainApplication class,\nand have it return the ',
                o.a.createElement(
                  m.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'android:authorities',
                ),
                ' that was added in\nAndroidManifest file.',
              ),
            ),
            o.a.createElement(
              m.MDXTag,
              { name: 'li', components: a, parentName: 'ul' },
              o.a.createElement(
                m.MDXTag,
                { name: 'p', components: a, parentName: 'li' },
                'For example: Replace the ',
                o.a.createElement(
                  m.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'com.example.yourappidhere',
                ),
                ' below with the\n',
                o.a.createElement(
                  m.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'applicationId',
                ),
                ' that is defined in your ',
                o.a.createElement(
                  m.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'android/app/build.gradle',
                ),
                '. It must\nbe ',
                o.a.createElement(
                  m.MDXTag,
                  {
                    name: 'a',
                    components: a,
                    parentName: 'p',
                    props: {
                      href:
                        'https://github.com/EstebanFuentealba/react-native-share/issues/200#issuecomment-361938532',
                    },
                  },
                  'hard-coded here to work\nproperly',
                ),
                '.',
              ),
              o.a.createElement(
                m.MDXTag,
                { name: 'pre', components: a, parentName: 'li' },
                o.a.createElement(
                  m.MDXTag,
                  { name: 'code', components: a, parentName: 'pre' },
                  'import cl.json.ShareApplication\n\nclass MyApplication extends Application implements ShareApplication, ReactApplication {\n\n{\n\n     //...\n\n     @Override\n     public String getFileProviderAuthority() {\n            return "com.example.yourappidhere.provider";\n     }\n\n}\n',
                ),
              ),
            ),
          ),
          o.a.createElement(
            m.MDXTag,
            { name: 'h4', components: a, props: { id: 'windows-install' } },
            'Windows Install',
          ),
          o.a.createElement(
            m.MDXTag,
            { name: 'p', components: a },
            o.a.createElement(
              m.MDXTag,
              {
                name: 'a',
                components: a,
                parentName: 'p',
                props: { href: 'https://github.com/ReactWindows/react-native' },
              },
              'Read it! :D',
            ),
          ),
          o.a.createElement(
            m.MDXTag,
            { name: 'ol', components: a },
            o.a.createElement(
              m.MDXTag,
              { name: 'li', components: a, parentName: 'ol' },
              o.a.createElement(
                m.MDXTag,
                { name: 'inlineCode', components: a, parentName: 'li' },
                'npm install react-native-share --save',
              ),
            ),
            o.a.createElement(
              m.MDXTag,
              { name: 'li', components: a, parentName: 'ol' },
              'In Visual Studio add the ',
              o.a.createElement(
                m.MDXTag,
                { name: 'inlineCode', components: a, parentName: 'li' },
                'RNShare.sln',
              ),
              ' in ',
              o.a.createElement(
                m.MDXTag,
                { name: 'inlineCode', components: a, parentName: 'li' },
                'node_modules/react-native-share/windows/RNShare.sln',
              ),
              ' folder to their solution, reference from their app.',
            ),
            o.a.createElement(
              m.MDXTag,
              { name: 'li', components: a, parentName: 'ol' },
              'Open up your ',
              o.a.createElement(
                m.MDXTag,
                { name: 'inlineCode', components: a, parentName: 'li' },
                'MainPage.cs',
              ),
              ' app',
            ),
          ),
          o.a.createElement(
            m.MDXTag,
            { name: 'ul', components: a },
            o.a.createElement(
              m.MDXTag,
              { name: 'li', components: a, parentName: 'ul' },
              'Add ',
              o.a.createElement(
                m.MDXTag,
                { name: 'inlineCode', components: a, parentName: 'li' },
                'using Cl.Json.RNShare;',
              ),
              ' to the usings at the top of the file',
            ),
            o.a.createElement(
              m.MDXTag,
              { name: 'li', components: a, parentName: 'ul' },
              'Add ',
              o.a.createElement(
                m.MDXTag,
                { name: 'inlineCode', components: a, parentName: 'li' },
                'new RNSharePackage()',
              ),
              ' to the ',
              o.a.createElement(
                m.MDXTag,
                { name: 'inlineCode', components: a, parentName: 'li' },
                'List<IReactPackage>',
              ),
              ' returned by the ',
              o.a.createElement(
                m.MDXTag,
                { name: 'inlineCode', components: a, parentName: 'li' },
                'Packages',
              ),
              ' method',
            ),
          ),
        );
      };
    },
  },
]);
