import { ReactNode } from "react"

import DictionaryContextProvider from "./dictionary-context-provider"

import {
  ComponentDictionary,
  ConstantDictionary,
  DictionaryType,
  getDictionary,
} from "dictionaries"

import { Locale } from "src/i18n-config"

interface ContextWrapperProps {
  children: ReactNode
  lang: Locale
}

export default async function DictionaryContextWrapper({
  children,
  lang,
}: ContextWrapperProps) {
  const compDict = (await getDictionary(
    lang,
    DictionaryType.Component,
  )) as ComponentDictionary
  const constDict = (await getDictionary(
    lang,
    DictionaryType.Constant,
  )) as ConstantDictionary

  return (
    <DictionaryContextProvider
      componentDictionary={compDict}
      constantDictionary={constDict}
    >
      {children}
    </DictionaryContextProvider>
  )
}
