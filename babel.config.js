module.exports = function(api) {
  api.cache(true);
  return {
    env: {
      production: {
        plugins: ["transform-remove-console"]
      }
    },
    presets: ['babel-preset-expo', "@babel/preset-typescript"],
    plugins: [
      'react-native-reanimated/plugin',
    ]
  };
};
