(window.webpackJsonp = window.webpackJsonp || []).push([
  [5],
  {
    './documentation/Welcome.mdx': function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a('./node_modules/react/index.js'),
        r = a.n(n),
        o = a('./node_modules/@mdx-js/tag/dist/index.js');
      function c(e, t) {
        if (null == e) return {};
        var a,
          n,
          r = (function(e, t) {
            if (null == e) return {};
            var a,
              n,
              r = {},
              o = Object.keys(e);
            for (n = 0; n < o.length; n++) (a = o[n]), t.indexOf(a) >= 0 || (r[a] = e[a]);
            return r;
          })(e, t);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(e);
          for (n = 0; n < o.length; n++)
            (a = o[n]),
              t.indexOf(a) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, a) && (r[a] = e[a]));
        }
        return r;
      }
      t.default = function(e) {
        var t = e.components;
        c(e, ['components']);
        return r.a.createElement(
          o.MDXTag,
          { name: 'wrapper', components: t },
          r.a.createElement(
            o.MDXTag,
            { name: 'h1', components: t, props: { id: 'welcome-to-react-native-share' } },
            'Welcome to React Native Share',
          ),
          r.a.createElement(
            o.MDXTag,
            { name: 'p', components: t },
            r.a.createElement(
              o.MDXTag,
              {
                name: 'a',
                components: t,
                parentName: 'p',
                props: {
                  href:
                    'https://circleci.com/gh/react-native-community/react-native-share/tree/master',
                },
              },
              r.a.createElement(o.MDXTag, {
                name: 'img',
                components: t,
                parentName: 'a',
                props: {
                  src:
                    'https://circleci.com/gh/react-native-community/react-native-share/tree/master.svg?style=svg&circle-token=0c6860240abba4e16bd07df0ea805a72b67b8d41',
                  alt: 'CircleCI',
                },
              }),
            ),
            ' ',
            r.a.createElement(
              o.MDXTag,
              {
                name: 'a',
                components: t,
                parentName: 'p',
                props: { href: 'http://badge.fury.io/js/react-native-share' },
              },
              r.a.createElement(o.MDXTag, {
                name: 'img',
                components: t,
                parentName: 'a',
                props: {
                  src: 'https://badge.fury.io/js/react-native-share.svg',
                  alt: 'npm version',
                },
              }),
            ),
            '\nShare Social , Sending Simple Data to Other Apps',
          ),
          r.a.createElement(
            o.MDXTag,
            { name: 'p', components: t },
            r.a.createElement(
              o.MDXTag,
              { name: 'strong', components: t, parentName: 'p' },
              r.a.createElement(
                o.MDXTag,
                { name: 'em', components: t, parentName: 'strong' },
                'NOTE: React Native now implements share functionality ',
                r.a.createElement(
                  o.MDXTag,
                  {
                    name: 'a',
                    components: t,
                    parentName: 'em',
                    props: { href: 'https://facebook.github.io/react-native/docs/share.html' },
                  },
                  'Read more',
                ),
              ),
            ),
          ),
        );
      };
    },
  },
]);
