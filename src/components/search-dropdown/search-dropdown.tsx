import { ReactNode, forwardRef } from "react"

import SelectableCharPreview from "./selectable-char-preview"

import { RickAndMortyCharacter } from "models/rick-and-morty-character"

import { Dictionary } from "dictionaries"

import styles from "styles/search-dropdown/search-dropdown.module.css"

export interface SearchResult {
  character: RickAndMortyCharacter
  isSelected: boolean
}

interface SearchDropdownProps {
  dictionary: Dictionary
  isOpen: boolean
  results?: SearchResult[]
  searchText?: string
  onCharSelect?: (selectedCharId: string) => void
  onCharDiscard?: (discardedCharId: string) => void
}

// FIXME: Position dropdown in the center horizontally.
// FIXME: Position of dropdown is not responsive.
// FIXME: Grid is not responsive to window size.
const SearchDropdown = forwardRef<HTMLDivElement, SearchDropdownProps>(
  function SearchDropdown(props, ref) {
    let atrClass = styles.searchDropdown
    if (props.results === undefined) atrClass += ` ${styles.empty}`
    if (!props.isOpen) atrClass += ` ${styles.hidden}`

    let content: ReactNode
    if (props.results === undefined) {
      content = <p className={styles.noMatchText}>MISSING_NO_MATCH_TEXT</p>
    } else {
      content = props.results.map((res, index) => {
        return (
          <SelectableCharPreview
            key={`char_prev_${res.character.id}_${index}`}
            id={res.character.id.toString()}
            status={res.character.status}
            episodeCount={res.character.episode.length}
            imageUrl={res.character.image}
            name={res.character.name}
            onSelect={props.onCharSelect}
            onDiscard={props.onCharDiscard}
            index={index}
            isSelectedByDefault={res.isSelected}
            searchText={props.searchText}
            dictionary={props.dictionary}
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
