import { ChangeEvent, ReactNode } from "react"

interface SearchFieldProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  tags?: ReactNode
}

const kMinLengthSearch = 3
const kRegexPatternSearch = / /g // TODO: Write regex

export default function SearchField({ onChange, tags }: SearchFieldProps) {
  return (
    <label>
      MISSING_LABEL
      <span>{tags}</span>
      <input
        type="text"
        onChange={onChange}
        placeholder={"MISSING_PLACEHOLDER"}
        minLength={kMinLengthSearch}
        pattern={kRegexPatternSearch.source}
        title="MISSING_TITLE"
      />
    </label>
  )
}
