const path = require('path');
const intlPath = path.join(__dirname, 'i18n');

module.exports = {
    plugins: [
        {
            resolve: 'gatsby-plugin-intl',
            options: {
              path: intlPath
            },
        },
    ]
}