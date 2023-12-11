import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import enJson from '../src/app/locale/en.json';

// Initialize i18next
i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: enJson
        }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false
    }
});

export default i18n;
