import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './en';
import { nl } from './nl';

i18n.use(initReactI18next).init({
  resources: {
    nl,
    en,
  },
  fallbackLng: 'nl',
  lng: 'nl',
  ns: ['translations'],
  defaultNS: 'translations',
  keySeparator: '.',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
