import styles from "styles/char-chip.module.scss"

function _CancelIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={styles.trailingCancelIcon}
      height="24"
      viewBox="0 -960 960 960"
      width="24">
      <path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
    </svg>
  )
}

interface CharChipProps {
  name: string
  index?: number
}

const kCountThemeColors = 5
const kCharThemes = [
  styles.rickBlue,
  styles.mortyYellow,
  styles.summerPurple,
  styles.bethRed,
  styles.jeffGreen,
]

export default function CharChip({ name, index }: CharChipProps) {
  let themeIndex: number
  if (index !== undefined) {
    themeIndex = index % kCountThemeColors
  } else {
    themeIndex = Math.floor(Math.random() * (kCountThemeColors - 1))
  }

  const atrClass = `${styles.charChip} ${kCharThemes[themeIndex]}`

  return (
    <button className={atrClass} type="button">
      {name}
      <_CancelIcon />
    </button>
  )
}
