import CharCardGrid from "components/char-card/char-card-grid"
import CharChipContainer from "components/char-chip/char-chip-container"
import RickAndMortyLogo from "components/rick-and-morty-logo"
import SearchField from "components/search-field"
import SquigglyHR from "components/squiggly-hr"

import { getDictionary } from "dictionaries"
import { RickAndMortyCharacter } from "models/rick-and-morty-character"
import { Locale } from "src/i18n-config"

interface HomeProps {
  params: { lang: Locale }
}

// TODO: Can't pass functions from server component. Fix later.

export default async function Home({ params }: HomeProps) {
  const dict = await getDictionary(params.lang)

  const placeholderChar: RickAndMortyCharacter = {
    created: "PLACEHOLDER",
    episode: ["PLACEHOLDER"],
    gender: "PLACEHOLDER",
    id: -1,
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    location: { name: "PLACEHOLDER", url: "PLACEHOLDER" },
    name: "PLACEHOLDER",
    origin: { name: "PLACEHOLDER", url: "PLACEHOLDER" },
    species: "PLACEHOLDER",
    status: "PLACEHOLDER",
    type: "PLACEHOLDER",
    url: "PLACEHOLDER",
  }
  const chars: RickAndMortyCharacter[] = [
    placeholderChar,
    placeholderChar,
    placeholderChar,
    placeholderChar,
    placeholderChar,
    placeholderChar,
    placeholderChar,
    placeholderChar,
    placeholderChar,
    placeholderChar,
    placeholderChar,
    placeholderChar,
    placeholderChar,
    placeholderChar,
    placeholderChar,
  ]

  return (
    <>
      <RickAndMortyLogo />
      <SearchField dictionary={dict} /*onChange={() => {}}*/ />
      <SquigglyHR />
      <CharChipContainer
        dictionary={dict}
        characters={[
          "Rick Sanchez",
          "Fascist Shrimp Rick",
          "Vampire Master",
          "Mr. Celery & Friends",
          "Plane Crash Survivor",
          "Eli's Girlfriend",
          "Gear Cop",
          "Concerto",
          "Nano Doctor",
          "Diane Sanchez",
          "Jamey",
          "Big Boobed Waitress",
          "Tony",
          "Melissa",
          "Bootleg Portal Chemist Rick",
        ]}
      />
      <CharCardGrid characters={chars} dictionary={dict} />
    </>
  )
}
