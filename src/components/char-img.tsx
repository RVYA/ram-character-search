import { Dictionary } from "dictionaries"

import styles from "styles/char-img.module.css"

interface CharImgProps {
  dictionary: Dictionary
  name: string
  url: string
}

const kSizeImage = 300 // Images from the API are 300x300px

export default function CharImg({ dictionary, name, url }: CharImgProps) {
  const alt = dictionary.charImg.altPrefix + ` ${name}`

  return (
    <img
      className={styles.charImg}
      src={url}
      alt={alt}
      width={kSizeImage}
      height={kSizeImage}
      crossOrigin="anonymous"
    />
  )
}
