import { vi } from "./vi"
import { en } from "./en"

export type Language = "vi" | "en"
export type TranslationKey = keyof typeof vi

export const translations: Record<Language, Record<TranslationKey, string>> = {
  vi,
  en,
}

export const getTranslation = (language: Language, key: TranslationKey): string => {
  return translations[language][key] || key
}
