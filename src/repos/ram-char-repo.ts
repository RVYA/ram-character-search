import { APIInfo } from "models/api-info"
import { RickAndMortyCharacter } from "models/rick-and-morty-character"

// FIXME: This repository needs proper error handling...

const kURLPrefixCharacterAPI = "https://rickandmortyapi.com/api/character/?"
const kPrefixFilterName = "name="
const kPrefixFilterPage = "page="
const kSeparatorFilter = "&"

const kResponseKeyError = "error"
const kResponseKeyInfo = "info"
const kResponseKeyResults = "results"

/**
 * Returns undefined when there is any errors.
 * Otherwise returns the data received.
 */
async function parseAPIResponse(
  response: Response,
): Promise<[APIInfo, RickAndMortyCharacter[]] | undefined> {
  const json = await response.json()

  if (json[kResponseKeyError] !== undefined) return undefined

  const info: APIInfo = json[kResponseKeyInfo]
  const results: RickAndMortyCharacter[] = json[kResponseKeyResults].map(
    (char: RickAndMortyCharacter) => char,
  )

  return [info, results]
}

function getAPIQueryURL(name: string, page?: number) {
  let queryURL = kURLPrefixCharacterAPI

  if (page !== undefined) {
    if (page <= 0) throw Error("Page parameter can't be smaller than 1")
    queryURL += `${kPrefixFilterPage}${page}${kSeparatorFilter}`
  }

  queryURL += `${kPrefixFilterName}${name}`

  return queryURL
}

/**
 * Returns the result of `parseAPIResponse`
 */
async function fetchCharacterWith(name: string, page?: number) {
  console.log("name: " + name + " page: " + page)
  const response = await fetch(getAPIQueryURL(name, page), {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
  return parseAPIResponse(response)
}

/**
 * Returns an empty array when there are no results.
 */
export async function queryRaMCharactersWith(
  name: string,
): Promise<RickAndMortyCharacter[]> {
  const queryRes = await fetchCharacterWith(name)
  if (queryRes === undefined) return []

  const [info, chars] = queryRes
  if (info.count <= 0) return []
  if (info.pages > 1) {
    // FIXME: Could use APIInfo.next to receive next URL to fetch.
    for (let page = 2; page <= info.pages; page++) {
      //const [_, remainingChars] = await fetchCharacterWith(name, page)
      const consecQueryRes = await fetchCharacterWith(name, page)
      if (consecQueryRes === undefined) {
        throw Error(
          `Something went wrong: Consecutive query returned "undefined" for name:${name} page:${page}.`,
        )
      }

      chars.push(...consecQueryRes[1])
    }
  }

  return chars
}
