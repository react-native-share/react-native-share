module.exports = {
  title: 'React Native Share',
  tagline: 'Share simple data between applications',
  url: 'https://react-native-share.github.io',
  baseUrl: '/react-native-share/',
  favicon: 'img/react.svg',
  organizationName: 'react-native-share',
  projectName: 'react-native-share',
  trailingSlash: false,
  themeConfig: {
    navbar: {
      title: 'React Native Share',
      logo: {
        alt: 'React Native Share',
        src: 'img/react.svg',
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
          href: 'https://github.com/react-native-share/react-native-share',
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
              label: 'Share.shareSingle',
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
              href: 'https://github.com/react-native-share/react-native-share/issues',
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
          editUrl:
            'https://github.com/react-native-share/react-native-share/edit/main/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
