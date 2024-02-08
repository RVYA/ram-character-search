import { APIReference } from "./api-reference"

export enum CharacterStatus {
  Alive = "Alive",
  Dead = "Dead",
  Unknown = "unknown",
}

export enum CharacterGender {
  Female = "Female",
  Male = "Male",
  Genderless = "Genderless",
  Unknown = "unknown",
}

export interface RickAndMortyCharacter {
  id: number
  name: string
  status: CharacterStatus
  species: string
  type: string
  gender: CharacterGender
  origin: APIReference
  location: APIReference
  image: string
  episode: string[]
  created: string
}
