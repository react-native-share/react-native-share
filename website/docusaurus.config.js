module.exports = {
  title: 'React Native Share',
  tagline: 'Share simple data between applications',
  url: 'https://react-native-community.github.io',
  baseUrl: 'react-native-share',
  favicon: 'img/community.png',
  organizationName: 'react-native-share',
  projectName: 'react-native-share',
  trailingSlash: false,
  scripts: [
    'https://buttons.github.io/buttons.js',
    'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js',
    '/js/code-block-buttons.js',
  ],
  stylesheets: ['/css/code-block-buttons.css'],
  themeConfig: {
    navbar: {
      title: 'React Native Share',
      logo: {
        alt: 'react-native-community logo',
        src: 'img/community.png',
      },
      items: [
        {
          to: 'docs/install',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          to: 'docs/contributing',
          activeBasePath: 'contributing',
          label: 'Contributing',
          position: 'left',
        },
        {
          href: 'https://github.com/react-native-community/react-native-share',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Installing',
              to: 'docs/install/',
            },
            {
              label: 'Share.open',
              to: 'docs/share-open/',
            },
            {
              label: 'Share.single',
              to: 'docs/share-single/',
            },
            {
              label: 'Share.isPackageInstalled',
              to: 'docs/share-is-package-installed/',
            },
            {
              label: 'UI Components',
              to: 'docs/ui-components/',
            },
            {
              label: 'Testing',
              to: 'docs/testing/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Contributing Guide',
              to: 'docs/contributing',
            },
            {
              label: 'react-native-community',
              href: 'https://github.com/react-native-community',
            },
            {
              label: 'Issues',
              href: 'https://github.com/react-native-community/react-native-share/issues',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/ReactNativeComm',
            },
          ],
        },
      ],
      copyright: 'made with ❤️ by react-native-community',
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/react-native-community/react-native-share/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};

