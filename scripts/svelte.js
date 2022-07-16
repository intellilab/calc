const svelte = require('rollup-plugin-svelte');
const autoPreprocess = require('svelte-preprocess');

function sveltePlugin({ isProd, generate = 'dom' }) {
  return svelte({
    emitCss: true,
    compilerOptions: {
      dev: !isProd,
      generate,
    },
    preprocess: autoPreprocess(),
  });
}

exports.sveltePlugin = sveltePlugin;
