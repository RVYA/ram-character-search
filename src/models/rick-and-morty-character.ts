import { APIReference } from "./api-reference"

export interface RickAndMortyCharacter {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: APIReference
  location: APIReference
  image: string
  episode: string[]
  url: string
  created: string
}
