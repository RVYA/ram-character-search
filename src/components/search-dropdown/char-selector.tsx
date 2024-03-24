import { ChangeEvent } from "react"

import styles from "styles/search-dropdown/char-selector.module.scss"
import { ThemedContainerType, getContainerThemeFor } from "utils/get-theme-for"

interface CharSelectorProps {
  isSelectedByDefault: boolean
  previewIndex?: number
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}
// FIXME: While unchecked, hover style doesn't work...
export default function CharSelector({
  isSelectedByDefault,
  previewIndex,
  onChange,
}: CharSelectorProps) {
  const contThemeClass = getContainerThemeFor(
    ThemedContainerType.Outlined,
    previewIndex,
  )
  const atrClass = `${styles.charSelector} ${contThemeClass}`

  return (
    <input
      type="checkbox"
      className={atrClass}
      defaultChecked={isSelectedByDefault}
      onChange={onChange}
    />
  )
}
