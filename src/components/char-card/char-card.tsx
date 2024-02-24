import { RickAndMortyCharacter } from "models/rick-and-morty-character"

import CharImg from "../char-img"

import styles from "styles/char-card/char-card.module.scss"
import themeStyles from "styles/themes.module.scss"
import getThemeStyleFrom from "utils/get-theme-style-from"

import { Dictionary } from "dictionaries"

// #region Generate fandom url for character
// URL template: https://rickandmorty.fandom.com/wiki/Rick_Sanchez
const kPrefixRaMFandomCharPage = "https://rickandmorty.fandom.com/wiki/"
const kReplacementSpace = "_"
function getFandomURLFor(characterName: string) {
  return (
    kPrefixRaMFandomCharPage + characterName.replace(/ /g, kReplacementSpace)
  )
}
// #endregion

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

function _ArrowOutwardIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={themeStyles.themedIcon}
      height="24"
      viewBox="0 -960 960 960"
      width="24">
      <path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z" />
    </svg>
  )
}

// #region Character Card
interface CharCardProps {
  character: RickAndMortyCharacter
  dictionary: Dictionary
  index: number
}

// TODO: Add color fill on hover to both CharCard and CharChip
export default function CharCard({
  character,
  dictionary,
  index,
}: CharCardProps) {
  const themeClass = getThemeStyleFrom(index)
  const atrClassCont = `${styles.charCardContainer} ${themeClass}`
  const atrNameAnchor = `${styles.charNameAnchor} ${themeClass}`

  const labelDict = dictionary.charCard.labels

  const episodeCount = character.episode.length
  const origin = character.origin.name
  const location = character.location.name

  return (
    <div className={atrClassCont}>
      <div className={styles.charCardHeader}>
        <CharImg
          name={character.name}
          url={character.image}
          dictionary={dictionary}
        />
        <a className={atrNameAnchor} href={getFandomURLFor(character.name)}>
          {character.name}
          <_ArrowOutwardIcon />
        </a>
      </div>
      <_CharCardRow label={labelDict.episode} value={episodeCount} />
      <_CharCardRow label={labelDict.species} value={character.species} />
      <_CharCardRow label={labelDict.status} value={character.status} />
      <_CharCardRow label={labelDict.gender} value={character.gender} />
      <_CharCardRow label={labelDict.origin} value={origin} />
      <_CharCardRow label={labelDict.location} value={location} />
    </div>
  )
}
// #endregion
