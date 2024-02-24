import CharCard from "./char-card"

import { RickAndMortyCharacter } from "models/rick-and-morty-character"

import { Dictionary } from "dictionaries"

import styles from "styles/char-card/char-card-grid.module.css"

interface CharCardGridProps {
  characters: RickAndMortyCharacter[]
  dictionary: Dictionary
}

export default function CharCardGrid({
  characters,
  dictionary,
}: CharCardGridProps) {
  return (
    <div className={styles.charCardGrid}>
      {characters.map((char, index) => (
        <CharCard character={char} index={index} dictionary={dictionary} />
      ))}
    </div>
  )
}
