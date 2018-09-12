(window.webpackJsonp = window.webpackJsonp || []).push([
  [2],
  {
    './assets/android-250x.png': function(e, a, t) {
      e.exports = t.p + 'static/img/android-250x.25e1e8d0.png';
    },
    './assets/android-component-250x.gif': function(e, a, t) {
      e.exports = t.p + 'static/img/android-component-250x.684cc245.gif';
    },
    './assets/ios-250x.png': function(e, a, t) {
      e.exports = t.p + 'static/img/ios-250x.2754a407.png';
    },
    './assets/ios-component-250x.gif': function(e, a, t) {
      e.exports = t.p + 'static/img/ios-component-250x.8f223742.gif';
    },
    './assets/windows-250x.png': function(e, a, t) {
      e.exports = t.p + 'static/img/windows-250x.2042e18b.png';
    },
    './documentation/Method.mdx': function(e, a, t) {
      'use strict';
      t.r(a);
      var n = t('./node_modules/react/index.js'),
        r = t.n(n),
        m = t('./node_modules/@mdx-js/tag/dist/index.js');
      function o(e, a) {
        if (null == e) return {};
        var t,
          n,
          r = (function(e, a) {
            if (null == e) return {};
            var t,
              n,
              r = {},
              m = Object.keys(e);
            for (n = 0; n < m.length; n++) (t = m[n]), a.indexOf(t) >= 0 || (r[t] = e[t]);
            return r;
          })(e, a);
        if (Object.getOwnPropertySymbols) {
          var m = Object.getOwnPropertySymbols(e);
          for (n = 0; n < m.length; n++)
            (t = m[n]),
              a.indexOf(t) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, t) && (r[t] = e[t]));
        }
        return r;
      }
      a.default = function(e) {
        var a = e.components;
        o(e, ['components']);
        return r.a.createElement(
          m.MDXTag,
          { name: 'wrapper', components: a },
          r.a.createElement(
            m.MDXTag,
            { name: 'h1', components: a, props: { id: 'methods' } },
            'Methods',
          ),
          r.a.createElement(
            m.MDXTag,
            { name: 'h2', components: a, props: { id: 'open-simple-share-dialog' } },
            'Open Simple share dialog',
          ),
          r.a.createElement(
            m.MDXTag,
            { name: 'p', components: a },
            'Returns a promise that fulfills or rejects as soon as user successfully open the share action sheet or cancelled/failed to do so. As a result you might need to further handle the rejection while necessary. e.g.',
          ),
          r.a.createElement(
            m.MDXTag,
            { name: 'pre', components: a },
            r.a.createElement(
              m.MDXTag,
              {
                name: 'code',
                components: a,
                parentName: 'pre',
                props: { className: 'language-javascript' },
              },
              'Share.open(options)\n  .then(res => {\n    console.log(res);\n  })\n  .catch(err => {\n    err && console.log(err);\n  });\n',
            ),
          ),
          r.a.createElement(
            m.MDXTag,
            { name: 'h2', components: a, props: { id: 'supported-options' } },
            'Supported options:',
          ),
          r.a.createElement(
            m.MDXTag,
            { name: 'table', components: a },
            r.a.createElement(
              m.MDXTag,
              { name: 'thead', components: a, parentName: 'table' },
              r.a.createElement(
                m.MDXTag,
                { name: 'tr', components: a, parentName: 'thead' },
                r.a.createElement(
                  m.MDXTag,
                  { name: 'th', components: a, parentName: 'tr', props: { align: 'left' } },
                  'Name',
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'th', components: a, parentName: 'tr', props: { align: 'center' } },
                  'Type',
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'th', components: a, parentName: 'tr', props: { align: 'left' } },
                  'Description',
                ),
              ),
            ),
            r.a.createElement(
              m.MDXTag,
              { name: 'tbody', components: a, parentName: 'table' },
              r.a.createElement(
                m.MDXTag,
                { name: 'tr', components: a, parentName: 'tbody' },
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'left' } },
                  'url',
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'center' } },
                  'string',
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'left' } },
                  'URL you want to share (you can share a base64 file url only in iOS & Android )',
                ),
              ),
              r.a.createElement(
                m.MDXTag,
                { name: 'tr', components: a, parentName: 'tbody' },
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'left' } },
                  'urls',
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'center' } },
                  'Array',
                  '[string]',
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'left' } },
                  "URL's you want to share, Only for iOS and Android (you can share a base64 file url only in iOS & Android )",
                ),
              ),
              r.a.createElement(
                m.MDXTag,
                { name: 'tr', components: a, parentName: 'tbody' },
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'left' } },
                  'type',
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'center' } },
                  'string',
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'left' } },
                  'File mime type (optional)',
                ),
              ),
              r.a.createElement(
                m.MDXTag,
                { name: 'tr', components: a, parentName: 'tbody' },
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'left' } },
                  'message',
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'center' } },
                  'string',
                ),
                r.a.createElement(m.MDXTag, {
                  name: 'td',
                  components: a,
                  parentName: 'tr',
                  props: { align: 'left' },
                }),
              ),
              r.a.createElement(
                m.MDXTag,
                { name: 'tr', components: a, parentName: 'tbody' },
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'left' } },
                  'title',
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'center' } },
                  'string',
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'left' } },
                  '(optional)',
                ),
              ),
              r.a.createElement(
                m.MDXTag,
                { name: 'tr', components: a, parentName: 'tbody' },
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'left' } },
                  'subject',
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'center' } },
                  'string',
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'left' } },
                  '(optional)',
                ),
              ),
              r.a.createElement(
                m.MDXTag,
                { name: 'tr', components: a, parentName: 'tbody' },
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'left' } },
                  'excludedActivityTypes',
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'center' } },
                  'string',
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'left' } },
                  '(optional)',
                ),
              ),
              r.a.createElement(
                m.MDXTag,
                { name: 'tr', components: a, parentName: 'tbody' },
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'left' } },
                  'failOnCancel',
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'center' } },
                  'boolean',
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'left' } },
                  '(defaults to true) On iOS, specifies whether promise should reject if user cancels share dialog (optional)',
                ),
              ),
              r.a.createElement(
                m.MDXTag,
                { name: 'tr', components: a, parentName: 'tbody' },
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'left' } },
                  'showAppsToView',
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'center' } },
                  'boolean',
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'left' } },
                  '(optional) only android',
                ),
              ),
            ),
          ),
          r.a.createElement(
            m.MDXTag,
            { name: 'h2', components: a, props: { id: 'sharesingle-options-in-ios--android' } },
            'shareSingle options (in iOS & Android)',
          ),
          r.a.createElement(
            m.MDXTag,
            { name: 'p', components: a },
            'Open share dialog with specific application',
          ),
          r.a.createElement(
            m.MDXTag,
            { name: 'p', components: a },
            r.a.createElement(
              m.MDXTag,
              { name: 'em', components: a, parentName: 'p' },
              'This returns a promise too.',
            ),
          ),
          r.a.createElement(m.MDXTag, { name: 'p', components: a }, 'Supported options:'),
          r.a.createElement(
            m.MDXTag,
            { name: 'table', components: a },
            r.a.createElement(
              m.MDXTag,
              { name: 'thead', components: a, parentName: 'table' },
              r.a.createElement(
                m.MDXTag,
                { name: 'tr', components: a, parentName: 'thead' },
                r.a.createElement(
                  m.MDXTag,
                  { name: 'th', components: a, parentName: 'tr', props: { align: 'left' } },
                  'Name',
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'th', components: a, parentName: 'tr', props: { align: 'center' } },
                  'Type',
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'th', components: a, parentName: 'tr', props: { align: 'left' } },
                  'Description',
                ),
              ),
            ),
            r.a.createElement(
              m.MDXTag,
              { name: 'tbody', components: a, parentName: 'table' },
              r.a.createElement(
                m.MDXTag,
                { name: 'tr', components: a, parentName: 'tbody' },
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'left' } },
                  'url',
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'center' } },
                  'string',
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'left' } },
                  'URL you want to share',
                ),
              ),
              r.a.createElement(
                m.MDXTag,
                { name: 'tr', components: a, parentName: 'tbody' },
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'left' } },
                  'type',
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'center' } },
                  'string',
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'left' } },
                  'File mime type (optional)',
                ),
              ),
              r.a.createElement(
                m.MDXTag,
                { name: 'tr', components: a, parentName: 'tbody' },
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'left' } },
                  'message',
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'center' } },
                  'string',
                ),
                r.a.createElement(m.MDXTag, {
                  name: 'td',
                  components: a,
                  parentName: 'tr',
                  props: { align: 'left' },
                }),
              ),
              r.a.createElement(
                m.MDXTag,
                { name: 'tr', components: a, parentName: 'tbody' },
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'left' } },
                  'title',
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'center' } },
                  'string',
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'left' } },
                  '(optional)',
                ),
              ),
              r.a.createElement(
                m.MDXTag,
                { name: 'tr', components: a, parentName: 'tbody' },
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'left' } },
                  'subject',
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'center' } },
                  'string',
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'left' } },
                  '(optional)',
                ),
              ),
              r.a.createElement(
                m.MDXTag,
                { name: 'tr', components: a, parentName: 'tbody' },
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'left' } },
                  'social',
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'center' } },
                  'string',
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'left' } },
                  'supported social apps: ',
                  r.a.createElement(
                    m.MDXTag,
                    {
                      name: 'a',
                      components: a,
                      parentName: 'td',
                      props: { href: '#static-values-for-social' },
                    },
                    'List',
                  ),
                ),
              ),
            ),
          ),
          r.a.createElement(
            m.MDXTag,
            { name: 'p', components: a },
            r.a.createElement(
              m.MDXTag,
              { name: 'strong', components: a, parentName: 'p' },
              r.a.createElement(
                m.MDXTag,
                { name: 'em', components: a, parentName: 'strong' },
                'NOTE: If both ',
                r.a.createElement(
                  m.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'em' },
                  'message',
                ),
                ' and ',
                r.a.createElement(
                  m.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'em' },
                  'url',
                ),
                ' are provided ',
                r.a.createElement(
                  m.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'em' },
                  'url',
                ),
                ' will be concatenated to the end of ',
                r.a.createElement(
                  m.MDXTag,
                  { name: 'inlineCode', components: a, parentName: 'em' },
                  'message',
                ),
                ' to form the body of the message. If only one is provided it will be used',
              ),
            ),
          ),
          r.a.createElement(
            m.MDXTag,
            { name: 'h2', components: a, props: { id: 'static-values-for-social' } },
            'Static Values for social',
          ),
          r.a.createElement(
            m.MDXTag,
            { name: 'p', components: a },
            'These can be assessed using Share.Social property',
            r.a.createElement(m.MDXTag, { name: 'br', components: a, parentName: 'p' }),
            'For eg.',
          ),
          r.a.createElement(
            m.MDXTag,
            { name: 'pre', components: a },
            r.a.createElement(
              m.MDXTag,
              {
                name: 'code',
                components: a,
                parentName: 'pre',
                props: { className: 'language-javascript' },
              },
              'import Share from "react-native-share";\n\nconst shareOptions = {\n  title: "Share via",\n  url: "some share url",\n  social: Share.Social.WHATSAPP\n};\nShare.shareSingle(shareOptions);\n',
            ),
          ),
          r.a.createElement(
            m.MDXTag,
            { name: 'table', components: a },
            r.a.createElement(
              m.MDXTag,
              { name: 'thead', components: a, parentName: 'table' },
              r.a.createElement(
                m.MDXTag,
                { name: 'tr', components: a, parentName: 'thead' },
                r.a.createElement(
                  m.MDXTag,
                  { name: 'th', components: a, parentName: 'tr', props: { align: 'left' } },
                  'Name',
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'th', components: a, parentName: 'tr', props: { align: 'center' } },
                  'Android',
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'th', components: a, parentName: 'tr', props: { align: 'left' } },
                  'iOS',
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'th', components: a, parentName: 'tr', props: { align: 'left' } },
                  'Windows',
                ),
              ),
            ),
            r.a.createElement(
              m.MDXTag,
              { name: 'tbody', components: a, parentName: 'table' },
              r.a.createElement(
                m.MDXTag,
                { name: 'tr', components: a, parentName: 'tbody' },
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'left' } },
                  r.a.createElement(
                    m.MDXTag,
                    { name: 'strong', components: a, parentName: 'td' },
                    'FACEBOOK',
                  ),
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'center' } },
                  'yes',
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'left' } },
                  'yes',
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'left' } },
                  'no',
                ),
              ),
              r.a.createElement(
                m.MDXTag,
                { name: 'tr', components: a, parentName: 'tbody' },
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'left' } },
                  r.a.createElement(
                    m.MDXTag,
                    { name: 'strong', components: a, parentName: 'td' },
                    'PAGESMANAGER',
                  ),
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'center' } },
                  'yes',
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'left' } },
                  'no',
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'left' } },
                  'no',
                ),
              ),
              r.a.createElement(
                m.MDXTag,
                { name: 'tr', components: a, parentName: 'tbody' },
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'left' } },
                  r.a.createElement(
                    m.MDXTag,
                    { name: 'strong', components: a, parentName: 'td' },
                    'WHATSAPP',
                  ),
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'center' } },
                  'yes',
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'left' } },
                  'yes',
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'left' } },
                  'no',
                ),
              ),
              r.a.createElement(
                m.MDXTag,
                { name: 'tr', components: a, parentName: 'tbody' },
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'left' } },
                  r.a.createElement(
                    m.MDXTag,
                    { name: 'strong', components: a, parentName: 'td' },
                    'INSTAGRAM',
                  ),
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'center' } },
                  'yes',
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'left' } },
                  'yes',
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'left' } },
                  'no',
                ),
              ),
              r.a.createElement(
                m.MDXTag,
                { name: 'tr', components: a, parentName: 'tbody' },
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'left' } },
                  r.a.createElement(
                    m.MDXTag,
                    { name: 'strong', components: a, parentName: 'td' },
                    'GOOGLEPLUS',
                  ),
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'center' } },
                  'yes',
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'left' } },
                  'yes',
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'left' } },
                  'no',
                ),
              ),
              r.a.createElement(
                m.MDXTag,
                { name: 'tr', components: a, parentName: 'tbody' },
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'left' } },
                  r.a.createElement(
                    m.MDXTag,
                    { name: 'strong', components: a, parentName: 'td' },
                    'EMAIL',
                  ),
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'center' } },
                  'yes',
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'left' } },
                  'yes',
                ),
                r.a.createElement(
                  m.MDXTag,
                  { name: 'td', components: a, parentName: 'tr', props: { align: 'left' } },
                  'no',
                ),
              ),
            ),
          ),
          r.a.createElement(
            m.MDXTag,
            { name: 'h2', components: a, props: { id: 'how-it-looks' } },
            'how it looks:',
          ),
          r.a.createElement(
            'table',
            null,
            r.a.createElement(
              'thead',
              null,
              r.a.createElement(
                'tr',
                null,
                r.a.createElement('th', null),
                r.a.createElement('th', null, 'Android'),
                r.a.createElement('th', null, 'IOS'),
                r.a.createElement('th', null, 'Windows'),
              ),
            ),
            r.a.createElement(
              'tbody',
              null,
              r.a.createElement(
                'tr',
                null,
                r.a.createElement('td', null, 'Simple Share'),
                r.a.createElement(
                  'td',
                  null,
                  r.a.createElement('img', { src: t('./assets/android-250x.png') }),
                  ' ',
                ),
                r.a.createElement(
                  'td',
                  null,
                  r.a.createElement('img', { src: t('./assets/ios-250x.png') }),
                  ' ',
                ),
                r.a.createElement(
                  'td',
                  null,
                  r.a.createElement('img', { src: t('./assets/windows-250x.png') }),
                  ' ',
                ),
              ),
              r.a.createElement(
                'tr',
                null,
                r.a.createElement('td', null, 'UI Component'),
                r.a.createElement(
                  'td',
                  null,
                  r.a.createElement('img', { src: t('./assets/android-component-250x.gif') }),
                  ' ',
                ),
                r.a.createElement(
                  'td',
                  null,
                  r.a.createElement('img', { src: t('./assets/ios-component-250x.gif') }),
                  ' ',
                ),
                r.a.createElement('td', null, 'TODO'),
              ),
            ),
          ),
        );
      };
    },
  },
]);
