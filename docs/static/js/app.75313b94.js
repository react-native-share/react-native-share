(window.webpackJsonp = window.webpackJsonp || []).push([
  [0],
  {
    './.docz/app/db.json': function(e) {
      e.exports = {
        config: {
          title: 'react-native-share',
          description: 'Social share, sending simple data to other apps.',
          themeConfig: {},
          ordering: 'ascending',
          version: '1.1.1',
          repository: 'https://github.com/react-native-community/react-native-share',
          native: !1,
          src: './documentation',
          dest: './docs',
          hashRouter: !0,
          base: '/react-native-share/',
        },
        entries: {
          'Install.mdx': {
            name: '2 - Install Module',
            route: '/install',
            id: '9abef84ef79c895920165f2bfd910798',
            filepath: 'Install.mdx',
            link:
              'https://github.com/react-native-community/react-native-share/edit/master/documentation/Install.mdx',
            slug: 'install',
            order: 0,
            menu: null,
            headings: [
              { depth: 1, slug: 'install', value: 'Install' },
              { depth: 2, slug: 'manual-install', value: 'Manual install' },
              { depth: 2, slug: 'ios-install', value: 'IOS Install' },
              { depth: 2, slug: 'android-install', value: 'Android Install' },
              { depth: 4, slug: 'windows-install', value: 'Windows Install' },
            ],
          },
          'Method.mdx': {
            name: '3 - Methods',
            route: '/methods',
            id: '42061783c1bb0cc749f6b71c542ec91d',
            filepath: 'Method.mdx',
            link:
              'https://github.com/react-native-community/react-native-share/edit/master/documentation/Method.mdx',
            slug: 'method',
            order: 0,
            menu: null,
            headings: [
              { depth: 1, slug: 'methods', value: 'Methods' },
              { depth: 2, slug: 'open-simple-share-dialog', value: 'Open Simple share dialog' },
              { depth: 2, slug: 'supported-options', value: 'Supported options:' },
              {
                depth: 2,
                slug: 'sharesingle-options-in-ios--android',
                value: 'shareSingle options (in iOS & Android)',
              },
              { depth: 2, slug: 'static-values-for-social', value: 'Static Values for social' },
              { depth: 2, slug: 'how-it-looks', value: 'how it looks:' },
            ],
          },
          'Troubleshooting.mdx': {
            name: '5 - Troubleshooting',
            route: '/troubleshooting',
            id: '645af1ae1ddad28cad778809df0206f2',
            filepath: 'Troubleshooting.mdx',
            link:
              'https://github.com/react-native-community/react-native-share/edit/master/documentation/Troubleshooting.mdx',
            slug: 'troubleshooting',
            order: 0,
            menu: null,
            headings: [
              { depth: 1, slug: 'troubleshooting', value: 'Troubleshooting' },
              {
                depth: 2,
                slug: 'share-remote-pdf-file-with-gmail--whatsapp-ios',
                value: 'Share Remote PDF File with Gmail & WhatsApp (iOS)',
              },
            ],
          },
          'Usage.mdx': {
            name: '4 - Usage',
            route: '/usage',
            id: 'c10cf346f47b6e00791f2856b45ccb71',
            filepath: 'Usage.mdx',
            link:
              'https://github.com/react-native-community/react-native-share/edit/master/documentation/Usage.mdx',
            slug: 'usage',
            order: 0,
            menu: null,
            headings: [
              { depth: 1, slug: 'usage', value: 'Usage' },
              { depth: 2, slug: 'example-code', value: 'Example code' },
              {
                depth: 2,
                slug: 'url-format-when-sharing-a-file',
                value: 'Url format when sharing a file',
              },
              { depth: 4, slug: 'share-base-64-file', value: 'Share base 64 file' },
              { depth: 4, slug: 'share-file-directly', value: 'Share file directly' },
            ],
          },
          'Welcome.mdx': {
            name: '1 - Welcome',
            route: '/',
            id: 'da44f0662ca0f46b12426a1b184f060c',
            filepath: 'Welcome.mdx',
            link:
              'https://github.com/react-native-community/react-native-share/edit/master/documentation/Welcome.mdx',
            slug: 'welcome',
            order: 0,
            menu: null,
            headings: [
              {
                depth: 1,
                slug: 'welcome-to-react-native-share',
                value: 'Welcome to React Native Share',
              },
            ],
          },
        },
      };
    },
    './.docz/app/imports.js': function(e, t, n) {
      'use strict';
      n.d(t, 'a', function() {
        return o;
      });
      var o = {
        'Install.mdx': function() {
          return n.e(1).then(n.bind(null, './documentation/Install.mdx'));
        },
        'Method.mdx': function() {
          return n.e(2).then(n.bind(null, './documentation/Method.mdx'));
        },
        'Troubleshooting.mdx': function() {
          return n.e(3).then(n.bind(null, './documentation/Troubleshooting.mdx'));
        },
        'Usage.mdx': function() {
          return n.e(4).then(n.bind(null, './documentation/Usage.mdx'));
        },
        'Welcome.mdx': function() {
          return n.e(5).then(n.bind(null, './documentation/Welcome.mdx'));
        },
      };
    },
    './.docz/app/index.jsx': function(e, t, n) {
      'use strict';
      n.r(t);
      var o = n('./node_modules/react/index.js'),
        a = n.n(o),
        i = n('./node_modules/react-dom/index.js'),
        l = n.n(i),
        s = n('./.docz/app/root.jsx'),
        d = [],
        u = [],
        r = function() {
          return u.forEach(function(e) {
            return e && e();
          });
        },
        c = document.querySelector('#root');
      !(function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s.a;
        d.forEach(function(e) {
          return e && e();
        }),
          l.a.render(a.a.createElement(e, null), c, r);
      })(s.a);
    },
    './.docz/app/root.jsx': function(e, t, n) {
      'use strict';
      (function(e) {
        var o = n('./node_modules/react/index.js'),
          a = n.n(o),
          i = n('./node_modules/react-hot-loader/index.js'),
          l = n('./node_modules/docz-theme-default/dist/index.js'),
          s = n.n(l),
          d = n('./.docz/app/imports.js'),
          u = n('./.docz/app/db.json'),
          r = function() {
            return a.a.createElement(s.a, { db: u, imports: d.a, hashRouter: !0 });
          };
        (t.a = Object(i.hot)(e)(r)),
          (r.__docgenInfo = { description: '', methods: [], displayName: 'Root' });
      }.call(this, n('./node_modules/webpack/buildin/harmony-module.js')(e)));
    },
    0: function(e, t, n) {
      n('./node_modules/@babel/polyfill/lib/index.js'), (e.exports = n('./.docz/app/index.jsx'));
    },
  },
  [[0, 7, 6]],
  [2, 1, 3, 4, 5],
]);
