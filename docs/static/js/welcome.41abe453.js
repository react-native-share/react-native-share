(window.webpackJsonp = window.webpackJsonp || []).push([
  [4],
  {
    './documentation/Welcome.mdx': function(e, a, t) {
      'use strict';
      t.r(a);
      var n = t('./node_modules/react/index.js'),
        r = t.n(n),
        o = t('./node_modules/@mdx-js/tag/dist/index.js');
      function m(e, a) {
        if (null == e) return {};
        var t,
          n,
          r = (function(e, a) {
            if (null == e) return {};
            var t,
              n,
              r = {},
              o = Object.keys(e);
            for (n = 0; n < o.length; n++) (t = o[n]), a.indexOf(t) >= 0 || (r[t] = e[t]);
            return r;
          })(e, a);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(e);
          for (n = 0; n < o.length; n++)
            (t = o[n]),
              a.indexOf(t) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, t) && (r[t] = e[t]));
        }
        return r;
      }
      a.default = function(e) {
        var a = e.components;
        m(e, ['components']);
        return r.a.createElement(
          o.MDXTag,
          { name: 'wrapper', components: a },
          r.a.createElement(
            o.MDXTag,
            { name: 'h1', components: a, props: { id: 'welcome-to-react-native-share' } },
            r.a.createElement(
              o.MDXTag,
              {
                name: 'a',
                components: a,
                parentName: 'h1',
                props: { 'aria-hidden': !0, href: '#welcome-to-react-native-share' },
              },
              r.a.createElement(
                o.MDXTag,
                { name: 'span', components: a, parentName: 'a', props: { className: 'icon-link' } },
                '#',
              ),
            ),
            'Welcome to React Native Share',
          ),
          r.a.createElement(
            o.MDXTag,
            { name: 'p', components: a },
            r.a.createElement(
              o.MDXTag,
              {
                name: 'a',
                components: a,
                parentName: 'p',
                props: {
                  href:
                    'https://circleci.com/gh/react-native-community/react-native-share/tree/master',
                },
              },
              r.a.createElement(o.MDXTag, {
                name: 'img',
                components: a,
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
                components: a,
                parentName: 'p',
                props: { href: 'http://badge.fury.io/js/react-native-share' },
              },
              r.a.createElement(o.MDXTag, {
                name: 'img',
                components: a,
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
            { name: 'p', components: a },
            r.a.createElement(
              o.MDXTag,
              { name: 'strong', components: a, parentName: 'p' },
              r.a.createElement(
                o.MDXTag,
                { name: 'em', components: a, parentName: 'strong' },
                'NOTE: React Native now implements share functionality ',
                r.a.createElement(
                  o.MDXTag,
                  {
                    name: 'a',
                    components: a,
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
