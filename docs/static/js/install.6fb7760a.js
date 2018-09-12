(window.webpackJsonp = window.webpackJsonp || []).push([
  [2],
  {
    './documentation/Install.mdx': function(e, a, n) {
      'use strict';
      n.r(a);
      var t = n('./node_modules/react/index.js'),
        m = n.n(t),
        o = n('./node_modules/@mdx-js/tag/dist/index.js');
      function r(e, a) {
        if (null == e) return {};
        var n,
          t,
          m = (function(e, a) {
            if (null == e) return {};
            var n,
              t,
              m = {},
              o = Object.keys(e);
            for (t = 0; t < o.length; t++) (n = o[t]), a.indexOf(n) >= 0 || (m[n] = e[n]);
            return m;
          })(e, a);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(e);
          for (t = 0; t < o.length; t++)
            (n = o[t]),
              a.indexOf(n) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, n) && (m[n] = e[n]));
        }
        return m;
      }
      a.default = function(e) {
        var a = e.components;
        r(e, ['components']);
        return m.a.createElement(
          o.MDXTag,
          { name: 'wrapper', components: a },
          m.a.createElement(
            o.MDXTag,
            { name: 'h1', components: a, props: { id: 'install' } },
            m.a.createElement(
              o.MDXTag,
              {
                name: 'a',
                components: a,
                parentName: 'h1',
                props: { 'aria-hidden': !0, href: '#install' },
              },
              m.a.createElement(
                o.MDXTag,
                { name: 'span', components: a, parentName: 'a', props: { className: 'icon-link' } },
                '#',
              ),
            ),
            'Install',
          ),
          m.a.createElement(
            o.MDXTag,
            { name: 'h2', components: a, props: { id: 'manual-install' } },
            m.a.createElement(
              o.MDXTag,
              {
                name: 'a',
                components: a,
                parentName: 'h2',
                props: { 'aria-hidden': !0, href: '#manual-install' },
              },
              m.a.createElement(
                o.MDXTag,
                { name: 'span', components: a, parentName: 'a', props: { className: 'icon-link' } },
                '#',
              ),
            ),
            'Manual install',
          ),
          m.a.createElement(
            o.MDXTag,
            { name: 'p', components: a },
            m.a.createElement(
              o.MDXTag,
              { name: 'inlineCode', components: a, parentName: 'p' },
              'npm install react-native-share --save',
            ),
          ),
          m.a.createElement(
            o.MDXTag,
            { name: 'h2', components: a, props: { id: 'ios-install' } },
            m.a.createElement(
              o.MDXTag,
              {
                name: 'a',
                components: a,
                parentName: 'h2',
                props: { 'aria-hidden': !0, href: '#ios-install' },
              },
              m.a.createElement(
                o.MDXTag,
                { name: 'span', components: a, parentName: 'a', props: { className: 'icon-link' } },
                '#',
              ),
            ),
            'IOS Install',
          ),
          m.a.createElement(
            o.MDXTag,
            { name: 'ol', components: a },
            m.a.createElement(
              o.MDXTag,
              { name: 'li', components: a, parentName: 'ol' },
              m.a.createElement(
                o.MDXTag,
                { name: 'p', components: a, parentName: 'li' },
                m.a.createElement(
                  o.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'npm install react-native-share --save',
                ),
              ),
            ),
            m.a.createElement(
              o.MDXTag,
              { name: 'li', components: a, parentName: 'ol' },
              m.a.createElement(
                o.MDXTag,
                { name: 'p', components: a, parentName: 'li' },
                'In XCode, in the project navigator, right click ',
                m.a.createElement(
                  o.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'Libraries',
                ),
                ' \u279c ',
                m.a.createElement(
                  o.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  "Add Files to [your project's name]",
                ),
              ),
            ),
            m.a.createElement(
              o.MDXTag,
              { name: 'li', components: a, parentName: 'ol' },
              m.a.createElement(
                o.MDXTag,
                { name: 'p', components: a, parentName: 'li' },
                'Go to ',
                m.a.createElement(
                  o.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'node_modules',
                ),
                ' \u279c ',
                m.a.createElement(
                  o.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'react-native-share',
                ),
                ' \u279c ',
                m.a.createElement(
                  o.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'ios',
                ),
                ' and add ',
                m.a.createElement(
                  o.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'RNShare.xcodeproj',
                ),
              ),
            ),
            m.a.createElement(
              o.MDXTag,
              { name: 'li', components: a, parentName: 'ol' },
              m.a.createElement(
                o.MDXTag,
                { name: 'p', components: a, parentName: 'li' },
                'In XCode, in the project navigator, select your project. Add ',
                m.a.createElement(
                  o.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'libRNShare.a',
                ),
                " to your project's ",
                m.a.createElement(
                  o.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'Build Phases',
                ),
                ' \u279c ',
                m.a.createElement(
                  o.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'Link Binary With Libraries',
                ),
              ),
            ),
            m.a.createElement(
              o.MDXTag,
              { name: 'li', components: a, parentName: 'ol' },
              m.a.createElement(
                o.MDXTag,
                { name: 'p', components: a, parentName: 'li' },
                'In XCode, in the project navigator, select your project. Add ',
                m.a.createElement(
                  o.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'Social.framework',
                ),
                ' and ',
                m.a.createElement(
                  o.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'MessageUI.framework',
                ),
                " to your project's ",
                m.a.createElement(
                  o.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'General',
                ),
                ' \u279c ',
                m.a.createElement(
                  o.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'Linked Frameworks and Libraries',
                ),
              ),
            ),
            m.a.createElement(
              o.MDXTag,
              { name: 'li', components: a, parentName: 'ol' },
              m.a.createElement(
                o.MDXTag,
                { name: 'p', components: a, parentName: 'li' },
                'In file Info.plist, add',
              ),
              m.a.createElement(
                o.MDXTag,
                { name: 'pre', components: a, parentName: 'li' },
                m.a.createElement(
                  o.MDXTag,
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
            m.a.createElement(
              o.MDXTag,
              { name: 'li', components: a, parentName: 'ol' },
              m.a.createElement(
                o.MDXTag,
                { name: 'p', components: a, parentName: 'li' },
                'Run your project (',
                m.a.createElement(
                  o.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'Cmd+R',
                ),
                ')',
              ),
            ),
          ),
          m.a.createElement(
            o.MDXTag,
            { name: 'h2', components: a, props: { id: 'android-install' } },
            m.a.createElement(
              o.MDXTag,
              {
                name: 'a',
                components: a,
                parentName: 'h2',
                props: { 'aria-hidden': !0, href: '#android-install' },
              },
              m.a.createElement(
                o.MDXTag,
                { name: 'span', components: a, parentName: 'a', props: { className: 'icon-link' } },
                '#',
              ),
            ),
            'Android Install',
          ),
          m.a.createElement(
            o.MDXTag,
            { name: 'ol', components: a },
            m.a.createElement(
              o.MDXTag,
              { name: 'li', components: a, parentName: 'ol' },
              m.a.createElement(
                o.MDXTag,
                { name: 'inlineCode', components: a, parentName: 'li' },
                'npm install react-native-share --save',
              ),
            ),
            m.a.createElement(
              o.MDXTag,
              { name: 'li', components: a, parentName: 'ol' },
              'Open up ',
              m.a.createElement(
                o.MDXTag,
                { name: 'inlineCode', components: a, parentName: 'li' },
                'android/app/src/main/java/[...]/MainApplication.java',
              ),
            ),
          ),
          m.a.createElement(
            o.MDXTag,
            { name: 'ul', components: a },
            m.a.createElement(
              o.MDXTag,
              { name: 'li', components: a, parentName: 'ul' },
              'Add ',
              m.a.createElement(
                o.MDXTag,
                { name: 'inlineCode', components: a, parentName: 'li' },
                'import cl.json.RNSharePackage;',
              ),
              ' and ',
              m.a.createElement(
                o.MDXTag,
                { name: 'inlineCode', components: a, parentName: 'li' },
                'import cl.json.ShareApplication;',
              ),
              ' to the imports at the top of the file',
            ),
            m.a.createElement(
              o.MDXTag,
              { name: 'li', components: a, parentName: 'ul' },
              'Add ',
              m.a.createElement(
                o.MDXTag,
                { name: 'inlineCode', components: a, parentName: 'li' },
                'new RNSharePackage()',
              ),
              ' to the list returned by the ',
              m.a.createElement(
                o.MDXTag,
                { name: 'inlineCode', components: a, parentName: 'li' },
                'getPackages()',
              ),
              '\nmethod',
            ),
          ),
          m.a.createElement(
            o.MDXTag,
            { name: 'ol', components: a, props: { start: 3 } },
            m.a.createElement(
              o.MDXTag,
              { name: 'li', components: a, parentName: 'ol' },
              m.a.createElement(
                o.MDXTag,
                { name: 'p', components: a, parentName: 'li' },
                'Append the following lines to ',
                m.a.createElement(
                  o.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'android/settings.gradle',
                ),
                ':',
              ),
              m.a.createElement(
                o.MDXTag,
                { name: 'pre', components: a, parentName: 'li' },
                m.a.createElement(
                  o.MDXTag,
                  { name: 'code', components: a, parentName: 'pre' },
                  "include ':react-native-share'\nproject(':react-native-share').projectDir = new File(rootProject.projectDir,    '../node_modules/react-native-share/android')\n",
                ),
              ),
            ),
            m.a.createElement(
              o.MDXTag,
              { name: 'li', components: a, parentName: 'ol' },
              m.a.createElement(
                o.MDXTag,
                { name: 'p', components: a, parentName: 'li' },
                'Insert the following lines inside the dependencies block in\n',
                m.a.createElement(
                  o.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'android/app/build.gradle',
                ),
                ':',
              ),
              m.a.createElement(
                o.MDXTag,
                { name: 'pre', components: a, parentName: 'li' },
                m.a.createElement(
                  o.MDXTag,
                  { name: 'code', components: a, parentName: 'pre' },
                  "  compile project(':react-native-share')\n",
                ),
              ),
            ),
            m.a.createElement(
              o.MDXTag,
              { name: 'li', components: a, parentName: 'ol' },
              m.a.createElement(
                o.MDXTag,
                { name: 'p', components: a, parentName: 'li' },
                'Follow this\n',
                m.a.createElement(
                  o.MDXTag,
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
          m.a.createElement(
            o.MDXTag,
            { name: 'ul', components: a },
            m.a.createElement(
              o.MDXTag,
              { name: 'li', components: a, parentName: 'ul' },
              m.a.createElement(
                o.MDXTag,
                { name: 'p', components: a, parentName: 'li' },
                'Put this in ',
                m.a.createElement(
                  o.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'AndroidManifest.xml',
                ),
                ' where ',
                m.a.createElement(
                  o.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'applicationId',
                ),
                ' is something that\nyou have defined in ',
                m.a.createElement(
                  o.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'android/app/build.gradle',
                ),
                ':',
              ),
              m.a.createElement(
                o.MDXTag,
                { name: 'pre', components: a, parentName: 'li' },
                m.a.createElement(
                  o.MDXTag,
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
            m.a.createElement(
              o.MDXTag,
              { name: 'li', components: a, parentName: 'ul' },
              m.a.createElement(
                o.MDXTag,
                { name: 'p', components: a, parentName: 'li' },
                'Create a ',
                m.a.createElement(
                  o.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'filepaths.xml',
                ),
                ' under this directory:\n',
                m.a.createElement(
                  o.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'android/app/src/main/res/xml',
                ),
                '. In this file, add the following contents:',
              ),
              m.a.createElement(
                o.MDXTag,
                { name: 'pre', components: a, parentName: 'li' },
                m.a.createElement(
                  o.MDXTag,
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
          m.a.createElement(
            o.MDXTag,
            { name: 'ol', components: a, props: { start: 6 } },
            m.a.createElement(
              o.MDXTag,
              { name: 'li', components: a, parentName: 'ol' },
              'Edit your ',
              m.a.createElement(
                o.MDXTag,
                { name: 'inlineCode', components: a, parentName: 'li' },
                'MainApplication',
              ),
              ' class to implement ',
              m.a.createElement(
                o.MDXTag,
                { name: 'inlineCode', components: a, parentName: 'li' },
                'ShareApplication',
              ),
            ),
          ),
          m.a.createElement(
            o.MDXTag,
            { name: 'ul', components: a },
            m.a.createElement(
              o.MDXTag,
              { name: 'li', components: a, parentName: 'ul' },
              m.a.createElement(
                o.MDXTag,
                { name: 'p', components: a, parentName: 'li' },
                'Also add the ',
                m.a.createElement(
                  o.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'getFileProviderAuthority',
                ),
                ' method to your MainApplication class,\nand have it return the ',
                m.a.createElement(
                  o.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'android:authorities',
                ),
                ' that was added in\nAndroidManifest file.',
              ),
            ),
            m.a.createElement(
              o.MDXTag,
              { name: 'li', components: a, parentName: 'ul' },
              m.a.createElement(
                o.MDXTag,
                { name: 'p', components: a, parentName: 'li' },
                'For example: Replace the ',
                m.a.createElement(
                  o.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'com.example.yourappidhere',
                ),
                ' below with the\n',
                m.a.createElement(
                  o.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'applicationId',
                ),
                ' that is defined in your ',
                m.a.createElement(
                  o.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'p' },
                  'android/app/build.gradle',
                ),
                '. It must\nbe ',
                m.a.createElement(
                  o.MDXTag,
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
              m.a.createElement(
                o.MDXTag,
                { name: 'pre', components: a, parentName: 'li' },
                m.a.createElement(
                  o.MDXTag,
                  { name: 'code', components: a, parentName: 'pre' },
                  'import cl.json.ShareApplication\n\nclass MyApplication extends Application implements ShareApplication, ReactApplication {\n\n{\n\n     //...\n\n     @Override\n     public String getFileProviderAuthority() {\n            return "com.example.yourappidhere.provider";\n     }\n\n}\n',
                ),
              ),
            ),
          ),
          m.a.createElement(
            o.MDXTag,
            { name: 'h4', components: a, props: { id: 'windows-install' } },
            m.a.createElement(
              o.MDXTag,
              {
                name: 'a',
                components: a,
                parentName: 'h4',
                props: { 'aria-hidden': !0, href: '#windows-install' },
              },
              m.a.createElement(
                o.MDXTag,
                { name: 'span', components: a, parentName: 'a', props: { className: 'icon-link' } },
                '#',
              ),
            ),
            'Windows Install',
          ),
          m.a.createElement(
            o.MDXTag,
            { name: 'p', components: a },
            m.a.createElement(
              o.MDXTag,
              {
                name: 'a',
                components: a,
                parentName: 'p',
                props: { href: 'https://github.com/ReactWindows/react-native' },
              },
              'Read it! :D',
            ),
          ),
          m.a.createElement(
            o.MDXTag,
            { name: 'ol', components: a },
            m.a.createElement(
              o.MDXTag,
              { name: 'li', components: a, parentName: 'ol' },
              m.a.createElement(
                o.MDXTag,
                { name: 'inlineCode', components: a, parentName: 'li' },
                'npm install react-native-share --save',
              ),
            ),
            m.a.createElement(
              o.MDXTag,
              { name: 'li', components: a, parentName: 'ol' },
              'In Visual Studio add the ',
              m.a.createElement(
                o.MDXTag,
                { name: 'inlineCode', components: a, parentName: 'li' },
                'RNShare.sln',
              ),
              ' in ',
              m.a.createElement(
                o.MDXTag,
                { name: 'inlineCode', components: a, parentName: 'li' },
                'node_modules/react-native-share/windows/RNShare.sln',
              ),
              ' folder to their solution, reference from their app.',
            ),
            m.a.createElement(
              o.MDXTag,
              { name: 'li', components: a, parentName: 'ol' },
              'Open up your ',
              m.a.createElement(
                o.MDXTag,
                { name: 'inlineCode', components: a, parentName: 'li' },
                'MainPage.cs',
              ),
              ' app',
            ),
          ),
          m.a.createElement(
            o.MDXTag,
            { name: 'ul', components: a },
            m.a.createElement(
              o.MDXTag,
              { name: 'li', components: a, parentName: 'ul' },
              'Add ',
              m.a.createElement(
                o.MDXTag,
                { name: 'inlineCode', components: a, parentName: 'li' },
                'using Cl.Json.RNShare;',
              ),
              ' to the usings at the top of the file',
            ),
            m.a.createElement(
              o.MDXTag,
              { name: 'li', components: a, parentName: 'ul' },
              'Add ',
              m.a.createElement(
                o.MDXTag,
                { name: 'inlineCode', components: a, parentName: 'li' },
                'new RNSharePackage()',
              ),
              ' to the ',
              m.a.createElement(
                o.MDXTag,
                { name: 'inlineCode', components: a, parentName: 'li' },
                'List<IReactPackage>',
              ),
              ' returned by the ',
              m.a.createElement(
                o.MDXTag,
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
