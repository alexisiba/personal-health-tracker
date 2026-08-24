import { getLocales } from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { translations } from "./locales";

export const t = i18n.t;

const deviceLanguage = getLocales()[0]?.languageCode ?? "en";

i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  lng: "en",
  resources: translations,
  react: {
    useSuspense: false,
  },
});

export default i18n;
