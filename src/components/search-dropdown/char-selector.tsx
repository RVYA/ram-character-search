import { ChangeEvent } from "react"

import styles from "styles/search-dropdown/char-selector.module.scss"
import {
  ThemedContainerType,
  getContainerThemeFor,
  getHoverThemeFor,
} from "utils/get-theme-for"

interface CharSelectorProps {
  isSelected: boolean
  previewIndex?: number
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function CharSelector({
  isSelected,
  previewIndex,
  onChange,
}: CharSelectorProps) {
  const contThemeClass = getContainerThemeFor(
    ThemedContainerType.Outlined,
    previewIndex,
  )
  const hoverThemeClass = getHoverThemeFor(previewIndex)
  const atrClass = `${styles.charSelector} ${contThemeClass} ${hoverThemeClass}`

  return (
    <input
      type="checkbox"
      className={atrClass}
      checked={isSelected}
      onChange={onChange}
    />
  )
}
