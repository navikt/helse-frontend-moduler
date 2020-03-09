const path = require('path');
const baseConfig = require('../webpack.base');

module.exports = {
    ...baseConfig,
    output: {
        ...baseConfig.output,
        library: 'helse-frontend-hendelsesoversikt',
        path: path.resolve(__dirname, 'dist')
    }
};
