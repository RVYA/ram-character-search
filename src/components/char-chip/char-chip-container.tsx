import { Dictionary } from "dictionaries"

import CharChip from "./char-chip"

import styles from "styles/char-chip/char-chip-container.module.css"

interface CharChipContainerProps {
  characters: string[]
  dictionary: Dictionary
}

export default function CharChipContainer({
  characters,
  dictionary,
}: CharChipContainerProps) {
  if (new Set(characters).size !== characters.length) {
    throw Error('There are duplicate elements in the prop "characters"')
  }

  const leading = dictionary.charChipContainer.leading + ":"

  return (
    <div className={styles.charChipContainer}>
      <p className={styles.selectedLabel}>{leading}</p>
      {characters.map((char, index) => (
        <CharChip key={`${index}_${char}`} name={char} index={index} />
      ))}
    </div>
  )
}
