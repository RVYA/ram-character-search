"use client"

import { createContext, ReactNode } from "react"

import { ComponentDictionary, ConstantDictionary } from "dictionaries"

export const DictionaryContext = createContext<
  [ComponentDictionary, ConstantDictionary] | undefined
>(undefined)

interface DictionaryContextProviderProps {
  children: ReactNode
  componentDictionary: ComponentDictionary
  constantDictionary: ConstantDictionary
}

export default function DictionaryContextProvider({
  children,
  componentDictionary,
  constantDictionary,
}: DictionaryContextProviderProps) {
  return (
    <DictionaryContext.Provider
      value={[componentDictionary, constantDictionary]}
    >
      {children}
    </DictionaryContext.Provider>
  )
}
