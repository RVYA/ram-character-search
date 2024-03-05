import { ChangeEvent } from "react"

import styles from "styles/search-dropdown/char-selector.module.scss"
import getColorThemeFrom from "utils/get-theme-for"

interface CharSelectorProps {
  isSelectedByDefault: boolean
  previewIndex?: number
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}
// TODO: Fix theming and content issue
export default function CharSelector({
  isSelectedByDefault,
  previewIndex,
  onChange,
}: CharSelectorProps) {
  const atrClass = `${styles.charSelector} ${getColorThemeFrom(previewIndex)}`

  return (
    <input
      type="checkbox"
      className={atrClass}
      defaultChecked={isSelectedByDefault}
      onChange={onChange}
    />
  )
}
