import { ReactNode, forwardRef } from "react"

import SelectableCharPreview from "./selectable-char-preview"

import { RickAndMortyCharacter } from "models/rick-and-morty-character"

import { ComponentDictionary, ConstantDictionary } from "dictionaries"

import { kMinLengthSearch } from "components/search-field"
import styles from "styles/search-dropdown/search-dropdown.module.css"

export interface SearchResult {
  character: RickAndMortyCharacter
  isSelected: boolean
}

interface SearchDropdownProps {
  componentDictionary: ComponentDictionary
  constantDictionary: ConstantDictionary
  isOpen: boolean
  results?: SearchResult[]
  searchText?: string
  onCharSelect: (selectedCharId: number) => void
  onCharDiscard: (discardedCharId: number) => void
}

// FIXME: Position dropdown in the center horizontally.
// FIXME: Position of dropdown is not responsive.
// FIXME: Grid is not responsive to window size.
const SearchDropdown = forwardRef<HTMLDivElement, SearchDropdownProps>(
  function SearchDropdown(props, ref) {
    const dictDropdown = props.componentDictionary.searchDropdown

    const hasResults = props.results !== undefined
    const hasValidSearchText =
      props.searchText !== undefined &&
      props.searchText.length >= kMinLengthSearch

    let atrClass = styles.searchDropdown
    if (!hasResults || !hasValidSearchText) atrClass += ` ${styles.empty}`
    if (!props.isOpen) atrClass += ` ${styles.hidden}`

    // FIXME: This needs refactoring. What is returned when is not clear.
    let content: ReactNode
    if (!hasValidSearchText) {
      content = (
        <p className={styles.noMatchText}>
          {dictDropdown.textMinInputLengthWarning}
        </p>
      )
    } else if (!hasResults) {
      content = <p className={styles.noMatchText}>{dictDropdown.textNoMatch}</p>
    } else {
      content = props.results!.map((res, index) => {
        return (
          <SelectableCharPreview
            key={`char_prev_${res.character.id}_${index}`}
            componentDictionary={props.componentDictionary}
            constantDictionary={props.constantDictionary}
            id={res.character.id}
            status={res.character.status}
            episodeCount={res.character.episode.length}
            imageUrl={res.character.image}
            name={res.character.name}
            onSelect={props.onCharSelect}
            onDiscard={props.onCharDiscard}
            index={index}
            isSelected={res.isSelected}
            searchText={props.searchText}
          />
        )
      })
    }

    return (
      <div className={atrClass} ref={ref}>
        {content}
      </div>
    )
  },
)

export default SearchDropdown
