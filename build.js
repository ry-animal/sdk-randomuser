const esbuild = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals');


// base config for all builds
const baseConfig = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  sourcemap: true,
  platform: 'neutral',
  plugins: [nodeExternalsPlugin()],
};

// esm build
esbuild.build({
  ...baseConfig,
  outfile: 'dist/index.esm.js',
  format: 'esm',
}).catch(() => process.exit(1));

// commonjs build
esbuild.build({
  ...baseConfig,
  outfile: 'dist/index.cjs.js',
  format: 'cjs',
}).catch(() => process.exit(1));

// umd/iife build for browsers
esbuild.build({
  ...baseConfig,
  outfile: 'dist/index.umd.js',
  format: 'iife',
  globalName: 'RandomUserSDK',
}).catch(() => process.exit(1)); 