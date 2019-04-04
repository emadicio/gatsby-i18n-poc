const languages = require('./src/intl/languages');

module.exports = {
    plugins: [
        {
            resolve: 'gatsby-plugin-intl',
            options: {
              path: `${__dirname}/src/intl`,
              defaultLanguage: 'we',
              // Supported languages are dynamic, based on the fetched locales
              languages
            },
        },
    ]
}