export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string|null): Promise<ShallowLocations> {
    const resp = await fetch(pageURL??`${PokeAPI.baseURL}/location-area`, {
				   method: "GET",
				   mode: "cors",
				   headers: {
					   "Content-Type": "application/json",
				   }
    })
    return await resp.json() as ShallowLocations;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const resp = await fetch(`${PokeAPI.baseURL}/location-area/${locationName}`, {
	    method: "GET",
	    mode: "cors",
  })
  return await resp.json() as Location;
}
}



export type ShallowLocations = {
  count: number,
  next: string,
  prev: string | null,
  results: Location [],
};

export type Location = {
  encounter_method_rates: EncounterMethodRate[]
  game_index: number
  id: number
  location: LocationMeta
  name: string
  names: Name[]
  pokemon_encounters: PokemonEncounter[]
}

export interface EncounterMethodRate {
  encounter_method: EncounterMethod
  version_details: VersionDetail[]
}

export interface EncounterMethod {
  name: string
  url: string
}

export interface VersionDetail {
  rate: number
  version: Version
}

export interface Version {
  name: string
  url: string
}

export interface LocationMeta {
  name: string
  url: string
}

export interface Name {
  language: Language
  name: string
}

export interface Language {
  name: string
  url: string
}

export interface PokemonEncounter {
  pokemon: Pokemon
  version_details: VersionDetail2[]
}

export interface Pokemon {
  name: string
  url: string
}

export interface VersionDetail2 {
  encounter_details: EncounterDetail[]
  max_chance: number
  version: Version2
}

export interface EncounterDetail {
  chance: number
  condition_values: any[]
  max_level: number
  method: Method
  min_level: number
}

export interface Method {
  name: string
  url: string
}

export interface Version2 {
  name: string
  url: string
}

