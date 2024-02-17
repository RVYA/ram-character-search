import RickAndMortyLogo from "components/rick-and-morty-logo"
import SquigglyHR from "components/squiggly-hr"

interface HomeProps {}

// TODO: Build the background with randomized images somehow...

export default function Home() {
  return (
    <>
      <RickAndMortyLogo />
      <SquigglyHR />
    </>
  )
}
