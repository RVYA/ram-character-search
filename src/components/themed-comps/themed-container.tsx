import { ReactNode } from "react"

import styles from "styles/themed-comps/themed-container.module.css"
import { ThemedContainerType, getContainerThemeFor } from "utils/get-theme-for"

export enum RaMThemedContainerSize {
  Small,
  Large,
}

interface RaMThemedContainerProps {
  children: ReactNode
  index?: number
  type?: ThemedContainerType
  size?: RaMThemedContainerSize
}
// TODO: Decide how to use themed components for CharChip.
export default function RaMThemedContainer({
  children,
  index,
  type = ThemedContainerType.Outlined,
  size = RaMThemedContainerSize.Large,
}: RaMThemedContainerProps) {
  const classTheme = getContainerThemeFor(type, index)

  let classSize: string
  switch (size) {
    case RaMThemedContainerSize.Small:
      classSize = styles.small
      break
    case RaMThemedContainerSize.Large:
      classSize = styles.large
      break
  }

  const atrClassCont = `${classTheme} ${classSize}`

  return <div className={atrClassCont}>{children}</div>
}
