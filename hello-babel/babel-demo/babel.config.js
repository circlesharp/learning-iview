module.exports = function(api) {
  // Permacache the computed config and never call the function again.
  api.cache(true);

  const presets = [
    [
      '@babel/env',
      {
        targets: {
          'edge': '17',
          'firefox': '60',
          'chrome': '67',
          'safari': '11.1',
        },
      },
    ],
  ];

  const plugins = [
    ['@babel/plugin-proposal-decorators', {'legacy': true}],
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-class-properties',
  ];

  return { presets, plugins };
};
