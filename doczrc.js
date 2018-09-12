import pkg from './package.json';

const libName = pkg.name;

export default {
  src: './documentation',
  dest: './docs',
  title: libName,
  hashRouter: true,
  base: `/${libName}/`,
  ordering: 'ascending',
  description: pkg.description,
};
