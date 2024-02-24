"use client"

import { ChangeEvent } from "react"

import { Dictionary } from "dictionaries"

import styles from "styles/search-field.module.css"

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

  return (
    <label className={styles.searchFieldLabel}>
      {leading}
      <input
        className={styles.searchField}
        type="text"
        onChange={onChange}
        placeholder={placeholder}
        minLength={kMinLengthSearch}
        pattern={kRegexPatternSearch.source}
      />
    </label>
  )
}
