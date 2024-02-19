import RickAndMortyLogo from "components/rick-and-morty-logo"
import SearchField from "components/search-field"
import SquigglyHR from "components/squiggly-hr"
import { getDictionary } from "dictionaries"
import { Locale } from "src/i18n-config"

interface HomeProps {
  params: { lang: Locale }
}

// TODO: Can't pass functions from server component. Fix later.

export default async function Home({ params }: HomeProps) {
  const dict = await getDictionary(params.lang)

  return (
    <>
      <RickAndMortyLogo />
      <SearchField dictionary={dict} onChange={() => {}} />
      <SquigglyHR />
    </>
  )
}
