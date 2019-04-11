const axios = require('axios');
const flatten = require("flat");

require('./src/styles/global.css');

exports.onClientEntry = async () => {
    if (process.env.GATSBY_ENV !== 'production') {
        console.log('[CLIENT] Updating locales...');

        const res = await axios.get('http://18.184.95.18/i18n/ef-stories-2019');
        const locales = res.data;
        const languages = Object.keys(locales);

        window.___updatedLocales = {};
        for (const lang of languages){
            window.___updatedLocales[lang] = flatten(locales[lang]);
            window.___updatedLocales[lang]['hero.title'] = 'PROVA';
        }
        
        console.log('[CLIENT] Locales updated.');
    }
}