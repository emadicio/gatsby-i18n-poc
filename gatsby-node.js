const dotenv = require('dotenv');
const fs = require('fs');
const flatten = require('flat')
const axios = require('axios');
const env = process.env.GATSBY_ENV || process.env.NODE_ENV || 'development';

dotenv.config({
    path: `.env.${env}`,
}) 

/*
* Pulls updated locales
*/
exports.onPreBootstrap = async () => {
    console.log('[SERVER] Updating locales...');

    const res = await axios.get('http://18.184.95.18/i18n/ef-stories-2019');
    const locales = res.data;
    const languages = Object.keys(locales);
    
    fs.writeFileSync(`./src/intl/languages.json`, JSON.stringify(languages));
    for (const lang of languages){
        fs.writeFileSync(`./src/intl/${lang}.json`, JSON.stringify(flatten(locales[lang])));
    }

    console.log('[SERVER] Locales updated.');
}