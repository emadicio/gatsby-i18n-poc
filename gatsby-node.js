const fs = require('fs');
const flatten = require('flat')
const axios = require('axios');

/*
* Pulls updated locales
*/
exports.onPreBootstrap = async () => {
    console.log('Updating locales...');

    const res = await axios.get('http://18.184.95.18/i18n/ef-stories-2019');
    const locales = res.data;
    const languages = Object.keys(locales);
    
    fs.writeFileSync(`./src/intl/languages.json`, JSON.stringify(languages));
    for (let lang of languages){
        fs.writeFileSync(`./src/intl/${lang}.json`, JSON.stringify(flatten(locales[lang])));
    }

    console.log('Locales updated.');
}