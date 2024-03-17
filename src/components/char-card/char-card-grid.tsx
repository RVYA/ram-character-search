import CharCard from "./char-card"

import { RickAndMortyCharacter } from "models/rick-and-morty-character"

import { ComponentDictionary } from "dictionaries"

import styles from "styles/char-card/char-card-grid.module.css"

interface CharCardGridProps {
  selectedCharacters?: RickAndMortyCharacter[]
  dictionary: ComponentDictionary
}

export default function CharCardGrid({
  selectedCharacters,
  dictionary,
}: CharCardGridProps) {
  if (selectedCharacters === undefined || selectedCharacters.length <= 0) {
    // TODO: Define UI for when there is no character selected
    return
  }

  return (
    <div className={styles.charCardGrid}>
      {selectedCharacters.map((char, index) => (
        <CharCard
          key={`char_card_${char.name}_${char.id}`}
          character={char}
          index={index}
          dictionary={dictionary}
        />
      ))}
    </div>
  )
}
