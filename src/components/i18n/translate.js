import hu from './hu.json'
import en from './en.json'

const getStringByKey = (key, obj) => {
    let currentObj = obj;
    const keys = key.split('.');
    for (let i = 0; i < keys.length; i++) {
        currentObj = currentObj[keys[i]];
        if (!currentObj) {
            console.error(`Translation string with key ${key} does not exist`)
            return 'Unknown';
        }
    }
    return currentObj;
}

const getTranslationsByLanguage = (lang) => {
    if (lang === 'hu') return hu;
    return en;
}

export const getUserLanguage = () => {
    const language = window.navigator.userLanguage || window.navigator.language;
    return language.split('-')[0];
}

export const translate = (key, lang = null) => {
   const translations = getTranslationsByLanguage(lang ?? getUserLanguage());
   return getStringByKey(key, translations);
}
