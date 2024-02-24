import themedContStyles from "styles/themes.module.scss"

const kCountThemeColors = 5
const kCharThemes = [
  themedContStyles.rickBlue,
  themedContStyles.mortyYellow,
  themedContStyles.summerPurple,
  themedContStyles.bethRed,
  themedContStyles.jeffGreen,
]

export default function getThemeStyleFrom(index?: number) {
  let themeIndex: number
  if (index !== undefined) {
    themeIndex = index % kCountThemeColors
  } else {
    themeIndex = Math.floor(Math.random() * (kCountThemeColors - 1))
  }

  return kCharThemes[themeIndex]
}
