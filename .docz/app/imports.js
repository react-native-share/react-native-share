export const imports = {
  'Install.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "install" */ 'Install.mdx'),
  'Method.mdx': () => import(/* webpackPrefetch: true, webpackChunkName: "method" */ 'Method.mdx'),
  'Troubleshooting.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "troubleshooting" */ 'Troubleshooting.mdx'),
  'Usage.mdx': () => import(/* webpackPrefetch: true, webpackChunkName: "usage" */ 'Usage.mdx'),
  'Welcome.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "welcome" */ 'Welcome.mdx'),
};
