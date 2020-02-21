const path = require('path');
const baseConfig = require('../webpack.base');

module.exports = {
    ...baseConfig,
    output: {
        ...baseConfig.output,
        library: 'helse-frontend-varsel',
        path: path.resolve(__dirname, 'dist')
    }
};
