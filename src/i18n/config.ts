import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enTranslations from "./locales/en.json";
import esTranslations from "./locales/es.json";

const resources = {
  en: {
    translation: enTranslations,
  },
  es: {
    translation: esTranslations,
  },
};

i18n
  .use(LanguageDetector) // Detecta el idioma del navegador
  .use(initReactI18next) // Pasa i18n a react-i18next
  .init({
    resources,
    fallbackLng: "en", // Idioma por defecto: inglés
    lng: "en", // Forzar inglés como idioma inicial
    debug: false,

    interpolation: {
      escapeValue: false, // React ya hace escape de valores
    },

    detection: {
      // Orden de detección de idioma
      order: ["localStorage", "navigator"],
      // Guardar el idioma seleccionado en localStorage
      caches: ["localStorage"],
      lookupLocalStorage: "i18nextLng",
    },
  });

export default i18n;
