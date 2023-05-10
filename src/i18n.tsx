import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false
  }
}

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: 'http://localhost:5173/assets/i18n/{{ns}}/{{lng}}.json',
    },
    // language by default
    fallbackLng: 'it',
    load: 'languageOnly',
    ns: ['footer', 'monitorTable', 'general', 'errorPage', 'monitorPage', 'detailsPage'],

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  })

export default i18n
