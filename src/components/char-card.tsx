import { Dictionary } from "dictionaries"

import { RickAndMortyCharacter } from "models/rick-and-morty-character"

import styles from "styles/char-card.module.scss"
import getThemeStyleFrom from "utils/get-theme-style-from"
import CharImg from "./char-img"

// #region Character Card Row
interface _CharCardRowProps {
  label: string
  value: string | number
}

function _CharCardRow({ label, value }: _CharCardRowProps) {
  return (
    <div className={styles.charCardRow}>
      <p className={styles.charCardLabel}>{`${label}:`}</p>
      <p className={styles.charCardValue}>{value}</p>
    </div>
  )
}
// #endregion

// #region Character Card
interface CharCardProps {
  character: RickAndMortyCharacter
  dictionary: Dictionary
  index: number
}

// URL template: https://rickandmorty.fandom.com/wiki/Rick_Sanchez
const kPrefixRaMFandomCharPage = "https://rickandmorty.fandom.com/wiki/"
const kReplacementSpace = "_"
function getFandomURLFor(characterName: string) {
  return (
    kPrefixRaMFandomCharPage + characterName.replace(/ /g, kReplacementSpace)
  )
}

export default function CharCard({
  character,
  dictionary,
  index,
}: CharCardProps) {
  const atrClassCont = `${styles.charCardContainer} ${getThemeStyleFrom(index)}`

  const labelDict = dictionary.charCard.labels

  function getLabelOf<T extends RickAndMortyCharacter>(prop: T[keyof T]) {
    const propKey = getPropName<RickAndMortyCharacter>(character, prop)

    return labelDict[propKey as keyof typeof labelDict]
  }

  const episodeCount = character.episode.length

  return (
    <div className={atrClassCont}>
      <div className={styles.charCardContainer}>
        <CharImg
          name={character.name}
          url={character.image}
          dictionary={dictionary}
        />
        <a
          className={styles.charNameAnchor}
          href={getFandomURLFor(character.name)}>
          {character.name}
        </a>
      </div>
      <_CharCardRow
        label={getLabelOf(character.episode)}
        value={episodeCount}
      />
      <_CharCardRow
        label={getLabelOf(character.species)}
        value={character.species}
      />
      <_CharCardRow
        label={getLabelOf(character.status)}
        value={character.status}
      />
      <_CharCardRow
        label={getLabelOf(character.gender)}
        value={character.gender}
      />
      <_CharCardRow
        label={getLabelOf(character.origin)}
        value={character.origin.name}
      />
      <_CharCardRow
        label={getLabelOf(character.location)}
        value={character.location.name}
      />
    </div>
  )
}
// #endregion
