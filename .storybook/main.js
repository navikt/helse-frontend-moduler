module.exports = {
    stories: ['../stories/**/*.stories.(tsx|mdx)', '../packages/**/*.stories.(tsx|mdx)'],
    addons: [
        {
            name: '@storybook/addon-docs',
            options: {
                configureJSX: true,
                babelOptions: {}
            }
        },
        '@storybook/addon-storysource',
        '@storybook/addon-actions',
        '@storybook/addon-links',
        '@storybook/addon-knobs',
        '@storybook/addon-a11y',
        '@storybook/addon-essentials'
    ],
    webpackFinal: async config => {
        config.module.rules.push({
            test: /\.(ts|tsx)$/,
            use: ['awesome-typescript-loader', 'react-docgen-typescript-loader']
        });
        config.module.rules.push({
            test: /\.less$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: true
                    }
                },
                'less-loader'
            ]
        });
        config.resolve.extensions.push('.ts', '.tsx', '.d.ts');
        return config;
    }
};
