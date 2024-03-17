"use client"

import { useCallback, useContext, useState } from "react"

import CharCardGrid from "components/char-card/char-card-grid"
import CharChipContainer from "components/char-chip/char-chip-container"
import RickAndMortyLogo from "components/rick-and-morty-logo"
import SearchField, { kMinLengthSearch } from "components/search-field"
import SquigglyHR from "components/squiggly-hr"

import { DictionaryContext } from "contexts/dictionary-context-provider"

import { RickAndMortyCharacter } from "models/rick-and-morty-character"

import { queryRaMCharactersWith } from "repos/ram-char-repo"

import { Locale } from "src/i18n-config"

interface HomeProps {
  params: { lang: Locale }
}

// TODO: Can't pass functions from server component. Fix later.

export default function Home({ params }: HomeProps) {
  const [compDict] = useContext(DictionaryContext)!

  const [queryResults, setQueryResults] = useState<RickAndMortyCharacter[]>()
  const handleQueryChange = useCallback(async (query: string) => {
    if (query.length < kMinLengthSearch) return setQueryResults(undefined)

    setQueryResults(undefined)
    const results = await queryRaMCharactersWith(query)
    if (results.length > 0) results.sort((a, b) => a.name.localeCompare(b.name))
    setQueryResults(results)
  }, [])

  const [selectedChars, setSelectedChars] = useState<RickAndMortyCharacter[]>()
  // #region Handle character selection/discard.
  const handleCharSelect = useCallback(
    (selectedCharId: number) => {
      if (queryResults === undefined || queryResults.length <= 0) {
        throw Error("There are no character data to select from, yet!")
      }

      const selectedChar = queryResults.find(
        (char) => char.id === selectedCharId,
      )
      if (selectedChar === undefined) {
        throw Error(`No character with id: ${selectedCharId} has been found.`)
      }

      const newSelChars = selectedChars !== undefined ? [...selectedChars] : []
      newSelChars.push(selectedChar)
      newSelChars.sort((a, b) => a.name.localeCompare(b.name))

      setSelectedChars(newSelChars)
    },
    [queryResults, selectedChars],
  )

  const handleCharDiscard = useCallback(
    (discardedCharId: number) => {
      if (selectedChars === undefined || selectedChars.length <= 0) {
        throw Error("There are no selected characters!")
      }

      const doesCharExists =
        selectedChars.find((char) => char.id === discardedCharId) !== undefined
      if (!doesCharExists) {
        throw Error(`Character with id: "${discardedCharId}" doesn't exists!`)
      }

      const charIndex = selectedChars.findIndex(
        (char) => char.id === discardedCharId,
      )
      const newSlcChars = [...selectedChars]
      newSlcChars.splice(charIndex, 1)

      setSelectedChars(newSlcChars)
    },
    [selectedChars],
  )
  // #endregion

  const getSelectedCharIds = useCallback(
    () => selectedChars?.map((char) => char.id),
    [selectedChars],
  )

  // TODO: Define specific layout for when there is no selected characters.
  return (
    <>
      <RickAndMortyLogo />
      <SearchField
        onCharDiscard={handleCharDiscard}
        onCharSelect={handleCharSelect}
        onQueryChange={handleQueryChange}
        queryResults={queryResults}
        selectedCharacterIds={getSelectedCharIds()}
      />
      <SquigglyHR />
      <CharChipContainer
        dictionary={compDict}
        selectedCharacters={selectedChars}
        onCharDiscard={handleCharDiscard}
      />
      <CharCardGrid selectedCharacters={selectedChars} dictionary={compDict} />
    </>
  )
}
