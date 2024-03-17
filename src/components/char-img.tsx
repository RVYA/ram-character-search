import { ComponentDictionary } from "dictionaries"

import styles from "styles/char-img.module.css"

// Images from API are 300x300px.
export enum CharImgSize {
  Large = 200,
  Small = 64,
}

interface CharImgProps {
  dictionary: ComponentDictionary
  name: string
  size?: CharImgSize
  url: string
}

export default function CharImg({
  dictionary,
  name,
  size = CharImgSize.Large,
  url,
}: CharImgProps) {
  let atrClass = styles.charImg
  if (size === CharImgSize.Small) {
    atrClass += ` ${styles.small}`
  }

  const alt = dictionary.charImg.altText.leading + ` ${name}`

  // TODO: Look at using Next/Image instead of <img> element.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={atrClass}
      src={url}
      alt={alt}
      width={size}
      height={size}
      crossOrigin="anonymous"
    />
  )
}
