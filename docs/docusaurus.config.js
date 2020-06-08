module.exports = {
  title: 'React Native Share',
  tagline: 'Share simple data between applications',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  favicon: 'img/community.png',
  organizationName: 'react-native-community', // Usually your GitHub org/user name.
  projectName: 'react-native-share',
  themeConfig: {
    navbar: {
      title: 'React Native Share',
      logo: {
        alt: 'react-native-community logo',
        src: 'img/community.png',
      },
      links: [
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
              label: 'Style Guide',
              to: 'docs/',
            },
            {
              label: 'Second Doc',
              to: 'docs/doc2/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
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
      copyright: `Copyright © ${new Date().getFullYear()} react-native-community. Built with Docusaurus 🦖.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: 'doc1',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
