import parseProperties from "@ui5/webcomponents-base/dist/PropertiesFileFormat.js";
import { registerI18nLoader, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { setFetchDefaultLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";

// fetch the default language (ensures to load app bundles)
setFetchDefaultLanguage(true);

// define the supported languages of our app
const supportedLanguages = {
    "en": {
        name: "English"
    },
    "de": {
        name: "Deutsch"
    },
    "fr": {
        name: "Français"
    },
    "bg": {
        name: "български"
    }
};

// register the messagebundles
Object.keys(supportedLanguages).forEach(locale => {
	registerI18nLoader("todoApp", locale, async (localeId) => {
		const props = await (await fetch(new URL(`./messagebundle_${localeId}.properties`, import.meta.url))).text();
		return parseProperties(props);
	});
});

const getAppI18nBundle = async () => {
    return getI18nBundle("todoApp");
}

export {
    supportedLanguages,
    getAppI18nBundle
};