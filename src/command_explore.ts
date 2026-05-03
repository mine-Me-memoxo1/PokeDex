import {State} from "./state.js";
import {PokeAPI, PokemonEncounter, Pokemon} from "./pokeapi.js";
import type {Location} from "./pokeapi.js"

export async function commandExplore(state:State, ...args: string[]) {
	if (!args) {
		console.log("No location given. Please provide a location");
		return;
	}
	const place:string = args[0];
	const place_data = await state.pokeAPI.fetchLocation(place);
	const pokemon_encounters: PokemonEncounter[] = place_data.pokemon_encounters;
	console.log(`Exploring: ${place}...`);
	console.log("Found Pokemon:");
	for (let encounter of pokemon_encounters) {
		if (!encounter || !encounter.pokemon) continue;	
		console.log(` - ${encounter.pokemon.name}`)
	}
	return;
}	



