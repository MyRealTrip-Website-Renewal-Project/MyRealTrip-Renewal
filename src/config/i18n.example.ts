import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: { translation: { hello: 'Hello' } },
  ko: { translation: { hello: '안녕하세요' } },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'ko',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n; 