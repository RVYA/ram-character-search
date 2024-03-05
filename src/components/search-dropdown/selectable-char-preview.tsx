"use client"

import { ChangeEvent, useMemo, useState } from "react"

import CharImg, { CharImgSize } from "components/char-img"
import RaMThemedContainer, {
  RaMThemedContainerSize,
} from "components/themed-comps/themed-container"
import CharSelector from "./char-selector"

import { Dictionary } from "dictionaries"

import styles from "styles/search-dropdown/selectable-char-preview.module.scss"
import getColorThemeFrom, { ThemedContainerType } from "utils/get-theme-for"

interface SelectableCharPreviewProps {
  dictionary: Dictionary
  episodeCount: number
  id: string
  imageUrl: string
  name: string
  status: string
  onSelect?: (selectedCharId: string) => void
  onDiscard?: (discardedCharId: string) => void
  index?: number
  isSelectedByDefault?: boolean
  searchText?: string
}

function getQueryMatchRegExp(searchText: string) {
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

// TODO: Add dictionary entries for status values. Make a constants dictionary.
// TODO: Remove optional parameters for event handlers.
// TODO: Separate status and episode count label styles
// TODO: Rework gray colors for unimportant text and labels
export default function SelectableCharPreview({
  dictionary,
  episodeCount,
  id,
  imageUrl,
  name,
  status,
  onSelect,
  onDiscard,
  index,
  isSelectedByDefault = false,
  searchText = "",
}: SelectableCharPreviewProps) {
  const [isSelected, setIsSelected] = useState<boolean>(isSelectedByDefault)

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.checked && onSelect !== undefined) {
      onSelect(id)
    } else if (onDiscard !== undefined) {
      onDiscard(id)
    }

    setIsSelected(event.target.checked)
  }

  // #region Style declarations
  const themeContType: ThemedContainerType = useMemo(() => {
    return isSelected
      ? ThemedContainerType.Filled
      : ThemedContainerType.Outlined
  }, [isSelected])

  const atrClassPrvwCont: string = useMemo(() => {
    let classPrvwCont = styles.previewContainer
    if (isSelected) classPrvwCont += ` ${styles.selected}`

    return classPrvwCont
  }, [isSelected])
  const atrClassCharName: string = useMemo(() => {
    let classCharName = styles.charName
    if (isSelected) classCharName += ` ${styles.selected}`
    classCharName += ` ${getColorThemeFrom(index)}`

    return classCharName
  }, [index, isSelected])
  // #endregion

  // #region Character details declarations
  const prvwDict = dictionary.selectableCharPreview

  function markMatchingPartOfName(): JSX.Element {
    if (searchText.length <= 0) return <>{name}</>

    const splitName = name
      .split(getQueryMatchRegExp(searchText))
      .filter(Boolean) // The empty string is resolved as falsy in JS
    const markedName = splitName.map((part, index) => {
      if (part === searchText) {
        return <b key={index}>{part}</b>
      } else {
        return <>{part}</>
      }
    })

    return <>{markedName}</>
  }

  const suffixedEpCount = `${episodeCount} ${prvwDict.textEpisodes.trailing}`
  const markedName = markMatchingPartOfName()
  // #endregion

  return (
    <RaMThemedContainer
      index={index}
      size={RaMThemedContainerSize.Small}
      type={themeContType}
    >
      <div className={atrClassPrvwCont}>
        <CharSelector
          isSelectedByDefault={isSelectedByDefault}
          previewIndex={index}
          onChange={handleChange}
        />
        <CharImg
          name={name}
          url={imageUrl}
          size={CharImgSize.Small}
          dictionary={dictionary}
        />
        <div className={styles.charDetailsContainer}>
          <div className={styles.charIdentityContainer}>
            <p className={atrClassCharName}>{markedName}</p>
            <p className={styles.lowImportanceInfo}>{`(${status})`}</p>
          </div>
          <p className={styles.lowImportanceInfo}>{suffixedEpCount}</p>
        </div>
      </div>
    </RaMThemedContainer>
  )
}
