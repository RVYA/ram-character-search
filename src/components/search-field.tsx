"use client"

import {
  ChangeEvent,
  FocusEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"

import SearchDropdown, { SearchResult } from "./search-dropdown/search-dropdown"

import { DictionaryContext } from "contexts/dictionary-context-provider"

import { RickAndMortyCharacter } from "models/rick-and-morty-character"

import styles from "styles/search-field.module.css"

interface SearchFieldProps {
  queryResults?: RickAndMortyCharacter[]
  onCharSelect: (selectedCharId: number) => void
  onCharDiscard: (discardedCharId: number) => void
  onQueryChange: (query: string) => void
  selectedCharacterIds?: number[]
}

export const kMinLengthSearch = 3
const kRegexPatternSearch = /^[A-Za-z\-". ]{3,}$/
const kRegexInputSanitization = /[^A-Za-z\-". ]/g

const kDelayQueryDebounce = 350 //milliseconds

// TODO: Rework spacing.
// FIXME: The `onfocus` handler on `input` may be redundant.
export default function SearchField({
  onCharDiscard,
  onCharSelect,
  onQueryChange,
  queryResults,
  selectedCharacterIds,
}: SearchFieldProps) {
  // #region Controlling dropdown visibility
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  function handleFocus(event: FocusEvent<HTMLInputElement, Element>) {
    setIsDropdownVisible(true)
  }

  useEffect(() => {
    function handleMouseDown(event: MouseEvent) {
      if (!isDropdownVisible) return
      if (inputRef.current === null || dropdownRef.current === null) return

      const isClickOnInput = event.target === inputRef.current
      const isClickOnInputChildren = inputRef.current.contains(
        event.target as Node,
      )

      if (isClickOnInput || isClickOnInputChildren) return

      const isClickOnDropdown = event.target === dropdownRef.current
      const isClickOnDropdownChildren = dropdownRef.current.contains(
        event.target as Node,
      )

      // also need to check if hit is on input
      if (!(isClickOnDropdown || isClickOnDropdownChildren)) {
        setIsDropdownVisible(false)
      }
    }

    window.addEventListener("mousedown", handleMouseDown)
    return () => window.removeEventListener("mousedown", handleMouseDown)
  }, [isDropdownVisible])
  // #endregion

  const [searchText, setSearchText] = useState<string>()
  const debounceTimer = useRef<NodeJS.Timeout>()

  // FIXME: With current implementation, this may cause multiple queries to be
  // sent.
  const debounce = useCallback((func: () => void) => {
    if (debounceTimer.current !== undefined) {
      clearTimeout(debounceTimer.current)
    }
    debounceTimer.current = setTimeout(func, kDelayQueryDebounce)
  }, [])

  const getSearchResults = useCallback((): SearchResult[] | undefined => {
    if (queryResults === undefined) {
      return undefined
    } else if (queryResults.length <= 0) {
      return []
    }

    return queryResults.map<SearchResult>((char) => ({
      character: char,
      isSelected: selectedCharacterIds?.includes(char.id) ?? false,
    }))
  }, [queryResults, selectedCharacterIds])

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value.replace(kRegexInputSanitization, "")

    debounce(() => {
      if (query === searchText) return

      onQueryChange(query)
      setSearchText(query)
    })
  }

  const [compDict, constDict] = useContext(DictionaryContext)!

  const leading = compDict.searchField.leading
  const placeholder = compDict.searchField.placeholder

  return (
    <label className={styles.searchFieldLabel}>
      {leading}
      <div className={styles.searchContainer}>
        <input
          ref={inputRef}
          className={styles.searchField}
          type="text"
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder={placeholder}
          minLength={kMinLengthSearch}
          pattern={kRegexPatternSearch.source}
        />
        <SearchDropdown
          componentDictionary={compDict}
          constantDictionary={constDict}
          isOpen={isDropdownVisible}
          ref={dropdownRef}
          results={getSearchResults()}
          onCharDiscard={onCharDiscard}
          onCharSelect={onCharSelect}
          searchText={searchText}
        />
      </div>
    </label>
  )
}
