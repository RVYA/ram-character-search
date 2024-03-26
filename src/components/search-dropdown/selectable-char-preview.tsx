import { ChangeEvent, Fragment } from "react"

import CharImg, { CharImgSize } from "components/char-img"
import RaMThemedContainer, {
  RaMThemedContainerSize,
} from "components/ram-themed-container"
import CharSelector from "./char-selector"

import { ComponentDictionary, ConstantDictionary } from "dictionaries"

import styles from "styles/search-dropdown/selectable-char-preview.module.scss"
import getColorThemeFrom, { ThemedContainerType } from "utils/get-theme-for"

export function getQueryMatchRegExp(searchText: string) {
  /** The query:
   * Query uses capturing group to also return matching parts in results.
   * However, it results in an empty string to be added to the beginning or end
   * of the array when the match is at the beginning or end or string.
   * */

  /** Flags:
   * `g`: global; searches for more multiple matches
   * `i`: case insensitive: ignores the case of the text (doesn't work for
   * non-US characters though; i.e, the Turkish letter `İ`, doesn't match for
   * `i` or `I`)
   */
  return new RegExp(`(${searchText})`, "gi")
}

interface SelectableCharPreviewProps {
  componentDictionary: ComponentDictionary
  constantDictionary: ConstantDictionary
  episodeCount: number
  id: number
  imageUrl: string
  name: string
  status: string
  onSelect?: (selectedCharId: number) => void
  onDiscard?: (discardedCharId: number) => void
  index?: number
  isSelected?: boolean
  searchText?: string
}

// TODO: Remove optional parameters for event handlers.
// TODO: Rework gray colors for unimportant text and labels
// FIXME: The details container is not centered
// FIXME: There are issues related to style not updating correctly when changing
// the state. It maybe related to duplicate data.
// FIXME: After discarding a character, it's preview still stays checked, but
// it's only reflected on CharSelector component.
// FIXME: Update all client components to use DictionaryContext instead of prop
// drilling.
export default function SelectableCharPreview({
  componentDictionary,
  constantDictionary,
  episodeCount,
  id,
  imageUrl,
  name,
  status,
  onSelect,
  onDiscard,
  index,
  isSelected = false,
  searchText = "",
}: SelectableCharPreviewProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.checked && onSelect !== undefined) {
      onSelect(id)
    } else if (onDiscard !== undefined) {
      onDiscard(id)
    }
  }

  // #region Style declarations
  const themeContType = isSelected
    ? ThemedContainerType.Filled
    : ThemedContainerType.Outlined

  let atrClassPrvwCont = styles.previewContainer

  let atrClassCharName = `${styles.charName} ${getColorThemeFrom(index)}`
  if (isSelected) atrClassCharName += ` ${styles.selected}`

  // #endregion

  // #region Character details declarations
  const prvwDict = componentDictionary.selectableCharPreview
  const statusDict = constantDictionary.status

  function markMatchingPartOfName(): JSX.Element {
    if (searchText.length <= 0) return <>{name}</>

    const splitName = name
      .split(getQueryMatchRegExp(searchText))
      .filter(Boolean) // The empty string is resolved as falsy in JS
    const markedName = splitName.map((part, index) => {
      // Because regex matches with case insensitive flag applied, the cases of
      // the letters in `searchText` may not match with `part`, which causes
      // marking effect to break.
      if (part.toLowerCase() === searchText.toLowerCase()) {
        return <b key={`${part}_${index}`}>{part}</b>
      } else {
        return <Fragment key={`${part}_${index}`}>{part}</Fragment>
      }
    })

    return <>{markedName}</>
  }

  const markedName = markMatchingPartOfName()

  const translStatus = statusDict[status as keyof typeof statusDict]
  const suffixedEpCount = `${episodeCount} ${prvwDict.textEpisodes.trailing}`
  const details = `${suffixedEpCount} • ${translStatus}`
  // #endregion

  return (
    <RaMThemedContainer
      index={index}
      size={RaMThemedContainerSize.Small}
      type={themeContType}
    >
      <div className={atrClassPrvwCont}>
        <CharSelector
          isSelected={isSelected}
          previewIndex={index}
          onChange={handleChange}
        />
        <CharImg
          name={name}
          url={imageUrl}
          size={CharImgSize.Small}
          dictionary={componentDictionary}
        />
        <div className={styles.charDetailsContainer}>
          <p className={atrClassCharName}>{markedName}</p>
          <p className={styles.lowImportanceInfo}>{details}</p>
        </div>
      </div>
    </RaMThemedContainer>
  )
}
