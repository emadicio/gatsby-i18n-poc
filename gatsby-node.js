const path = require('path');
const fs = require('fs').promises;
const axios = require('axios');
const intlPath = path.join(__dirname, 'i18n');

/*
* Pulls updated locales
*/
exports.onPreBootstrap = async () => {
  console.log('[SERVER] Updating locales...');
  
  try {
    const localesBaseUrl = 'http://18.184.95.18/i18n';
    const campaignCode = 'ef-stories-2019';
  
    const res = await axios.get(`${localesBaseUrl}/${campaignCode}`);
    const locales = res.data;
    const languages = Object.keys(locales);

    try {
      await fs.access(intlPath, fs.F_OK);
    } catch(e) {
      await fs.mkdir(intlPath);
    }
    
    await fs.writeFile(path.join(intlPath, 'languages.json'), JSON.stringify(languages, null, 2));
  
    for (const lang of languages){
      await fs.writeFile(path.join(intlPath, `${lang}.json`), JSON.stringify(locales[lang], null, 2));
    }
  } catch(e) {
    console.error(e);
    process.exit(1);
  }

  console.log('[SERVER] Locales updated.');
}