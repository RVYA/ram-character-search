//import "server-only"

import { i18n, type Locale } from "src/i18n-config"

const dictionaries = {
  en: () => import("./en.json").then((module) => module.default),
}

export type Dictionary = typeof import("./en.json")

export interface DictionaryProps {
  dictionary: Dictionary
}

export function getDefaultDictionary() {
  return dictionaries[i18n.defaultLocale]
}

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]?.() ?? getDefaultDictionary()
}
