import typescript from '@rollup/plugin-typescript';

export default [
  // ES Module build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/mini-store.esm.js',
      format: 'es',
      sourcemap: true
    },
    plugins: [
      typescript({
        declaration: true,
        declarationDir: 'dist',
        rootDir: 'src'
      })
    ]
  },
  // CommonJS build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/mini-store.js',
      format: 'cjs',
      sourcemap: true
    },
    plugins: [
      typescript()
    ]
  },
  // UMD build for browsers (namespaced)
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/mini-store.umd.js',
      format: 'umd',
      name: 'MiniStore',
      sourcemap: true
    },
    plugins: [
      typescript()
    ]
  },
  // Minified UMD build for browsers (namespaced)
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/mini-store.umd.min.js',
      format: 'umd',
      name: 'MiniStore',
      sourcemap: true,
      compact: true
    },
    plugins: [
      typescript()
    ]
  },
  // Browser build that injects directly into window
  {
    input: 'src/browser-inject.ts',
    output: {
      file: 'dist/mini-store.browser.js',
      format: 'iife',
      sourcemap: true
    },
    plugins: [
      typescript()
    ]
  },
  // Minified browser build that injects directly into window
  {
    input: 'src/browser-inject.ts',
    output: {
      file: 'dist/mini-store.browser.min.js',
      format: 'iife',
      sourcemap: true,
      compact: true
    },
    plugins: [
      typescript()
    ]
  }
];
