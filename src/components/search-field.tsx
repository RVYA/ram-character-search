"use client"

import {
  ChangeEvent,
  FocusEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"

import SearchDropdown, { SearchResult } from "./search-dropdown/search-dropdown"

import { RickAndMortyCharacter } from "models/rick-and-morty-character"

import { Dictionary } from "dictionaries"

import styles from "styles/search-field.module.css"

interface SearchFieldProps {
  characters: RickAndMortyCharacter[]
  dictionary: Dictionary
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onCharSelect?: (selectedCharId: string) => void
  onCharDiscard?: (discardedCharId: string) => void
  selectedCharacterIds?: number[]
}

export function getQueryMatchRegExp(searchText: string) {
  /** The query:
   * Query uses capturing group to also return matching parts in results.
   * However, it results in an empty string to be added to the beginning or end
   * of the array when the match is at the beginning or end or string.
   * */

  /** Flags:
   * `g`: global; searches for more multiple matches
   * `i`: case insensitive: ignores the case of the text (doesn't work for
   * non-US characters though; i.e, the Turkish letter `İ`, doesn't match for
   * `i` or `I`)
   */
  return new RegExp(`(${searchText})`, "gi")
}

const kMinLengthSearch = 3
const kRegexPatternSearch = /^[A-Za-z\-". ]{3,}$/

// TODO: Rework spacing.
// FIXME: The `onfocus` handler on `input` may be redundant.
export default function SearchField({
  characters,
  dictionary,
  onChange,
  onCharDiscard,
  onCharSelect,
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
  //#region Generating search results
  const getFilteredCharacters = useCallback(() => {
    if (searchText === undefined || searchText.length <= 0) {
      return characters
    }

    const queryRegex = getQueryMatchRegExp(searchText)
    const filteredChars = characters.filter((char) =>
      char.name.match(queryRegex),
    )
    return filteredChars
  }, [characters, searchText])

  const getSearchResults = useCallback(() => {
    const chars = getFilteredCharacters()
    if (chars.length <= 0) return undefined

    return chars.map<SearchResult>((char) => ({
      character: char,
      isSelected: selectedCharacterIds?.includes(char.id) ?? false,
    }))
  }, [getFilteredCharacters, selectedCharacterIds])

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value)

    if (onChange !== undefined) onChange(event)
  }
  // #endregion

  const leading = dictionary.searchField.leading
  const placeholder = dictionary.searchField.placeholder

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
          dictionary={dictionary}
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
