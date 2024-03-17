import CharChip from "./char-chip"

import { RickAndMortyCharacter } from "models/rick-and-morty-character"

import { ComponentDictionary } from "dictionaries"

import styles from "styles/char-chip/char-chip-container.module.css"

interface CharChipContainerProps {
  selectedCharacters?: RickAndMortyCharacter[]
  dictionary: ComponentDictionary
  onCharDiscard: (discardedCharId: number) => void
}

export default function CharChipContainer({
  selectedCharacters,
  dictionary,
  onCharDiscard,
}: CharChipContainerProps) {
  if (selectedCharacters === undefined || selectedCharacters.length <= 0) {
    // TODO: Define UI for when there is no characters selected.
    return
  }

  // FIXME: Duplicate check is disabled to ease dev. Redefine later.
  /*if (new Set(selectedCharacters).size !== selectedCharacters.length) {
    throw Error('There are duplicate elements in the prop "characters"')
  }*/

  const leading = dictionary.charChipContainer.leading + ":"

  return (
    <div className={styles.charChipContainer}>
      <p className={styles.selectedLabel}>{leading}</p>
      {selectedCharacters.map((char, index) => (
        <CharChip
          key={`${index}_${char}`}
          name={char.name}
          index={index}
          onClick={() => onCharDiscard(char.id)}
        />
      ))}
    </div>
  )
}
