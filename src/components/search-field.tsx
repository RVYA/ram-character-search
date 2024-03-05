"use client"

import { ChangeEvent } from "react"

import { Dictionary } from "dictionaries"

import { RickAndMortyCharacter } from "models/rick-and-morty-character"
import styles from "styles/search-field.module.css"
import SearchDropdown from "./search-dropdown/search-dropdown"

interface SearchFieldProps {
  dictionary: Dictionary
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

const kMinLengthSearch = 3
const kRegexPatternSearch = /^[A-Za-z\-\"\. ]{3,}$/

export default function SearchField({
  dictionary,
  onChange,
}: SearchFieldProps) {
  const leading = dictionary.searchField.leading
  const placeholder = dictionary.searchField.placeholder

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

  return (
    <label className={styles.searchFieldLabel}>
      {leading}
      <div className={styles.searchContainer}>
        <input
          className={styles.searchField}
          type="text"
          onChange={onChange}
          placeholder={placeholder}
          minLength={kMinLengthSearch}
          pattern={kRegexPatternSearch.source}
        />
        <SearchDropdown
          dictionary={dictionary}
          results={chars}
          searchText="Ric"
        />
      </div>
    </label>
  )
}
