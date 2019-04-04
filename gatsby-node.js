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

        /*
        * react-intl breaks with custom locale keys such as "we" and "ch"
        * so we need to create the relative files in react-intl/locale-data
        * 
        * TODO: Find a better solution
        * note: react-intl.addLocaleData doesn't seem to create the necessary file
        */
        if (!fs.existsSync(`./node_modules/react-intl/locale-data/${lang}.js`)){
            const file = fs.readFileSync('./node_modules/react-intl/locale-data/agq.js', 'utf8');
            fs.writeFileSync(
                `./node_modules/react-intl/locale-data/${lang}.js`,
                file.replace(/agq/g, lang)
            )
        }
    }

    console.log('Locales updated.');
}