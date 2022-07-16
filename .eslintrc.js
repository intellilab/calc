module.exports = {
  root: true,
  extends: [
    require.resolve('@gera2ld/plaid/eslint'),
    require.resolve('@gera2ld/plaid-common-ts/eslint'),
    require.resolve('@gera2ld/plaid-common-svelte/eslint'),
  ],
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
};
