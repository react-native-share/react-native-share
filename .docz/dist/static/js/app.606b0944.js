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
          src: './docs',
        },
        entries: {
          'Install.mdx': {
            name: '2 - Install Module',
            route: '/install',
            id: '6bb65d8697e58707648534fa44576e5f',
            filepath: 'Install.mdx',
            link:
              'https://github.com/react-native-community/react-native-share/edit/master/docs/Install.mdx',
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
          'Method.mdx': {
            name: '3 - Methods',
            route: '/methods',
            id: '45dee748753aa5e24bf980cd49fac388',
            filepath: 'Method.mdx',
            link:
              'https://github.com/react-native-community/react-native-share/edit/master/docs/Method.mdx',
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
          'Troubleshooting.mdx': {
            name: '5 - Troubleshooting',
            route: '/troubleshooting',
            id: 'ec440e0c2394b80e077917ed33469dfa',
            filepath: 'Troubleshooting.mdx',
            link:
              'https://github.com/react-native-community/react-native-share/edit/master/docs/Troubleshooting.mdx',
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
          'Usage.mdx': {
            name: '4 - Usage',
            route: '/usage',
            id: '6fd14513d4f66a68d068c8be06ad209a',
            filepath: 'Usage.mdx',
            link:
              'https://github.com/react-native-community/react-native-share/edit/master/docs/Usage.mdx',
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
            id: '1d8e6ec09a2aa1ad9e0269bc3b390609',
            filepath: 'Welcome.mdx',
            link:
              'https://github.com/react-native-community/react-native-share/edit/master/docs/Welcome.mdx',
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
        },
      };
    },
    './.docz/app/index.jsx': function(e, t, o) {
      'use strict';
      o.r(t);
      var a = o('./node_modules/react/index.js'),
        n = o.n(a),
        l = o('./node_modules/react-dom/index.js'),
        s = o.n(l),
        i = {
          'Install.mdx': function() {
            return o.e(1).then(o.bind(null, './docs/Install.mdx'));
          },
          'Method.mdx': function() {
            return o.e(2).then(o.bind(null, './docs/Method.mdx'));
          },
          'Troubleshooting.mdx': function() {
            return o.e(3).then(o.bind(null, './docs/Troubleshooting.mdx'));
          },
          'Usage.mdx': function() {
            return o.e(4).then(o.bind(null, './docs/Usage.mdx'));
          },
          'Welcome.mdx': function() {
            return o.e(5).then(o.bind(null, './docs/Welcome.mdx'));
          },
        },
        d = o('./.docz/app/root.jsx'),
        r = [],
        u = [],
        h = function() {
          return u.forEach(function(e) {
            return e && e();
          });
        },
        c = document.querySelector('#root');
      (function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : d.a;
        r.forEach(function(e) {
          return e && e();
        }),
          s.a.render(n.a.createElement(e, { imports: i }), c, h);
      })(d.a);
    },
    './.docz/app/root.jsx': function(e, t, o) {
      'use strict';
      (function(e) {
        var a = o('./node_modules/react/index.js'),
          n = o.n(a),
          l = o('./node_modules/react-hot-loader/index.js'),
          s = o('./node_modules/docz-theme-default/dist/index.m.js'),
          i = o('./.docz/app/db.json'),
          d = function(e) {
            var t = e.imports;
            return n.a.createElement(s.a, { db: i, imports: t, hashRouter: !1 });
          };
        (t.a = Object(l.hot)(e)(d)),
          (d.__docgenInfo = { description: '', methods: [], displayName: 'Root' });
      }.call(this, o('./node_modules/webpack/buildin/harmony-module.js')(e)));
    },
    0: function(e, t, o) {
      o('./node_modules/@babel/polyfill/lib/index.js'), (e.exports = o('./.docz/app/index.jsx'));
    },
  },
  [[0, 7, 6]],
  [1, 2, 3, 4, 5],
]);
