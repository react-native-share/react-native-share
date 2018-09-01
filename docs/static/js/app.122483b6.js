(window.webpackJsonp = window.webpackJsonp || []).push([
  [0],
  {
    './.docz/app/db.json': function(e) {
      e.exports = {
        config: {
          title: 'React Native Share',
          description: 'Social share, sending simple data to other apps.',
          themeConfig: {},
          ordering: 'descending',
          version: '1.1.1',
          repository: 'https://github.com/react-native-community/react-native-share',
          src: './documentation',
          plugins: [{}],
        },
        entries: {
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
                value: 'Share remote pdf file with gmail whatsapp ios',
              },
            ],
          },
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
              { depth: 2, slug: 'ios-install', value: 'Ios install' },
              { depth: 2, slug: 'android-install', value: 'Android install' },
              { depth: 4, slug: 'windows-install', value: 'Windows install' },
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
                value: 'Welcome to react native share',
              },
            ],
          },
          'method.mdx': {
            name: '3 - Methods',
            route: '/methods',
            id: 'd5618d466e90be13a0f7e2006e0c07b1',
            filepath: 'method.mdx',
            link:
              'https://github.com/react-native-community/react-native-share/edit/master/documentation/method.mdx',
            slug: 'method',
            order: 0,
            menu: null,
            headings: [
              { depth: 1, slug: 'methods', value: 'Methods' },
              { depth: 2, slug: 'open-simple-share-dialog', value: 'Open simple share dialog' },
              { depth: 2, slug: 'supported-options', value: 'Supported options' },
              {
                depth: 2,
                slug: 'sharesingle-options-in-ios--android',
                value: 'Sharesingle options in ios android',
              },
              { depth: 2, slug: 'static-values-for-social', value: 'Static values for social' },
              { depth: 2, slug: 'how-it-looks', value: 'How it looks' },
            ],
          },
        },
      };
    },
    './.docz/app/index.jsx': function(e, t, o) {
      'use strict';
      o.r(t);
      var n = o('./node_modules/react/index.js'),
        a = o.n(n),
        i = o('./node_modules/react-dom/index.js'),
        l = o.n(i),
        s = {
          'Troubleshooting.mdx': function() {
            return o.e(1).then(o.bind(null, './documentation/Troubleshooting.mdx'));
          },
          'Install.mdx': function() {
            return o.e(2).then(o.bind(null, './documentation/Install.mdx'));
          },
          'Usage.mdx': function() {
            return o.e(3).then(o.bind(null, './documentation/Usage.mdx'));
          },
          'Welcome.mdx': function() {
            return o.e(4).then(o.bind(null, './documentation/Welcome.mdx'));
          },
          'method.mdx': function() {
            return o.e(5).then(o.bind(null, './documentation/method.mdx'));
          },
        },
        d = o('./.docz/app/root.jsx'),
        u = [],
        r = [],
        m = function() {
          return r.forEach(function(e) {
            return e && e();
          });
        },
        c = document.querySelector('#root');
      (function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : d.a;
        u.forEach(function(e) {
          return e && e();
        }),
          l.a.render(a.a.createElement(e, { imports: s }), c, m);
      })(d.a);
    },
    './.docz/app/root.jsx': function(e, t, o) {
      'use strict';
      (function(e) {
        var n = o('./node_modules/react/index.js'),
          a = o.n(n),
          i = o('./node_modules/react-hot-loader/index.js'),
          l = o('./node_modules/docz-theme-default/dist/index.m.js'),
          s = o('./.docz/app/db.json'),
          d = function(e) {
            var t = e.imports;
            return a.a.createElement(l.a, { db: s, imports: t, hashRouter: !1 });
          };
        (t.a = Object(i.hot)(e)(d)),
          (d.__docgenInfo = { description: '', methods: [], displayName: 'Root' });
      }.call(this, o('./node_modules/webpack/buildin/harmony-module.js')(e)));
    },
    0: function(e, t, o) {
      o('./node_modules/@babel/polyfill/lib/index.js'), (e.exports = o('./.docz/app/index.jsx'));
    },
  },
  [[0, 7, 6]],
  [5, 2, 1, 3, 4],
]);
