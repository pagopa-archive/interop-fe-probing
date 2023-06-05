import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import detailsPageIt from './static/locales/it/detailsPage.json'
import detailsPageEn from './static/locales/en/detailsPage.json'
import errorPageIt from './static/locales/it/errorPage.json'
import errorPageEn from './static/locales/en/errorPage.json'
import generalIt from './static/locales/it/general.json'
import generalEn from './static/locales/en/general.json'
import footerIt from './static/locales/it/footer.json'
import footerEn from './static/locales/en/footer.json'
import monitorPageIt from './static/locales/it/monitorPage.json'
import monitorPageEn from './static/locales/en/monitorPage.json'
import monitorTableIt from './static/locales/it/monitorTable.json'
import monitorTableEn from './static/locales/en/monitorTable.json'
import loginPageIt from './static/locales/it/loginPage.json'
import loginPageEn from './static/locales/en/loginPage.json'
import passwordRecoveryPageIt from './static/locales/it/passwordRecoveryPage.json'
import passwordRecoveryPageEn from './static/locales/en/passwordRecoveryPage.json'

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      it: {
        detailsPage: detailsPageIt,
        errorPage: errorPageIt,
        general: generalIt,
        footer: footerIt,
        monitorPage: monitorPageIt,
        monitorTable: monitorTableIt,
        loginPage: loginPageIt,
        passwordRecoveryPage: passwordRecoveryPageIt,
      },
      en: {
        detailsPage: detailsPageEn,
        errorPage: errorPageEn,
        general: generalEn,
        footer: footerEn,
        monitorPage: monitorPageEn,
        monitorTable: monitorTableEn,
        loginPage: loginPageEn,
        passwordRecoveryPage: passwordRecoveryPageEn,
      },
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
