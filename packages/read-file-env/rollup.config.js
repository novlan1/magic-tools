import babel from 'rollup-plugin-babel';
export default {
  input: 'index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
  },
  plugins: [
    babel(),
  ],
};
