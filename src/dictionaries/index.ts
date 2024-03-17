//import "server-only"

import { i18n, type Locale } from "src/i18n-config"

export enum DictionaryType {
  Component,
  Constant,
}

export type ComponentDictionary = typeof import("./components/en.json")

const componentDictionaries: {
  [key in Locale]: () => Promise<ComponentDictionary>
} = {
  en: () => import("./components/en.json").then((module) => module.default),
}

export type ConstantDictionary = typeof import("./constants/en.json")

const constantDictionaries: {
  [key in Locale]: () => Promise<ConstantDictionary>
} = {
  en: () => import("./constants/en.json").then((module) => module.default),
}

export function getDefaultDictionaryOf(type: DictionaryType) {
  switch (type) {
    case DictionaryType.Component:
      return componentDictionaries[i18n.defaultLocale]
    case DictionaryType.Constant:
      return constantDictionaries[i18n.defaultLocale]
  }
}

export async function getDictionary(
  locale: Locale,
  type: DictionaryType = DictionaryType.Component,
) {
  switch (type) {
    case DictionaryType.Component:
      return componentDictionaries[locale]()
    case DictionaryType.Constant:
      return constantDictionaries[locale]()
  }
}
