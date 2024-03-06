"use client"

import { ChangeEvent, FocusEvent, useState } from "react"

import SearchDropdown from "./search-dropdown/search-dropdown"

import { RickAndMortyCharacter } from "models/rick-and-morty-character"

import { Dictionary } from "dictionaries"

import styles from "styles/search-field.module.css"

interface SearchFieldProps {
  dictionary: Dictionary
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onCharSelect?: (selectedCharId: string) => void
  onCharDiscard?: (discardedCharId: string) => void
  selectedCharacterIds?: number[]
}

const kMinLengthSearch = 3
const kRegexPatternSearch = /^[A-Za-z\-\"\. ]{3,}$/

// TODO: Rework spacing.
export default function SearchField({
  dictionary,
  onChange,
  onCharDiscard,
  onCharSelect,
  selectedCharacterIds,
}: SearchFieldProps) {
  // #region Dropdown visibility management
  const [hasFocus, setHasFocus] = useState<boolean>(false)

  function handleFocus(event: FocusEvent<HTMLInputElement, Element>) {
    setHasFocus(true)
  }

  function handleBlur(event: FocusEvent<HTMLInputElement, Element>) {
    setHasFocus(false)
  }
  // #endregion

  const [searchText, setSearchText] = useState<string>()

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value)

    if (onChange !== undefined) onChange(event)
  }

  const leading = dictionary.searchField.leading
  const placeholder = dictionary.searchField.placeholder

  // #region Placeholder data | REMOVE
  const placeholderChar: RickAndMortyCharacter = {
    created: "PLACEHOLDER",
    episode: ["PLACEHOLDER"],
    gender: "PLACEHOLDER",
    id: -1,
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    location: { name: "PLACEHOLDER", url: "PLACEHOLDER" },
    name: "Rick Sanchez",
    origin: { name: "PLACEHOLDER", url: "PLACEHOLDER" },
    species: "PLACEHOLDER",
    status: "Alive",
    type: "PLACEHOLDER",
    url: "PLACEHOLDER",
  }
  const chars: RickAndMortyCharacter[] = [
    placeholderChar,
    placeholderChar,
    placeholderChar,
    placeholderChar,
    placeholderChar,
    placeholderChar,
    placeholderChar,
    placeholderChar,
    placeholderChar,
    placeholderChar,
    placeholderChar,
    placeholderChar,
    placeholderChar,
    placeholderChar,
    placeholderChar,
  ]
  // #endregion

  return (
    <label className={styles.searchFieldLabel}>
      {leading}
      <div className={styles.searchContainer}>
        <input
          className={styles.searchField}
          type="text"
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          minLength={kMinLengthSearch}
          pattern={kRegexPatternSearch.source}
        />
        <SearchDropdown
          dictionary={dictionary}
          isOpen={hasFocus}
          characters={chars}
          onCharDiscard={onCharDiscard}
          onCharSelect={onCharSelect}
          searchText={searchText}
          selectedCharacterIds={selectedCharacterIds}
        />
      </div>
    </label>
  )
}
