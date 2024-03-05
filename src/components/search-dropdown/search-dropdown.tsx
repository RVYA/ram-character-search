import SelectableCharPreview from "./selectable-char-preview"

import { RickAndMortyCharacter } from "models/rick-and-morty-character"

import { Dictionary } from "dictionaries"

import styles from "styles/search-dropdown/search-dropdown.module.css"

interface SearchDropdownProps {
  dictionary: Dictionary
  results: RickAndMortyCharacter[]
  searchText?: string
  selectedCharacterIds?: number[]
  onCharSelect?: (selectedCharId: string) => void
  onCharDiscard?: (discardedCharId: string) => void
}
// TODO: Define custom scrollbar in related CSS module.
// TODO: Make the dropdown hideable. Only show dropdown when search field is in
// focus.
// TODO: Position dropdown in the center horizontally.
// TODO: Add some top margin to dropdown
export default function SearchDropdown({
  dictionary,
  results,
  searchText,
  selectedCharacterIds,
  onCharSelect,
  onCharDiscard,
}: SearchDropdownProps) {
  return (
    <div className={styles.searchDropdown}>
      {results.map((char, index) => (
        <SelectableCharPreview
          key={`char_prev_${char.id}_${index}`}
          id={char.id.toString()}
          status={char.status}
          episodeCount={char.episode.length}
          imageUrl={char.image}
          name={char.name}
          onSelect={onCharSelect}
          onDiscard={onCharDiscard}
          index={index}
          isSelectedByDefault={selectedCharacterIds?.includes(char.id)}
          searchText={searchText}
          dictionary={dictionary}
        />
      ))}
    </div>
  )
}
