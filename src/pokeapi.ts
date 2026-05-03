import {Cache} from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2"; 
  private pokeCache: Cache; 

  constructor() {
	this.pokeCache = new Cache(1200000);
  }

  async fetchLocations(pageURL?: string|null): Promise<ShallowLocations> {
    if (typeof pageURL === "string" ) {
	    const val = this.pokeCache.get<ShallowLocations>(pageURL);
	    if (val !== undefined) {
		    return val.val;
	    }
    }
    try {
    	const resp = await fetch(pageURL??`${PokeAPI.baseURL}/location-area`, {
				   method: "GET",
				   mode: "cors",
				   headers: {
					   "Content-Type": "application/json",
				   }
    				});
	if (!resp.ok) {
		throw new Error(`${resp.status} ${resp.statusText}`);

    	}
	const locations = await resp.json() as ShallowLocations;
	this.pokeCache.add<ShallowLocations>(pageURL??`${PokeAPI.baseURL}/location-area`, locations);
	return locations;

    	
  } catch (e) {
	  if (e instanceof Error) {
		  console.log(`${e.message}`);
	  } else {
		console.log("An unknown error occured");   
	  }
	  throw e; // Ensures we don't return undefined which eliminates error produced during compile time 
     	}
      }



  async fetchLocation(locationName: string): Promise<Location> {
	const val =this.pokeCache.get<Location>(`${PokeAPI.baseURL}/location-area/${locationName}`)
	if (val !== undefined) {
		return val.val;
	}
	try {
    	   const resp = await fetch(`${PokeAPI.baseURL}/location-area/${locationName}`, {
	    	method: "GET",
	    mode: "cors",
 	 });
	 if (!resp.ok) {
		 throw new Error(`${resp.status} ${resp.statusText}`)
	 }
  	const loc = await resp.json() as Location;
	this.pokeCache.add<Location>(`{PokeAPI.baseURL}/location-area/${locationName}`, loc);
	return loc;
   } catch (e) {
	throw new Error(`Error fetching location '${locationName}': ${(e as Error).message}`);  
   }
  }
};

export type ShallowLocations = {
  count: number,
  next: string,
  previous: string | null,
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

