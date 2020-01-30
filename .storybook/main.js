module.exports = {
  stories: ["../src/**/*.stories.tsx"],
  addons: ['@storybook/addon-actions', '@storybook/addon-links', '@storybook/addon-knobs'],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve("awesome-typescript-loader")
        },
        // Optional
        {
          loader: require.resolve("react-docgen-typescript-loader")
        }
      ]
    });
    config.module.rules.push({
      test: /\.(less)$/,
      use: [
          { loader: require.resolve("style-loader") },
          { loader: require.resolve("css-loader") },
          { loader: require.resolve("less-loader") }
      ]
    });
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  }
};
