import SelectableCharPreview, {
  getQueryMatchRegExp,
} from "./selectable-char-preview"

import { RickAndMortyCharacter } from "models/rick-and-morty-character"

import { Dictionary } from "dictionaries"

import styles from "styles/search-dropdown/search-dropdown.module.css"

interface SearchDropdownProps {
  dictionary: Dictionary
  isOpen: boolean
  characters: RickAndMortyCharacter[]
  searchText?: string
  selectedCharacterIds?: number[]
  onCharSelect?: (selectedCharId: string) => void
  onCharDiscard?: (discardedCharId: string) => void
}

// TODO: Position dropdown in the center horizontally.
export default function SearchDropdown({
  dictionary,
  isOpen,
  characters,
  searchText,
  selectedCharacterIds,
  onCharSelect,
  onCharDiscard,
}: SearchDropdownProps) {
  let atrClass = styles.searchDropdown
  if (!isOpen) atrClass += ` ${styles.hidden}`

  let charsToShow: RickAndMortyCharacter[]
  if (searchText === undefined || searchText.length <= 0) {
    charsToShow = characters
  } else {
    // FIXME: Test and implement a proper search regex.
    const queryRegex = getQueryMatchRegExp(searchText)
    charsToShow = characters.filter((char) => queryRegex.test(char.name))
  }

  return (
    <div className={atrClass}>
      {charsToShow.map((char, index) => (
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
