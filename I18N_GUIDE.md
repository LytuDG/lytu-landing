# Internationalization (i18n) Guide

## Overview

This project uses `react-i18next` for internationalization. The application supports **English** (default) and **Spanish**.

## Features

- ✅ **Default Language**: English
- ✅ **Supported Languages**: English (en), Spanish (es)
- ✅ **Language Persistence**: Selected language is saved in localStorage
- ✅ **Browser Detection**: Automatically detects browser language
- ✅ **Language Selector**: UI component to switch languages

## File Structure

```
src/
├── i18n/
│   ├── config.ts           # i18n configuration
│   └── locales/
│       ├── en.json         # English translations
│       └── es.json         # Spanish translations
└── components/
    └── features/
        └── LanguageSelector.tsx  # Language selector component
```

## Usage

### 1. In Components

Import and use the `useTranslation` hook:

```typescript
import { useTranslation } from "react-i18next";

export default function MyComponent() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("nav.home")}</h1>
      <p>{t("hero.subtitle")}</p>
    </div>
  );
}
```

### 2. Language Selector

The `LanguageSelector` component is already integrated in the Navbar. It provides:

- Dropdown menu with available languages
- Flag icons for visual identification
- Hover effects and smooth transitions
- Active language indicator

### 3. Adding New Translations

To add new translation keys:

1. Open `src/i18n/locales/en.json`
2. Add your new key:

```json
{
  "mySection": {
    "title": "My Title",
    "description": "My Description"
  }
}
```

3. Add the same key to `src/i18n/locales/es.json`:

```json
{
  "mySection": {
    "title": "Mi Título",
    "description": "Mi Descripción"
  }
}
```

4. Use in your component:

```typescript
{
  t("mySection.title");
}
{
  t("mySection.description");
}
```

### 4. Adding New Languages

To add a new language (e.g., French):

1. Create `src/i18n/locales/fr.json` with all translations
2. Update `src/i18n/config.ts`:

```typescript
import frTranslations from "./locales/fr.json";

const resources = {
  en: { translation: enTranslations },
  es: { translation: esTranslations },
  fr: { translation: frTranslations }, // Add this
};
```

3. Update `src/components/features/LanguageSelector.tsx`:

```typescript
const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" }, // Add this
];
```

## Translation Keys Structure

Current translation structure:

```
- nav: Navigation items
- hero: Hero section
- about: About section
- services: Services section
- readySolutions: Ready solutions section
- portfolio: Portfolio section
- contact: Contact section
- footer: Footer section
- login: Login modal
- common: Common UI elements
```

## Changing Default Language

To change the default language from English to Spanish:

Edit `src/i18n/config.ts`:

```typescript
i18n.use(LanguageDetector).use(initReactI18next).init({
  resources,
  fallbackLng: "es", // Change this
  lng: "es", // Change this
  // ...
});
```

## Best Practices

1. **Organize by Section**: Group related translations together
2. **Use Descriptive Keys**: Make keys self-explanatory
3. **Keep Consistency**: Use the same structure across all language files
4. **Avoid Hardcoded Text**: Always use translation keys instead of hardcoded strings
5. **Test Both Languages**: Always test your changes in all supported languages

## Examples

### Simple Text

```typescript
<h1>{t("hero.title")}</h1>
```

### With Variables

```typescript
// In translation file:
{
  "welcome": "Welcome, {{name}}!"
}

// In component:
{t("welcome", { name: userName })}
```

### Pluralization

```typescript
// In translation file:
{
  "items": "{{count}} item",
  "items_plural": "{{count}} items"
}

// In component:
{t("items", { count: itemCount })}
```

## Troubleshooting

### Translations not showing

1. Check that the key exists in both language files
2. Verify the key path is correct
3. Ensure `useTranslation` hook is called in the component

### Language not persisting

1. Check browser localStorage for `i18nextLng` key
2. Clear localStorage and try again
3. Verify `LanguageDetector` is properly configured

### New language not appearing

1. Ensure the language file is imported in `config.ts`
2. Check that it's added to the `resources` object
3. Verify it's added to the `LanguageSelector` component
