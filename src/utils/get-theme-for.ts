import themeStyles from "styles/ram-theme-colors.module.scss"

const kCountThemeColors = 5
const kColorThemes = [
  themeStyles.rickBlue,
  themeStyles.mortyYellow,
  themeStyles.summerPurple,
  themeStyles.bethRed,
  themeStyles.jerryGreen,
]

export default function getColorThemeFrom(index?: number) {
  let themeIndex: number
  if (index !== undefined) {
    themeIndex = index % kCountThemeColors
  } else {
    themeIndex = Math.floor(Math.random() * (kCountThemeColors - 1))
  }

  return kColorThemes[themeIndex]
}

// #region Themed Container classes
export enum ThemedContainerType {
  Filled,
  Outlined,
}

export function getContainerThemeFor(
  containerType: ThemedContainerType,
  index?: number,
) {
  let classCont: string
  switch (containerType) {
    case ThemedContainerType.Filled: {
      classCont = themeStyles.filledThemedContainer
      break
    }
    case ThemedContainerType.Outlined: {
      classCont = themeStyles.outlinedThemedContainer
      break
    }
  }

  return `${classCont} ${getColorThemeFrom(index)}`
}
// #endregion

export function getContentThemeFor(index?: number) {
  return `${themeStyles.themedContent} ${getColorThemeFrom(index)}`
}
